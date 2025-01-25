"use server";

import { TipService } from "@/database";
import { Tip, TipKind } from "@/models";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function editTip(prevState: any, formData: FormData) {
  const tipService = new TipService();
  const tip: Tip = {
    name: formData.get("name") as string,
    kind: formData.get("kind") as TipKind,
    description: formData.get("description") as string,
    geometry: {
      lat: parseFloat(formData.get("location")?.toString().split(",")[0] as string),
      lng: parseFloat(formData.get("location")?.toString().split(",")[1] as string),
    },
    mapsUrl: formData.get("url") as string,
    tags: formData.get("tags")?.toString().split(",") as string[],
  };
  const tipId = formData.get("id") as string;
  try {
    if (tipId) await tipService.updateOne(tip._id, tip);
    else await tipService.insertOne(tip);

    revalidatePath("/");
    revalidatePath(`/manager`);
    revalidatePath(`/manager/${tip._id}`);
  } catch (e) {
    console.log(e);
    //@ts-ignore
    return { message: "Error updating tip.", trace: e.message };
  }
  redirect("/manager");
}

export async function deleteTip(tipId?: string) {
  if (!tipId) return { message: "Tip ID not provided." };
  const tipService = new TipService();
  try {
    await tipService.deleteOne({ tipId });
    revalidatePath("/");
    revalidatePath(`/manager`);
    redirect("/manager");
  } catch (e) {
    return { message: "Error deleting tip." };
  }
}
