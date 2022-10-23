import * as React from 'react';

interface IImageViewProps {}

const ImageView: React.FunctionComponent<IImageViewProps> = (props) => {
  return (
    <div className='border border-red-600 h-96 lg:w-1/2 bg-blue-400 rounded-lg'></div>
  );
};

export default ImageView;
