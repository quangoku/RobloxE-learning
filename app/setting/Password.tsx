import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
export default function Password() {
  return (
    <div className="space-y-7 mt-6 border-b-2 pb-8">
      <h1 className="text-3xl m-0">PASSWORD</h1>
      <p className="text-gray-500">Change your password</p>
      <Input
        placeholder="Current password"
        className="w-2/3 h-11"
        type="password"
      ></Input>
      <Input
        placeholder="New password"
        className="w-2/3 h-11"
        type="password"
      ></Input>
      <Input
        placeholder="Confirm password"
        className="w-2/3 h-11"
        type="password"
      ></Input>
      <Button className="cursor-pointer">Change Password</Button>
    </div>
  );
}
