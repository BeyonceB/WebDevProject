import { useSession, signIn, signOut } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";

export default function Component() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="mt-20 mx-auto max-w-md p-6 border rounded-lg">
        <h1 className="text-2xl font-bold mb-4">
          Signed in as {session.user.email}
        </h1>
        <img
          src={session.user.image}
          alt={`${session.user.name}'s profile picture`}
          className="rounded-full w-32 h-32 mb-4 mx-auto"
        />
        <h2 className="text-xl font-medium mb-2">{session.user.name}</h2>
        <button
          onClick={() => signOut()}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Sign out
        </button>
      </div>
    );
  }
  return (
    <div className="mx-auto max-w-md p-6 border rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Not signed in</h1>
      <button
        onClick={() => signIn()}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Sign in
      </button>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    //redirect to login page
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
