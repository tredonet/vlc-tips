"use client";

import { Tip } from "@/types";
import { editTip, deleteTip } from "./action";
import { ComponentProps } from "react";
import { Button } from "@/components";
import { useRouter } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";

export const Form = ({ tip }: { tip?: Tip }) => {
  const [state, formAction] = useFormState(editTip, { message: "", trace: "" });
  const { pending } = useFormStatus();
  const router = useRouter();
  const onClose = () => router.back();
  const onDeleteTip = () => {
    if (confirm("Are you sure you want to delete this tip?"))
      deleteTip(tip?._id);
  };

  return (
    <form action={formAction} className="grid grid-cols-2 gap-2">
      <input type="hidden" name="id" aria-label="ID" defaultValue={tip?._id} />
      <Input
        type="text"
        name="name"
        aria-label="Name"
        defaultValue={tip?.name}
      />
      <Input
        type="text"
        name="kind"
        aria-label="Kind"
        defaultValue={tip?.kind}
      />
      <Input
        type="text"
        name="description"
        aria-label="Description"
        defaultValue={tip?.description}
      />
      <Input
        type="text"
        name="location"
        aria-label="Location (Latitude, Longitude)"
        defaultValue={
          tip?._id ? `${tip?.geometry.lat}, ${tip?.geometry.lng}` : ""
        }
      />
      <Input
        type="text"
        name="url"
        aria-label="Maps URL"
        defaultValue={tip?.mapsUrl}
      />
      <Input
        type="text"
        name="tags"
        aria-label="Tags"
        defaultValue={tip?.tags.join(", ")}
      />
      <Button
        type="submit"
        className="bg-teal-600 col-span-1"
        disabled={pending}
      >
        Save
      </Button>
      {tip?._id && (
        <Button
          type="button"
          onClick={onDeleteTip}
          className="bg-orange-500 col-span-1"
        >
          Delete
        </Button>
      )}
      <Button type="button" className="bg-red-500 col-span-1" onClick={onClose}>
        Close
      </Button>
    {state.message && <p>{JSON.stringify(state)}</p>}
    </form>
  );
};

const Input = (props: ComponentProps<"input">) => {
  return (
    <div>
      <label className="px-1 block text-sm font-medium text-gray-700">
        {props["aria-label"]}
      </label>
      <input
        {...props}
        className={`${props.className} px-1 focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 border rounded-md h-6 leading-4`}
      />
    </div>
  );
};
