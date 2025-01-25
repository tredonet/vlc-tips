import { TipService } from "@/database";
import dynamic from "next/dynamic";

const Manager = dynamic(() => import("./Manager"), { ssr: false });

export default async function ManagerPage() {
  const tipService = new TipService();
  const tips = await tipService.find({});
  return <Manager tips={tips} />;
}
