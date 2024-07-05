import Link from 'next/link';
import { MdChevronRight } from 'react-icons/md';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CustomIconLinkProps {
  href: string;
  icon: ReactNode;
  text: string;
}

const CustomIconLink: React.FC<CustomIconLinkProps> = ({ href, icon, text }) => {
  return (
    <Link href={href} 
      className={cn(
        'flex items-center justify-between',
        'rounded',
        'py-2 px-4',
        'hover:bg-gray-200',
        'cursor-pointer'
      )}
    >
      <div className={cn('flex items-center')}>
        {icon}
        <p className="text-base font-semibold ml-4">{text}</p>
      </div>
      <MdChevronRight className="text-slate-500" />
    </Link>
  );
};

export default CustomIconLink;
