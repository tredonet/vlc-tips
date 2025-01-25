import { Tip } from "@/models";
import { redirect } from "next/navigation";
import { EditTip } from "./EditTip";
import { TipService } from "@/database";
import { ObjectId } from "mongodb";

type Params = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: Params) {
  const { id } = params;
  const tipService = new TipService();
  const _tip = id === "new" ? undefined : await tipService.findOne({ _id: new ObjectId(id) });
  const tip = _tip ? JSON.parse(JSON.stringify(_tip)) : _tip;
  return <EditTip tip={tip} />;
}
