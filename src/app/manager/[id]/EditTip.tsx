"use client";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import { Tip } from "@/models";
import { useSearchBox } from "@/hooks";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import { Modal } from "@/features";
import { useRouter } from "next/navigation";
import { Button } from "@/components";
import { ComponentProps } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { editTip, deleteTip } from "./action";

export function EditTip({ tip }: { tip?: Tip }) {
  const { SearchBox, tip: searchedTip } = useSearchBox();
  const router = useRouter();
  return (
    <Modal big showModal title="Tip" onClose={() => router.back()}>
      <div className="py-4 w-full h-screen">
        <h4 className="text-lg font-medium text-gray-800">{tip?.name ?? "New Tip"}</h4>
        <div className="flex gap-4 h-full w-full">
          <Form tip={tip ?? searchedTip} className="w-2/5 h-fit" />
          <Map className="h-full w-3/5">
            {!tip && <SearchBox />}
            {tip && <Marker position={[tip.geometry.lat, tip.geometry.lng]} icon={new Icon({ iconUrl: "../../../restaurantMarker.svg" })} />}
          </Map>
        </div>
      </div>
    </Modal>
  );
}

type FormProps = ComponentProps<"form"> & {
  tip?: Tip;
};

export const Form = ({ tip, className }: FormProps) => {
  const [state, formAction] = useFormState(editTip, { message: "", trace: "" });
  const { pending } = useFormStatus();
  const onDeleteTip = () => {
    if (confirm("Are you sure you want to delete this tip?")) deleteTip(tip?._id?.toString());
  };

  return (
    <form action={formAction} className={`grid grid-cols-2 gap-2 ${className}`}>
      <input type="hidden" name="id" aria-label="ID" defaultValue={tip?._id?.toString()} />
      <Input type="text" name="name" aria-label="Name" defaultValue={tip?.name} />
      <Input type="text" name="kind" aria-label="Kind" defaultValue={tip?.kind} />
      <Input type="text" name="description" aria-label="Description" defaultValue={tip?.description} />
      <Input type="text" name="location" aria-label="Location (Latitude, Longitude)" defaultValue={tip ? `${tip?.geometry.lat}, ${tip?.geometry.lng}` : ""} />
      <Input type="text" name="url" aria-label="Maps URL" defaultValue={tip?.mapsUrl} />
      <Input type="text" name="tags" aria-label="Tags" defaultValue={tip?.tags.join(", ")} />
      <Button type="submit" className="bg-teal-600 col-span-1" disabled={pending}>
        Save
      </Button>
      {tip?._id && (
        <Button type="button" onClick={onDeleteTip} className="bg-orange-500 col-span-1">
          Delete
        </Button>
      )}
      {state.message && <p>{JSON.stringify(state)}</p>}
    </form>
  );
};

const Input = (props: ComponentProps<"input">) => {
  return (
    <div>
      <label className="px-1 block text-sm font-medium text-gray-700">{props["aria-label"]}</label>
      <input
        {...props}
        className={`${props.className} px-1 focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 border rounded-md h-6 leading-4`}
      />
    </div>
  );
};

export function Map({ className, children }: ComponentProps<"div">) {
  return (
    <MapContainer center={[39.468, -0.359]} zoom={14} scrollWheelZoom={false} className={className}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {children}
    </MapContainer>
  );
}
