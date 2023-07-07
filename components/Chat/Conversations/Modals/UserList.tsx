import { SearchedUser } from "@/graphql-client/utils/types";
import { Avatar, Button, Flex, Stack, Text } from "@chakra-ui/react";
import React from "react";

interface UsersListProps {
  users: Array<SearchedUser>;
  participants: Array<SearchedUser>;
  addParticipants: (user: SearchedUser) => void;
}

const UserList: React.FC<UsersListProps> = ({
  users,
  participants,
  addParticipants,
}) => {
  return (
    <>
      {users.length === 0 ? (
        <Flex mt={6} justify="center">
          <Text>No User Found</Text>
        </Flex>
      ) : (
        <Stack mt={6}>
          {users.map((user) => (
            <Stack
              key={user.id}
              direction="row"
              align="center"
              spacing={4}
              py={2}
              px={4}
              borderRadius={4}
              _hover={{ bg: "whiteAlpha.200" }}
            >
              <Avatar />
              <Flex justify="space-between" width="100%">
                <Text color="whiteAlpha.700">{user.username}</Text>
                <Button
                  bg="brand.100"
                  _hover={{ bg: "brand.100" }}
                  disabled={!!participants.find((p) => p.id === user.id)}
                  onClick={() => addParticipants(user)}
                >
                  Select
                </Button>
              </Flex>
            </Stack>
          ))}
        </Stack>
      )}
    </>
  );
};

export default UserList;
