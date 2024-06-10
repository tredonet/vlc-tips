"use server";

import { Tip } from "@/models";
import { Tip as ITip, TipKind } from "@/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function editTip(prevState: any, formData: FormData) {
  const tip: Partial<ITip> = {
    name: formData.get("name") as string,
    kind: formData.get("kind") as TipKind,
    listId: "Tonino",
    description: formData.get("description") as string,
    geometry: {
      lat: parseFloat(
        formData.get("location")?.toString().split(",")[0] as string
      ),
      lng: parseFloat(
        formData.get("location")?.toString().split(",")[1] as string
      ),
    },
    mapsUrl: formData.get("url") as string,
    tags: formData.get("tags")?.toString().split(",") as string[],
  };
  const tipId = formData.get("id") as string;
  if (tipId) tip._id = tipId;
  try {
    if (tip._id) await Tip.findByIdAndUpdate(tip._id, tip);
    else await Tip.create(tip);

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
  try {
    await Tip.findByIdAndDelete(tipId);
    revalidatePath("/");
    revalidatePath(`/manager`);
    redirect("/manager");
  } catch (e) {
    return { message: "Error deleting tip." };
  }
}
