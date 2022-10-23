import { motion } from 'framer-motion';
import { signIn } from 'next-auth/react';
import Image from 'next/image';

interface IProviderButtonProps {
  provider: string;
  imgSrc: string;
  children: string;
}

const ProviderButton: React.FunctionComponent<IProviderButtonProps> = ({
  provider,
  imgSrc,
  children,
}) => {
  return (
    <motion.button
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={() => signIn(provider)}
      className='bg-slate-700 text-lg px-6 py-2 rounded flex items-center justify-center gap-4 tracking-wide '
    >
      <Image src={imgSrc} alt='Google logo' width={25} height={25} />
      {children}
    </motion.button>
  );
};

export default ProviderButton;
