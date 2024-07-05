import ChatRoom from '@/components/ChatRoom';
import { authOptions } from '@/lib/next-auth';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { verifyRoomID } from '@/lib/utils/fetch';

interface PageProps {
  params: {
    roomId: string;
  };
}

export default async function Page({ params }: PageProps) {
  const session = await getServerSession(authOptions);
  const roomInfo = await verifyRoomID(params.roomId);

  if (roomInfo === null) {
    return notFound();
  }

  return <ChatRoom roomInfo={roomInfo} />;
}
