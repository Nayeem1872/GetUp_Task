import { useSession, signIn, signOut, getSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Login from "./login"; 
import Data from "@/components/data";


export default function Home() {
  const { data: session } = useSession();
  

  const handleSignOutClick = () => {
    signOut();
  };
  

  return (
    <>
      <div className="flex flex-col items-center justify-center mt-3">
        {session.user && (
          <div
            className="w-20 h-20 rounded-full mb-4 bg-gray-200 cursor-pointer"
            style={{
              backgroundImage: `url(${session.user.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        )}
        <p className="text-lg font-semibold text-gray-800">
          Welcome, {session.user ? session.user.name : "User"}
        </p>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mt-4"
          onClick={handleSignOutClick}
        >
          Sign Out
        </button>
      </div>

      <div><Data/></div>
    </>
  );
}
export async function getServerSideProps({req}){
  const session = await getSession({req})
  
  if(!session){
    return{
      redirect:{
        destination:'/login',
        permanent:false,
      }
    }
  }
  return{
    props:{
      session
    }
  }
  
  }