import Image from 'next/image';
interface IAvatarProps {
  src: string;
}

const Avatar: React.FunctionComponent<IAvatarProps> = ({ src }) => {
  return (
    <Image
      src={src}
      width={40}
      height={40}
      alt='profile image'
      className='rounded-full'
    />
  );
};

export default Avatar;
