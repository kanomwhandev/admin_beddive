import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { writeFile } from 'fs/promises';
import path from 'path';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;
    const author = formData.get('author') as string;
    const category = formData.get('category') as string;
    const duration = formData.get('duration') ? parseFloat(formData.get('duration') as string) : null;

    if (!file) {
      return NextResponse.json({ error: 'ไม่มีไฟล์ที่อัปโหลด' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
    const filePath = path.join(process.cwd(), 'public', 'uploads', fileName);
    
    await writeFile(filePath, buffer);

    const fileUrl = `/uploads/${fileName}`;

    const sound = await prisma.sound.create({
      data: {
        title: title || file.name,
        filePath: filePath,
        fileName: fileName,
        fileSize: buffer.length,
        audioFile: buffer.toString('base64'),
        fileUrl: fileUrl,
        author: author || null,
        duration: duration ?? null,
        Category: category ? {
          connectOrCreate: {
            where: { name: category },
            create: { name: category },
          },
        } : undefined,
      },
      include: {
        Category: true, // Include the Category in the response
      },
    });

    return NextResponse.json(sound);
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการสร้างเสียง:', error);
    return NextResponse.json({ error: 'ไม่สามารถสร้างเสียงได้' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sortOrder = searchParams.get('sortOrder') || 'latest';
    const category = searchParams.get('category');

    const sounds = await prisma.sound.findMany({
      where: category ? {
        Category: {
          name: category
        }
      } : undefined,
      orderBy: {
        createdAt: sortOrder === 'latest' ? 'desc' : 'asc',
      },
      include: {
        Category: true,
      },
    });

    return NextResponse.json(sounds);
  } catch (error) {
    console.error('Error fetching sounds:', error);
    return NextResponse.json({ error: 'Failed to fetch sounds' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}



