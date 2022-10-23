import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import ConversationOperations from '../graphql/operations/conversation';
import { ConversationParticipant, IConversation } from '../utils/types';
import { useIncomingMessage } from './messages';

export const useConversations = (userId: string) => {
  const [convosMap, setConvosMap] = useState<any>();
  const [openConvo, setOpenConvo] = useState<IConversation>();
  const [convos, setConvos] = useState<IConversation[]>();
  const incomingMsg = useIncomingMessage(convosMap?.get('ids'));
  const participant = openConvo?.participants.find(
    (p: any) => p.user.id === userId
  ) as ConversationParticipant;

  const gqlConvos = useQuery(ConversationOperations.Query.getConversations, {
    variables: { userId: userId },
  });

  useEffect(() => {
    console.log('creating convorsations map');
    // create conversations map state
    if (gqlConvos.data?.getConversations) {
      const fetchedConvos = gqlConvos.data.getConversations;
      const newConvosMap = new Map();
      const ids: string[] = [];

      fetchedConvos.forEach((conversation: IConversation) => {
        newConvosMap.set(conversation.id, conversation);
        ids.push(conversation.id);
      });
      newConvosMap.set('ids', ids);
      // update conversations map with new conversations map
      setConvosMap((prev: any) => newConvosMap);
      // set initial open conversation on first load... I think
      setOpenConvo(newConvosMap.get(fetchedConvos[0]?.id));
    }
  }, [gqlConvos.loading]);

  useEffect(() => {
    // updating last seen date for conversation
    if (!openConvo) return;

    const convo = { ...openConvo };
    const currParticipant = { ...participant };
    const otherParticipants = convo.participants.filter(
      (p) => p.id !== currParticipant.id
    );

    currParticipant.lastSeenDate = Number(new Date()).toString();
    convo.participants = [...otherParticipants, currParticipant];

    // update conversation in convo map with updated conversation
    setConvosMap((prev: any) => {
      return new Map(convosMap).set(convo.id, convo);
    });
  }, [openConvo]);

  useEffect(() => {
    // do i really need this ?
    if (!convosMap) return;
    setConvos(convosMap?.get('ids').map((id: string) => convosMap.get(id)));
  }, [convosMap]);

  useEffect(() => {
    console.log('incoming message');
    if (!incomingMsg) return;

    const targetConvo = {
      ...convosMap.get(incomingMsg.conversationId),
    };
    targetConvo.messages = [...targetConvo.messages, incomingMsg];
    const newConvoMap = new Map(convosMap).set(targetConvo.id, targetConvo);
    setConvosMap((prev: any) => newConvoMap);
    if (openConvo?.id === incomingMsg.conversationId) {
      const cp = { ...openConvo };
      cp.messages = [...cp.messages, incomingMsg];
      setOpenConvo((prev) => cp as any);
    }
  }, [incomingMsg]);

  return {
    convos,
    openConvo,
    setOpenConvo,
    participant,
  };
};
