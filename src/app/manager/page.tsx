import { connect } from "@/db";
import { Tip } from "@/models";
import { Tip as ITip } from "@/types";
import { Manager } from "./Manager";

export default async function ManagerPage() {
  await connect();
  const _tips = await Tip.find({});
  const tips = JSON.parse(JSON.stringify(_tips)) as ITip[];
  return <Manager tips={tips} />;
}
