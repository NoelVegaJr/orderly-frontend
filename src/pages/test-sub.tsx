import { useSubscription } from '@apollo/client';
import * as React from 'react';
import { useEffect, useState } from 'react';
import UserOperations from '../graphql/operations/user';

interface ITestSubProps {}

const TestSub: React.FunctionComponent<ITestSubProps> = (props) => {
  const { data, loading } = useSubscription(UserOperations.Subscriptions.msg);
  const [msgs, setMsgs] = useState<Array<string>>([]);
  useEffect(() => {
    setMsgs((prev) => [...prev, data?.msg]);
  }, [data]);
  console.log(data);
  return (
    <ul>
      {msgs.map((m) => {
        return <li key={m}>{m}</li>;
      })}
    </ul>
  );
};

export default TestSub;
