import React, { useState } from "react";
import SignUp from "./SignUp";
import { Input } from "../ui/input";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

type LoginProps = {
  onClose: () => void;
};

export default function SignIn({ onClose }: LoginProps) {
  const [data, setData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);

  if (openSignUp) {
    return <SignUp onClose={onClose} />;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      callbackUrl: "/",
    });
  }

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl p-8 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">
          Sign In
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <Input
            type="email"
            placeholder="Email"
            name="email"
            value={data.email}
            onChange={handleChange}
            required
            className="w-full rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500"
          />

          {/* Password */}
          <div className="relative">
            <Input
              value={data.password}
              onChange={handleChange}
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              className="w-full rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </button>
          </div>

          {/* Login button */}
          <button
            type="submit"
            className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl font-medium shadow-md transition duration-200"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300 dark:bg-gray-700" />
          <span className="px-3 text-sm text-gray-500">OR</span>
          <div className="flex-grow h-px bg-gray-300 dark:bg-gray-700" />
        </div>

        {/* Google login */}
        <div className="flex justify-center">
          <button
            type="button"
            className="flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 rounded-xl py-2 px-4 shadow-sm hover:bg-gray-50 dark:hover:bg-neutral-800 transition"
          >
            <FcGoogle size={24} />
            <span
              className="text-gray-700 dark:text-gray-200 font-medium"
              onClick={() => {
                signIn("google", {
                  callbackUrl: "/",
                });
              }}
            >
              Continue with Google
            </span>
          </button>
        </div>

        {/* Sign up link */}
        <p className="text-sm text-center mt-6 text-gray-600 dark:text-gray-400">
          Don’t have an account?{" "}
          <span
            className="text-blue-500 hover:underline cursor-pointer"
            onClick={() => setOpenSignUp(true)}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}
