import { useSubscription } from '@apollo/client';
import MessageOperations from '../graphql/operations/message';

export const useIncomingMessage = (conversationsIds: string[]) => {
  const newMessage = useSubscription(MessageOperations.Subscriptions.msg2, {
    variables: { conversationIds: conversationsIds },
  });

  return newMessage.data?.msg2;
};
