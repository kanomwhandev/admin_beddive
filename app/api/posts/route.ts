import { PrismaClient } from '@prisma/client'
import { NextResponse } from "next/server";

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
 
  const sortOrder = searchParams.get("sortOrder") ?? "latest";

  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: sortOrder === "latest" ? "desc" : "asc",
    },
  });

  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  try {
    const { title, content, imageUrl, author, audioFile } = await req.json()
    console.log("Received data:", { title, content, imageUrl, author, audioFile });
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        imageUrl,
        author,
      },
    })
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
