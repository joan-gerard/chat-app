type Message = {
  text: string;
  name: string;
  id: string;
  socketID: string;
};

type User = {
  userName: string;
  socketID: string;
};

type ChatBodyProps = {
  messages: Message[];
  lastMessageRef: any
  typingStatus: string | null
};
