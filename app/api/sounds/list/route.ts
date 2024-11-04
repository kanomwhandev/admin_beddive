import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
      select: {
        id: true,
        title: true,
        author: true,
        fileUrl: true,
        duration: true,
        Category: {
          select: {
            name: true,
          },
        },
        createdAt: true,
        updatedAt: true,
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
