import Image from 'next/image';

interface IAvatarProps {
  src?: string;
  size: number;
}

const Avatar: React.FunctionComponent<IAvatarProps> = ({ src, size }) => {
  return (
    <>
      {src ? (
        <Image
          src={src}
          alt='profile picture'
          width={size}
          height={size}
          className='rounded-full'
        />
      ) : (
        <div>defult</div>
      )}
    </>
  );
};

export default Avatar;
