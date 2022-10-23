import * as React from 'react';
import { SearchedUser } from '../../../../utils/types';
import Image from 'next/image';

interface ISearchUsersListProps {
  users: Array<SearchedUser>;
  addParticipant: (user: SearchedUser) => void;
}

const SearchUsersList: React.FunctionComponent<ISearchUsersListProps> = ({
  users,
  addParticipant,
}): JSX.Element => {
  console.log('IN SEARCHED USERS LIST');
  console.log(users.length);

  return (
    <>
      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <ul>
          {users.map((user) => {
            return (
              <li
                key={user.id}
                className='flex items-center justify-between hover:bg-neutral-600 p-4 rounded transition-all duration-150'
              >
                <div className='flex items-center gap-4'>
                  <Image
                    src={user.image}
                    alt='user profile iamge'
                    height={50}
                    width={50}
                    className='rounded-full'
                  />
                  <p>{user.username}</p>
                </div>
                <button
                  onClick={() => addParticipant(user)}
                  className='text-white bg-blue-600  px-4 py-2 rounded tracking-wider'
                >
                  Select
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default SearchUsersList;
