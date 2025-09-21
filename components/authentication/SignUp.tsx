import React, { useState } from "react";
import { Input } from "../ui/input";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import SignIn from "./SignIn";
import { toast } from "sonner";

interface SignUpProps {
  onClose: () => void;
}

export default function SignUp({ onClose }: SignUpProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  if (openSignIn) {
    return <SignIn onClose={onClose} />;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast.warning("Invalid  email", {
        duration: 3000,
        action: {
          label: "x",
          onClick: () => {},
        },
      });
      return;
    } else if (data.password !== data.confirmPassword) {
      toast.warning("Confirm Password didn't match", {
        duration: 3000,
        action: {
          label: "x",
          onClick: () => {},
        },
      });
      return;
    }

    const res = await fetch("api/signin", {
      method: "POST",
      body: JSON.stringify({ data }),
    });

    const mess = await res.json();

    if (!res.ok) {
      toast.warning(mess.message, {
        duration: 3000,
        action: {
          label: "x",
          onClick: () => {},
        },
      });
    } else {
      setOpenSignIn(true);
      toast.success("Account created successfully", {
        duration: 3000,
        action: {
          label: "x",
          onClick: () => {},
        },
      });
    }
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
          Sign Up
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <Input
            type="text"
            placeholder="Name"
            name="name"
            value={data.name}
            onChange={handleChange}
            required
            className="w-full rounded-xl border-gray-300 focus:ring-2 focus:ring-green-500"
          />

          {/* Email */}
          <Input
            type="email"
            placeholder="Email"
            name="email"
            value={data.email}
            onChange={handleChange}
            required
            className="w-full rounded-xl border-gray-300 focus:ring-2 focus:ring-green-500"
          />

          {/* Password */}
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={data.password}
              onChange={handleChange}
              required
              className="w-full rounded-xl border-gray-300 focus:ring-2 focus:ring-green-500 pr-10"
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

          {/* Confirm Password */}
          <div className="relative">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              name="confirmPassword"
              value={data.confirmPassword}
              onChange={handleChange}
              required
              className="w-full rounded-xl border-gray-300 focus:ring-2 focus:ring-green-500 pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </button>
          </div>

          {/* Submit */}

          <button
            type="submit"
            className="w-full cursor-pointer bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-xl font-medium shadow-md transition duration-200"
          >
            Sign Up
          </button>
        </form>

        {/* Link to Sign in */}
        <p className="text-sm text-center mt-6 text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <span
            className="text-blue-500 hover:underline cursor-pointer"
            onClick={() => setOpenSignIn(true)}
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}
