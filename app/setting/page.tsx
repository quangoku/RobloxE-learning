"use client";

import Password from "./Password";
import Profile from "./Profile";

export default function page() {
  return (
    <div className="border-x-2 mx-auto max-w-xl h-screen p-8">
      <Profile></Profile>
      <Password></Password>
    </div>
  );
}
