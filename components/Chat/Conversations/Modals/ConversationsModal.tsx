import { useLazyQuery } from "@apollo/client";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";
import { Session } from "next-auth";
import { useState } from "react";
import UserOperations from "../../../../graphql-client/operations/users";
import {
  SearchUsersData,
  SearchUsersInputs,
  SearchedUser,
} from "@/graphql-client/utils/types";
import UserList from "./UserList";

interface ConversationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  session: Session;
}

const ConversationsModal: React.FC<ConversationsModalProps> = ({
  isOpen,
  onClose,
  session,
}) => {
  const [username, setUsername] = useState<string>("");
  const [participants, setParticipants] = useState<Array<SearchedUser>>([]);
  const [
    searchUsers,
    {
      data: searchUserData,
      loading: searchUserLoading,
      error: searchUserError,
    },
  ] = useLazyQuery<SearchUsersData, SearchUsersInputs>(
    UserOperations.Queries.searchUsers
  );

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchUsers({ variables: { username } });
    console.log(searchUserData);
  };

  const addParticipants = () => {};

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={{ base: "sm", md: "md" }}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Find or Create a Conversation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={onSubmit}>
              <Stack spacing={4}>
                <Input
                  placeholder="Enter a Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Button
                  width="100%"
                  type="submit"
                  disabled={!username}
                  isLoading={searchUserLoading}
                >
                  Search
                </Button>
              </Stack>
            </form>
            {searchUserData?.searchUsers && (
              <UserList
                users={searchUserData.searchUsers}
                participants={searchUserData.searchUsers}
                addParticipants={addParticipants}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConversationsModal;
