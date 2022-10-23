export interface CreateUsernameData {
  createUsername: {
    success: boolean;
    error: string;
  };
}

export interface CreateUsernameVariables {
  username: string;
}

export interface SearchUsersData {
  searchUsers: Array<SearchedUser>;
}

export interface SearchUsersInput {
  searchedUsername: string;
}

export interface SearchedUser {
  id: string;
  username: string;
  image: string;
}

// conversation
export interface IConversation {
  id: string;
  owner: any;
  participant: ConversationParticipant;
  participants: Array<ConversationParticipant>;
  messages: any;
}

export interface ConversationParticipant {
  id: string;
  lastSeenDate: string;
  user: {
    id: string;
    image: string;
    username: string;
  };
}

export interface CreateConversationResponseData {
  createConversation: {
    conversationId: string;
  };
}

export interface CreateConversationVariables {
  participantUserIds: Array<string>;
}

// Tasks
export interface Task {
  id: string;
  title: string;
  taskListId: string;
  dateCreated: string;
}

export interface ITaskList {
  id: string;
  title: string;
  conversationId: string;
  dateCreated: string;
  tasks: Task[];
}

export interface CreateTaskVariables {
  taskListId: string;
  title: string;
}

export interface CreateTaskListVariables {
  conversationId: string;
  title: string;
}

export interface MutationResponse {
  success?: boolean;
  error?: string;
}
