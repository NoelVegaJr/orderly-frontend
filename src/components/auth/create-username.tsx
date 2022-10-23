import { motion } from 'framer-motion';
import * as React from 'react';
import { useRef } from 'react';
import toast from 'react-hot-toast';
import UserOperations from '../../graphql/operations/user';
import { CreateUsernameData, CreateUsernameVariables } from '../../utils/types';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

interface ICreateUsernameProps {}

const CreateUsername: React.FunctionComponent<ICreateUsernameProps> = (
  props
) => {
  const usernameInputRef = useRef<HTMLInputElement | null>(null);
  const [createUsername, { loading, error }] = useMutation<
    CreateUsernameData,
    CreateUsernameVariables
  >(UserOperations.Mutation.createUsername);
  const router = useRouter();
  const reloadSession = () => {
    const event = new Event('visibilitychange');
    document.dispatchEvent(event);
  };

  const handleNewUsername = async () => {
    const username = usernameInputRef?.current?.value;
    if (!username || username === '') {
      toast.error('Please enter a username');
      return;
    }
    console.log(username);
    const { data } = await createUsername({
      variables: { username: username },
    });

    console.log(data);
    if (!data) return;

    if (!data?.createUsername.success) {
      toast.error(data.createUsername.error);
      return;
    }

    toast.success('Username created 🚀');
    router.push('/demo');
  };
  return (
    <div>
      <p className='text-3xl text-center mb-6 tracking-wide'>Create Username</p>
      <div className='flex flex-col gap-4 '>
        <input
          ref={usernameInputRef}
          type='text'
          placeholder='username'
          className='px-2 py-1 text-black  border border-slate-100 outline-none rounded'
          onKeyUp={(e) => e.key === 'Enter' && handleNewUsername()}
        />
        <motion.button
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className='text-lg bg-blue-600 hover:bg-blue-700 duration-50 rounded font-semibold '
          onClick={handleNewUsername}
        >
          Save
        </motion.button>
      </div>
    </div>
  );
};

export default CreateUsername;
