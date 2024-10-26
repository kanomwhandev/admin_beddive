import { PrismaClient } from '@prisma/client'
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const post = await prisma.post.findUnique({
    where: { id: parseInt(params.id) },
  });
  return NextResponse.json(post);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const data = await request.json();
  const updatedPost = await prisma.post.update({
    where: { id: parseInt(params.id) },
    data: {
      title: data.title,
      content: data.content,
      imageUrl: data.imageUrl,
      author: data.author,
    
    },
  });
  return NextResponse.json(updatedPost);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    return Response.json(await prisma.post.delete({
      where: { id: Number(params.id) },
    }))
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500,
    })
  }
}
