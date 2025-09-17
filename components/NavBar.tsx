"use client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import UserIcon from "./UserIcon";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";
import SignIn from "./authentication/SignIn";
import { useState } from "react";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";
export default function NavBar() {
  const [showForm, setShowForm] = useState(false);
  const session = useSession();
  return (
    <div className="flex items-center justify-center px-10 py-3 border-b-2 relative mb-3">
      <Link className="absolute left-10" href={"/"}>
        <Image src="/RobloxIcon.svg" alt="Logo" width={50} height={50} />
      </Link>

      <NavigationMenu viewport={false}>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="/" className="font-medium">
              Home
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>More Videos</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[300px] ">
                <li>
                  <NavigationMenuLink
                    href="https://www.youtube.com/watch?v=vIiVbFiDbBE&ab_channel=RobloxLearn"
                    target="_blank"
                  >
                    <div className="font-medium">How to start</div>
                    <div className="text-muted-foreground">
                      How to get started creating on Roblox
                    </div>
                  </NavigationMenuLink>
                </li>

                <li>
                  <NavigationMenuLink
                    href="https://www.youtube.com/watch?v=9MUgLaF22Yo&list=PLQ1Qd31Hmi3W_CGDzYOp7enyHlOuO3MtC&ab_channel=BrawlDev"
                    target="_blank"
                  >
                    <div className="font-medium">Scripting for beginner</div>
                    <div className="text-muted-foreground">
                      List of scripting tutorials
                    </div>
                  </NavigationMenuLink>
                </li>

                <li>
                  <NavigationMenuLink
                    href="https://www.youtube.com/watch?v=p005iduooyw&ab_channel=SmartyRBX"
                    target="_blank"
                  >
                    <div className="font-medium">Modeling for beginner</div>
                    <div className="text-muted-foreground">
                      How to get start modeling roblox
                    </div>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              href="https://create.roblox.com/"
              className="font-medium"
              target="_blank"
            >
              Creator Hub
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="absolute right-10 flex items-center gap-4">
        <ThemeToggle />
        {session.status === "loading" ? (
          <Skeleton className="size-8 rounded-full"></Skeleton>
        ) : session.status == "authenticated" ? (
          <UserIcon />
        ) : (
          <Button
            variant={"secondary"}
            className="border-2 cursor-pointer  glow-once border-color"
            onClick={() => {
              setShowForm(true);
            }}
          >
            Sign in
          </Button>
        )}
      </div>

      {showForm ? (
        <SignIn
          onClose={() => {
            setShowForm(false);
          }}
        ></SignIn>
      ) : (
        ""
      )}
    </div>
  );
}
