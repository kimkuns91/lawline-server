import 'react-toastify/dist/ReactToastify.css';

import { AIModel } from '@prisma/client';
import Image from 'next/image';
import React from 'react';
import { cn } from '@/lib/utils';
import { toast } from 'react-toastify';

interface CharacterMessageProps {
  character: AIModel;
  role: 'user' | 'assistant' | 'system' | 'tool';
  content: string;
}

const CharacterMessage: React.FC<CharacterMessageProps> = ({
  character,
  role,
  content,
}) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    toast.success('내용이 복사되었습니다!');
  };

  return (
    <div
      className={cn('w-full flex flex-col items-start justify-between mb-4')}
    >
      <div className="w-full first-line:flex">
        <div className="flex items-center">
          <Image
            className="rounded-full mr-4"
            src={role === 'user' ? '/images/noUser.webp' : character.profileImg}
            width={32}
            height={32}
            alt={'profile'}
          />
          <p className="text-base font-medium">
            {role === 'user' ? '나' : character.name}
          </p>
        </div>
      </div>
      <div className="mt-1 ml-10 text-foreground">
        <p className="text-base rounded-lg p-2 whitespace-pre-line">{content}</p>
      </div>
    </div>
  );
};

export default CharacterMessage;
