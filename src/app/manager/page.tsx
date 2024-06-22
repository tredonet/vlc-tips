import { connect } from "@/db";
import { Tip } from "@/models";
import { Tip as ITip } from "@/types";
import dynamic from "next/dynamic";

const Manager = dynamic(() => import("./Manager"), { ssr: false });

export default async function ManagerPage() {
  await connect();
  const _tips = await Tip.find({});
  const tips = JSON.parse(JSON.stringify(_tips)) as ITip[];
  return <Manager tips={tips} />;
}
