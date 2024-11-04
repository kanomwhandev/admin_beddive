import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const sound = await prisma.sound.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        Category: true,
      },
    });

    if (!sound) {
      return NextResponse.json({ error: 'Sound not found' }, { status: 404 });
    }

    return NextResponse.json(sound);
  } catch (error) {
    console.error('Error fetching sound:', error);
    return NextResponse.json({ error: 'Failed to fetch sound' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const deletedSound = await prisma.sound.delete({
        where: { id: parseInt(params.id) },
      });
      return NextResponse.json(deletedSound, { status: 200 });
    } catch (error) {
      console.error('Error deleting sound:', error);
      return NextResponse.json({ error: 'Failed to delete sound' }, { status: 500 });
    }
  }


export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { title, fileUrl, author, category, duration } = await request.json();
    
    const updatedSound = await prisma.sound.update({
      where: { id: parseInt(params.id) },
      data: { 
        title, 
        fileUrl, 
        author,
        Category: category ? {
          connectOrCreate: {
            where: { name: category },
            create: { name: category },
          },
        } : undefined,
        duration: duration ? parseFloat(duration) : undefined,
      },
      include: {
        Category: true, // Include the Category in the response
      },
    });
    

    return NextResponse.json(updatedSound);
  } catch (error) {
    console.error('Error updating sound:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: 'Failed to update sound', details: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'Failed to update sound', details: 'Unknown error' }, { status: 500 });
    }
  } finally {
    await prisma.$disconnect();
  }
}
