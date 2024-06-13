import { connect } from "@/db";
import { Tip } from "@/models";
import { Tip as ITip } from "@/types";
import { redirect } from "next/navigation";
import { EditTip } from "./EditTip";

type Params = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: Params) {
  const { id } = params;
  await connect();
  const _tip = await Tip.findById(id);
  const tip = JSON.parse(JSON.stringify(_tip)) as ITip;
  if (!tip && id !== "new") redirect("/manager");
  return <EditTip tip={tip} />;
}
