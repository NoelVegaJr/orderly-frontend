import * as React from 'react';
import Image from 'next/image';
import { SearchedUser } from '../../../../utils/types';

interface IParticipantListProps {
  users: Array<SearchedUser>;
  removeParticipant: (user: SearchedUser) => void;
}

const ParticipantList: React.FunctionComponent<IParticipantListProps> = ({
  users,
  removeParticipant,
}) => {
  return (
    <ul className='flex flex-wrap gap-2'>
      {users.map((user) => {
        return (
          <li
            key={user.id}
            className='flex items-center gap-2 w-fit bg-neutral-600 p-2 rounded transition-all duration-150'
          >
            <Image
              src={user.image}
              alt='user profile iamge'
              height={25}
              width={25}
              className='rounded-full'
            />
            <p className='text-xs'>{user.username}</p>

            <button
              onClick={() => removeParticipant(user)}
              className='text-red-600  rounded-full'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-4 h-4'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default ParticipantList;
