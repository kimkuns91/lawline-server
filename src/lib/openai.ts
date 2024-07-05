'use server';

import { CoreMessage, streamText } from 'ai';

import { createStreamableValue } from 'ai/rsc';
import { openai } from '@ai-sdk/openai';
import prisma from './prisma';

function convertContentToString(content: any) {
  if (typeof content === 'string') {
    return content;
  }
  if (Array.isArray(content)) {
    return content
      .map((part) => {
        if (typeof part === 'string') {
          return part;
        }
        if ('text' in part) {
          return part.text;
        }
        return ''; // 필요에 따라 다른 타입에 대한 처리를 추가할 수 있습니다.
      })
      .join(' ');
  }
  return ''; // 필요에 따라 다른 타입에 대한 처리를 추가할 수 있습니다.
}

export async function continueConversation(
  messages: CoreMessage[],
  roomId: string,
) {
  'use server';

  const promptMessage: CoreMessage = {
    role: 'system',
    content:
      '1. 너의 이름은 로라인봇(LawLine Bot) 이며, 너는 한국 법률 전문가로 한국어로 유저의 질문에 대답한다. ' +
      '2. 유저가 질문을 하면, 질문에 구체적으로 답해준다. ' +
      '3. 판례가 있는 경우, 판례 예시를 들어준다. ' +
      '4. 유저가 읽기 편하게 줄바꿈이 필요한 경우 "\n"을 사용한다.' + 
      '5. 자료 출처가 있으면 출저를 명시한다',
  };

  const updatedMessages = [promptMessage, ...messages];

  await prisma.aIChatMessage.create({
    data: {
      roomId,
      role: 'user',
      content: convertContentToString(messages[messages.length - 1].content),
    },
  });

  const result = await streamText({
    model: openai('gpt-4o'),
    messages: updatedMessages,
  });

  const stream = createStreamableValue(result.textStream);

  return stream.value;
}

export async function continueConversationWithAiModel(
  prompt: string,
  messages: CoreMessage[],
  roomId: string
) {
  'use server';

  const promptMessage: CoreMessage = {
    role: 'system',
    content:
      '1. 너는 한국 법률 전문가로 한국어로 유저의 질문에 대답한다.' +
      '2. 유저가 질문을 하면, 질문에 구체적으로 답해준다. ' +
      '3. 판례가 있는 경우, 판례 예시를 들어준다. ' +
      prompt,
  };

  const updatedMessages = [promptMessage, ...messages];

  await prisma.aIChatMessage.create({
    data: {
      roomId,
      role: 'user',
      content: convertContentToString(messages[messages.length - 1].content),
    },
  });

  const result = await streamText({
    model: openai('gpt-4o'),
    messages: updatedMessages,
  });

  const stream = createStreamableValue(result.textStream);

  return stream.value;
}
