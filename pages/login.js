import { useSession, signIn } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import Home from "./index";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import login_validate from "@/lib/validate";

export default function Login() {
  const { data: session,status } = useSession();
  const router = useRouter()

  //Formik Hook
  const formik = useFormik({
    initialValues :{
      email:'',
      password:'',
    },
    validate:login_validate,
    onSubmit

  })
  console.log(formik.errors)

 

  async function onSubmit(values){
    console.log(values)
    const status = await signIn('credentials',{
      redirect:false,
      email:values.email,
      password:values.password,
      callbackUrl:"/home"
    })
    console.log(status);
    if (status.ok)router.push(status.url);
    

  }


  
  const handleSignInClick = () => {
    signIn("google", { callbackUrl: "http://localhost:3000" }); // Set the callbackUrl to localhost:3000
    // router.push("/"); // No need to push to "/" here
  };

  if (!session) {
    return (
      <>
        <div className="h-screen flex items-center justify-center">
          <Head>
            <title>Login</title>
          </Head>
          <div className="w-96 p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-600 font-semibold mb-2"
                >
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.email&&formik.touched.email?<span className=" items-center justify-center text-rose-500">{formik.errors.email}</span>: <></>}
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-gray-600 font-semibold mb-2"
                >
                  Password:
                </label>
                <input
                  type="password"
                  name="password"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
              {formik.errors.password&& formik.touched.password ?<span className="items-center justify-center text-rose-500">{formik.errors.password}</span>: <></>}
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Login
              </button>
            </form>
            <div className="mx-auto my-3 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
              or
            </div>
            <button
              className="flex items-center justify-center w-full bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
              onClick={handleSignInClick}
            >
              <svg
                aria-hidden="true"
                focusable="false"
                data-icon="google"
                className="w-5 mr-2"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
              >
                <path
                  fill="#FFFFFF" // Change the color to white to match the text color
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                ></path>
              </svg>
              Continue with Google
            </button>
            <div className="mt-2">
              No account?
              <Link href="/register">Register </Link>
            </div>
          </div>
        </div>
      </>
    );
  }
  

}
