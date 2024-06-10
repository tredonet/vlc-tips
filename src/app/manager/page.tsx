import { connect } from "@/db";
import { Tip } from "@/models";
import { Tip as ITip } from "@/types";
import { AddTip, Tips } from "./Tips";
import { redirect } from "next/navigation";
import { logout } from "../login/login";

export default async function Manager() {
  await connect();
  const _tips = await Tip.find({});
  const tips = JSON.parse(JSON.stringify(_tips)) as ITip[];
  return (
    <div className="flex gap-16 w-full h-screen bg-slate-600 justify-center p-4">
      <Tips tips={tips} />
      <AddTip />

      <form
          action={async () => {
            "use server";
            await logout();
            redirect("/");
          }}
        >
          <button className="bg-red-500 text-white p-2 rounded" type="submit" >Logout </button> 
          </form>
    </div>
  );
}
