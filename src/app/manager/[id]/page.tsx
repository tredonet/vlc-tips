import { Tip } from "@/models";
import { redirect } from "next/navigation";
import { EditTip } from "./EditTip";
import { TipService } from "@/database";

type Params = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: Params) {
  const { id } = params;
  const tipService = new TipService();
  const tip = await tipService.findOne({ _id: id });
  return <EditTip tip={tip} />;
}
