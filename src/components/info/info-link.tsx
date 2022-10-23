import Link from 'next/link';
import * as React from 'react';

interface IInfoLinkProps {
  href: string;
  label: string;
}

const InfoLink: React.FunctionComponent<IInfoLinkProps> = ({ href, label }) => {
  return (
    <Link href={href}>
      <div className='w-fit group cursor-pointer'>
        <a className='text-cyan-600 text-lg font-semibold flex items-center gap-2'>
          {label}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3'
            />
          </svg>
        </a>
        <div className='w-0 group-hover:w-full h-0.5 transition-all duration-500 ease-in-out bg-cyan-600' />
      </div>
    </Link>
  );
};

export default InfoLink;
