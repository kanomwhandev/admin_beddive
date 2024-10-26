import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { name } = await request.json();
  const category = await prisma.category.update({
    where: { id: parseInt(params.id) },
    data: { name },
  });
  return NextResponse.json(category);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await prisma.category.delete({
    where: { id: parseInt(params.id) },
  });
  return NextResponse.json({ message: "Category deleted successfully" });
}
