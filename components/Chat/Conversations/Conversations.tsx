import { Box } from "@chakra-ui/react";
import { Session } from "next-auth";
import { useRouter } from "next/router";
import ConversationList from "./ConversationList";

interface ConversationsProps {
  session: Session;
}

const Conversations: React.FC<ConversationsProps> = ({ session }) => {
  const router = useRouter();
  const { conversationId } = router.query;

  return (
    <Box
      width={{ base: "100%", md: "400px" }}
      bg="whiteAlpha.50"
      py={6}
      px={3}
      position="relative"
    >
      <ConversationList session={session} />
    </Box>
  );
};

export default Conversations;
