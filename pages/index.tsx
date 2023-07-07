import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { NextPageContext } from "next";
import { Session } from "next-auth";
import { Box } from "@chakra-ui/react";
import Chat from "@/components/Chat/Chat";
import Auth from "@/components/Auth/Auth";
import { useRouter } from "next/router";

interface Props {
  session: Session;
}

export default function Home({}: Props) {
  const { data: session } = useSession();

  const router = useRouter();

  return (
    <Box>
      {session && session.user?.username ? (
        <Chat session={session} />
      ) : (
        <Auth session={session} />
      )}
    </Box>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
