import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { NextPageContext } from "next";
import { Session } from "next-auth";

interface Props {
  session: Session;
}

export default function Home({}: Props) {
  const { data: session } = useSession();
  console.log(session);
  return (
    <>
      <>
        Signed in as {session?.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>

      <>
        Not signed in <br />
        <button onClick={() => signIn()}>Sign in</button>
      </>
    </>
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
