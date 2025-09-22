import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
export default function Profile() {
  const session = useSession();
  const data = session.data;
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (data?.user?.name) {
      setNewUsername(data.user.name);
    }
  }, [data?.user?.name]);

  async function handleUpdateName() {
    const res = await fetch("/api/user/updateName", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: newUsername }),
    });
    if (res.ok) {
      const data = await res.json();
      session.update({ name: data.username });
      setIsEditing(false);
    }
  }
  async function handleSubmitImg(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/user/uploadAvatar", {
        method: "post",
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        await session.update({ image: data.url });
        toast.success("Updated successfully", {
          action: { label: "X", onClick: () => {} },
        });
      }
    } catch (err) {
      console.log(err);
    }
    setFile(null);
  }
  return (
    <div className="space-y-3 border-b-2 pb-8">
      <div className="flex items-center gap-2">
        {isEditing ? (
          <div className="flex gap-2 items-center">
            <Input
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="w-50 "
            />
            <Button onClick={handleUpdateName} className="cursor-pointer">
              Save
            </Button>
            <Button
              variant="ghost"
              onClick={() => setIsEditing(false)}
              className="border"
            >
              Cancel
            </Button>
          </div>
        ) : (
          <>
            {session.status === "loading" ? (
              <Skeleton className="h-10 w-[150px]"></Skeleton>
            ) : (
              <h1 className="text-4xl p-1">{newUsername}</h1>
            )}

            <FaEdit
              onClick={() => {
                setIsEditing(true);
              }}
              className="cursor-pointer "
            ></FaEdit>
          </>
        )}
      </div>
      <div className="flex gap-4 items-center">
        {session.status === "loading" ? (
          <Skeleton className="size-25 rounded-full"></Skeleton>
        ) : (
          <Image
            src={data?.user?.image ? data.user.image : "/RobloxIcon.svg"}
            alt="User img"
            width={100}
            height={100}
            className="rounded-full cursor-pointer object-cover w-30 h-30 "
          />
        )}

        <div className="flex-1 space-y-2">
          <form action="" className="flex" onSubmit={handleSubmitImg}>
            {file === null ? (
              <Button
                variant="outline"
                onClick={() => {
                  inputRef.current.click();
                }}
                className="cursor-pointer"
              >
                Choose File
              </Button>
            ) : (
              <>
                <Button type="submit" className="cursor-pointer">
                  Submit
                </Button>
                <p>
                  {file.name.length > 15
                    ? file.name.slice(0, 10) + "..."
                    : file.name}
                </p>
                <p
                  className="text-red-400 ml-5 cursor-pointer"
                  onClick={() => {
                    setFile(null);
                  }}
                >
                  X
                </p>
              </>
            )}
            <input
              type="file"
              ref={inputRef}
              name="file"
              hidden
              onChange={(e) => {
                if (e.target.files[0].size > 2 * 1024 * 1024) {
                  toast.warning("File's Size too large");
                } else {
                  setFile(e.target.files[0]);
                }
              }}
            />
          </form>
          <p className="text-gray-500">
            The ideal image size is 192 x 192 pixels. The maximum file size
            allowed is 200 KiB.
          </p>
        </div>
      </div>
    </div>
  );
}
