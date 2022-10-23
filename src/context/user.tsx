import { User } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { createContext, useEffect } from 'react';

interface UserProviderProps {
  children: JSX.Element | JSX.Element[];
}

export const UserContext = createContext<User | null>(null);

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (!session) {
      router.push('/');
    }
  }, [session]);

  return (
    <UserContext.Provider value={session ? session.user : null}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
