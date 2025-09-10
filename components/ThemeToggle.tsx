"use client";
import { useTheme } from "next-themes";
import React from "react";
import { Button } from "./ui/button";
import { FaMoon, FaSun } from "react-icons/fa";
export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      variant={"outline"}
      size={"icon"}
      className="rounded-full"
      onClick={() => {
        setTheme(theme === "light" ? "dark" : "light");
      }}
    >
      {theme === "dark" ? <FaSun></FaSun> : <FaMoon></FaMoon>}
    </Button>
  );
}
