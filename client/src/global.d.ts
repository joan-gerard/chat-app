// interface Socket {
//   socket: any;
// }
type Message = {
  text: string;
  name: string;
  id: string;
  socketID: string;
};

type ChatBodyProps = {
  messages: Message[];
};
