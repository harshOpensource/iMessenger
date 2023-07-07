import { Button, Center, Image, Input, Stack, Text } from "@chakra-ui/react";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import UserOperations from "../../graphql-client/operations/users";
import {
  CreateUsernameData,
  CreateUsernameVariables,
} from "@/graphql-client/utils/types";
import toast from "react-hot-toast";

interface AuthProps {
  session: Session | null;
  reloadSession: () => void;
}

const Auth: React.FC<AuthProps> = ({ session, reloadSession }: AuthProps) => {
  const [username, setUsername] = useState<string>("");

  const [createUsername, { data, loading, error }] = useMutation<
    CreateUsernameData,
    CreateUsernameVariables
  >(UserOperations.Mutations.createUsername);

  const OnSubmit = async () => {
    if (!username) return;

    try {
      const { data } = await createUsername({
        variables: {
          username,
        },
      });

      if (!data?.createUsername) {
        throw new Error();
      }

      if (data.createUsername.error) {
        const {
          createUsername: { error },
        } = data;
        toast.error(error);
        return;
      }

      toast.success("Username created successfully");
      reloadSession();
    } catch (error) {
      toast.error("There was an error");
      console.log("onSubmit error", error);
    }
  };

  return (
    <Center height="100vh">
      <Stack spacing={8} align="center">
        {session ? (
          <>
            <Image height={100} src="/imessage-logo.png" />
            <Text fontSize="3xl">Create a Username</Text>
            <Input
              placeholder="Enter a Username"
              value={username}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setUsername(event.target.value)
              }
            />
            <Button width="100%" isLoading={loading} onClick={OnSubmit}>
              Create
            </Button>
          </>
        ) : (
          <>
            <Image height={100} src="/imessage-logo.png" />
            <Text fontSize="4xl">MessengerQL</Text>
            <Text width="70%" align="center">
              Sign in with Google to send unlimited free messages to your
              friends
            </Text>
            <Button
              onClick={() => signIn("google")}
              leftIcon={<Image height="20px" src="/googlelogo.png" />}
            >
              Continue with Google
            </Button>
          </>
        )}
      </Stack>
    </Center>
  );
};

export default Auth;
