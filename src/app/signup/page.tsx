"use client";
import Link from "next/link";
import React, { use } from "react";
import { useRouter } from "next/navigation";
import axios from "axios"; // ✅ fixed incorrect import
import { useEffect } from "react";
import { toast } from "react-hot-toast";
export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup response:", response.data);
      toast.success("Account created successfully");
      router.push("/login");
    } catch (error: any) {
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-2xl p-8 w-full max-w-md text-white">
        <h1 className="text-3xl font-bold text-center mb-6">
          {loading ? "Creating your account..." : "Create an Account"}
        </h1>
        <hr className="border-gray-700 mb-6" />

        <div className="flex flex-col space-y-4">
          <label className="text-sm font-medium">Username</label>
          <input
            type="text"
            value={user.username}
            placeholder="Enter your username"
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            value={user.email}
            placeholder="Enter your email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <label className="text-sm font-medium">Password</label>
          <input
            type="password"
            value={user.password}
            placeholder="Enter your password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            onClick={onSignup}
            className="mt-6 w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition-all duration-200 font-semibold"
          >
            {buttonDisabled ? "Creating Account..." : "Sign Up"}
          </button>
        </div>

        <p className="text-center text-gray-400 text-sm mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-indigo-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
