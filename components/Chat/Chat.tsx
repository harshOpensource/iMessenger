import { Flex } from "@chakra-ui/react";
import { Session } from "next-auth";
import ConversationModalProvider from "../ModalProvider/ModalProvider";
import Conversations from "./Conversations/Conversations";
import Feed from "./Feed/Feed";

interface ChatProps {
  session: Session;
}

const Chat: React.FC<ChatProps> = ({ session }) => {
  return (
    <Flex height="100vh">
      <ConversationModalProvider>
        <Conversations session={session} />
        <Feed session={session} />
      </ConversationModalProvider>
    </Flex>
  );
};

export default Chat;
