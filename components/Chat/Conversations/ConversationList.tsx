import { Box, Text } from "@chakra-ui/react";
import { Session } from "next-auth";
import React, { useContext } from "react";
import { ModalContext, IModalContext } from "../../ModalProvider/ModalProvider";
import ConversationsModal from "./Modals/ConversationsModal";

interface ConversationListProps {
  session: Session;
}

const ConversationList: React.FC<ConversationListProps> = ({ session }) => {
  const { openModal, modalOpen, closeModal } =
    useContext<IModalContext>(ModalContext);

  const toggleClose = () => {
    closeModal();
  };

  return (
    <Box width="100%" overflow="hidden">
      <Box
        py={2}
        px={4}
        mb={4}
        bg="blackAlpha.300"
        borderRadius={4}
        cursor="pointer"
        onClick={openModal}
      >
        <Text color="whiteAlpha.800" fontWeight={500}>
          Start a Conversation
        </Text>
      </Box>
      <ConversationsModal
        isOpen={modalOpen}
        onClose={toggleClose}
        session={session}
      />
    </Box>
  );
};

export default ConversationList;
