import Data from "@/components/data";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const { data: session } = useSession();
  const handleSignOutClick = () => {
    signOut();
  };

  return (
    <>
    
    <div >
      {session ? (
        <>
          {/* <div
            className="w-20 h-20 rounded-full mb-4 bg-gray-200 cursor-pointer"
            style={{
              backgroundImage: `url(${session.user.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div> */}
          <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl mt-3 font-semibold text-gray-800">
            Welcome, {session.user.username}
          </h1>
          <p className="text-lg font-semibold text-gray-800">
            Email: {session.user.email}
          </p>
          <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mt-4"
          onClick={handleSignOutClick}
        >
          Sign Out
        </button>
        </div>
          {/* Display other user information */}
          <Data />
          <ToastContainer />
        </>
      ) : (
        <div className="h-screen flex flex-col items-center justify-center">
      <p className="text-2xl font-semibold text-gray-800 mt-3">You are not logged in</p>
      <Link href="/login" className="mt-3 text-blue-600 hover:underline">
        Go to Login
      </Link>
    </div>
      )}
    </div>
    </>
  );
}
