import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { changePassword, setPassword } from "@/app/actions/user";
import { toast } from "sonner";
import SubmitButton from "./SubmitButton";
export default function Password() {
  const [hasPassword, setHasPassword] = useState(true);

  useEffect(() => {
    async function checkPassword() {
      const res = await fetch("api/user/hasPassword", {
        method: "get",
      });
      const data = await res.json();
      if (!data.hasPassword) {
        setHasPassword(false);
      }
    }
    checkPassword();
  }, []);

  async function handleChangePassword(formData: FormData) {
    const currentPassword = formData.get("currentPassword") as string;
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.warning("Please fill in all fields", {
        duration: 3000,
        action: { label: "X", onClick: () => {} },
      });
    }

    if (newPassword.length < 6) {
      toast.warning("New password must be at least 6 characters", {
        duration: 3000,
        action: { label: "X", onClick: () => {} },
      });
    }

    if (newPassword !== confirmPassword) {
      toast.warning("Passwords didn't match", {
        duration: 3000,
        action: { label: "X", onClick: () => {} },
      });
    }
    //server action
    const res = await changePassword(formData);

    const toastFn = res.success ? toast.success : toast.warning;
    toastFn(res.message, {
      duration: 3000,
      action: { label: "X", onClick: () => {} },
    });
  }

  async function handleSetPassword(formData: FormData) {
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      toast.warning("Password didn't match", {
        duration: 3000,
        action: { label: "X", onClick: () => {} },
      });
    } else {
      // server action here
      const res = await setPassword(formData);

      if (!res.success) {
        toast.warning(res?.message, {
          duration: 3000,
          action: { label: "X", onClick: () => {} },
        });
      } else {
        toast.success(res?.message, {
          duration: 3000,
          action: { label: "X", onClick: () => {} },
        });

        setHasPassword(!hasPassword);
      }
    }
  }
  return (
    <div className="space-y-7 mt-6 border-b-2 pb-8">
      <h1 className="text-3xl m-0">PASSWORD</h1>
      {hasPassword ? (
        <>
          <p className="text-gray-500">Change your password</p>
          <form action={handleChangePassword} className="space-y-7">
            <Input
              placeholder="Current password"
              className="w-2/3 h-11"
              type="password"
              name="currentPassword"
            ></Input>
            <Input
              placeholder="New password"
              className="w-2/3 h-11"
              type="password"
              name="newPassword"
            ></Input>
            <Input
              placeholder="Confirm password"
              className="w-2/3 h-11"
              type="password"
              name="confirmPassword"
            ></Input>
            <SubmitButton text="Set Password"></SubmitButton>
          </form>
        </>
      ) : (
        <>
          <p className="text-gray-500">You haven{"'"}t set your password :</p>
          <form action={handleSetPassword} className="space-y-7">
            <Input
              placeholder="Password"
              className="w-2/3 h-11"
              type="password"
              name="password"
            ></Input>
            <Input
              placeholder="Confirm password"
              className="w-2/3 h-11"
              type="password"
              name="confirmPassword"
            ></Input>
            <SubmitButton text="Set Password"></SubmitButton>
          </form>
        </>
      )}
    </div>
  );
}
