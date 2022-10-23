import { useMutation } from '@apollo/client';
import * as React from 'react';
import { useEffect, useState } from 'react';
import UserOperations from '../graphql/operations/user';

interface ITestProps {}

const Test: React.FunctionComponent<ITestProps> = (props) => {
  const [number, setNumber] = useState(0);
  const [msg, setMsg] = useState('');
  const [createNewMessage] = useMutation(
    UserOperations.Mutation.createNewMessage
  );

  return (
    <div>
      <input
        type='text'
        placeholder='message'
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
      />
      <button
        onClick={() => {
          createNewMessage({ variables: { text: msg } });
        }}
      >
        Send
      </button>
    </div>
  );
};

export default Test;
