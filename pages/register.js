import Head from "next/head"
import Link from "next/link"

import { useFormik } from "formik";
import { register_validate } from "@/lib/validate";
import { useRouter } from "next/router";
import { headers } from "next/dist/client/components/headers";
import axios from "axios"; 

export default function Register() { 
    const router = useRouter ()
    const formik = useFormik({
        initialValues :{
            username:'',
          email:'',
          password:'',
          cpassword:''
        },
        validate:register_validate,
        onSubmit
    
      })
      async function onSubmit(values){
        console.log(values) 
        try {
            const response = await axios.post("/api/auth/signup", values); // Use Axios to perform the POST request
            const data = response.data;
            if (data.status) {
              // Redirect to the homepage after successful registration
              router.push("/home");
            }
          } catch (error) {
            console.error("Error during registration:", error);
            console.log(error.response);
          }
        console.log(data)
      }
    


    return(
        <>
        <div className="h-screen flex items-center justify-center">
        <Head><title>Register</title></Head>
        <form className="w-96 mx-auto mt-8 p-6 bg-white shadow-md rounded-md" onSubmit={formik.handleSubmit} >
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-600 font-semibold mb-2">
         UserName:
        </label>
        <input
          type="text"
          name="username"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          {...formik.getFieldProps('username')}
        />
        {formik.errors.username&&formik.touched.username?<span className=" items-center justify-center text-rose-500">{formik.errors.username}</span>: <></>}
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-600 font-semibold mb-2">
          Email:
        </label>
        <input
          type="email"
          name="email"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          {...formik.getFieldProps('email')}
        />
        {formik.errors.email&&formik.touched.email?<span className=" items-center justify-center text-rose-500">{formik.errors.email}</span>: <></>}
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block text-gray-600 font-semibold mb-2">
          Password:
        </label>
        <input
          type="password"
          name="password"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          {...formik.getFieldProps('password')}
        />
        {formik.errors.password&&formik.touched.password?<span className=" items-center justify-center text-rose-500">{formik.errors.password}</span>: <></>}
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block text-gray-600 font-semibold mb-2">
         Confirm Password:
        </label>
        <input
          type="password"
          name="cpassword"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          {...formik.getFieldProps('cpassword')}
        />
        {formik.errors.cpassword&&formik.touched.cpassword?<span className=" items-center justify-center text-rose-500">{formik.errors.cpassword}</span>: <></>}
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
      >
        Register
      </button>
      <div className="mt-2">
  Go back to 

  <Link className="mr-2" href="/login"> Login </Link>
        </div>
      
    </form>
    </div>
        </>
    )

}