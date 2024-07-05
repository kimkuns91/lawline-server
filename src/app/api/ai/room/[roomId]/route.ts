import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { roomId: string } }
) {
  try {
    const roomId = params.roomId;

    // console.log('roomId:', roomId);
    const messages = await prisma.aIChatMessage.findMany({
      where: {
        roomId,
      },
    });
    // 필요한 필드만 추출
    const formattedMessages = messages.map((message) => ({
      role: message.role,
      content: message.content,
    }));

    // console.log('formattedMessages:', formattedMessages);
    return NextResponse.json(formattedMessages, { status: 200 });
  } catch (error) {
    return NextResponse.error();
  }
}
