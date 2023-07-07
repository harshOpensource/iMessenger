import { Session } from "next-auth";

interface ConversationsProps {
  session: Session;
}

const Conversations: React.FC<ConversationsProps> = ({}) => {
  return <div>conversation</div>;
};

export default Conversations;
