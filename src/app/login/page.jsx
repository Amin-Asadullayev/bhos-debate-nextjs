"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const router = useRouter();

  const loginHandler = async (e) => {
    e.preventDefault();
    if (!email.includes("@") || !email.includes(".")) {
      alert("Enter a valid email address.")
    } else if (password.length < 8){
      alert("Password should be at least 8 characters.")
    } else {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const idToken = await userCredential.user.getIdToken();
        const res = await signIn("credentials", {
          idToken,
          redirect: false,
        });

        if (res.ok) { router.push("/admin"); }
        else { alert("Access Denied"); }

      } catch (err) {
        console.error(err);
        alert("Invalid login!");
      }
    }
  };

  return (
    <>
      <Navbar />
      <form className=" w-full max-w-xs bg-gray-200 mx-auto shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-8 dark:bg-gray-400" onSubmit={loginHandler}>
        <h1 className="font-bold text-2xl mb-3">Admin Login</h1>
        <hr />
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mt-2 mb-2">Email</label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold my-2">Password</label>
          <input
            type="password"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Password"
            value={password}
            onChange={(e) => setPass(e.target.value)}
            required
          />
        </div>
        <button className="font-bold w-full p-2 bg-gray-400 dark:bg-gray-700 rounded dark:text-gray-300" type="submit">Login</button>
      </form>
    </>
  );
}
