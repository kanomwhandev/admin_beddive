import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get('url');

  if (!imageUrl) {
    return new NextResponse('ไม่พบพารามิเตอร์ URL', { status: 400 });
  }

  try {
    const response = await fetch(imageUrl);
    const buffer = await response.arrayBuffer();

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการดึงรูปภาพ:', error);
    return new NextResponse('เกิดข้อผิดพลาดในการดึงรูปภาพ', { status: 500 });
  }
}