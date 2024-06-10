import { Modal } from "@/components";
import { connect } from "@/db";
import { Tip } from "@/models";
import { Tip as ITip } from "@/types";
import { Form } from "./Form";
import { redirect } from "next/navigation";

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
  return (
    <Modal isOpen big>
      <div className="flex flex-col gap-4 w-full h-screen">
        <h4 className="text-lg font-medium text-gray-800">
          {tip?.name ?? "New Tip"}
        </h4>
        <Form tip={tip} />
      </div>
    </Modal>
  );
}
