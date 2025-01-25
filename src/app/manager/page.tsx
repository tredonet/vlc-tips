import { TipService } from "@/database";
import dynamic from "next/dynamic";

const Manager = dynamic(() => import("./Manager"), { ssr: false });

export default async function ManagerPage() {
  const tipService = new TipService();
  const _tips = await tipService.find({});
  const tips = JSON.parse(JSON.stringify(_tips));
  return <Manager tips={tips} />;
}
