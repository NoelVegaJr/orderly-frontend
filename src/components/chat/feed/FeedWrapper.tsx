import { FunctionComponent } from 'react';
import Feed from './Feed';
import Input from './Input';

interface IFeedWrapperProps {
  children: JSX.Element | JSX.Element[];
}

const FeedWrapper: React.FC<IFeedWrapperProps> = ({ children }) => {
  return (
    <div className='h-full grow flex flex-col overflow-x-auto'>{children}</div>
  );
};

export default FeedWrapper;
