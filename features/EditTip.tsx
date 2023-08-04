import { useLoadScript } from "@react-google-maps/api";
import usePlacesAutocomplete, { getGeocode, getLatLng, getDetails } from "use-places-autocomplete";
import "@reach/combobox/styles.css";
import { useTips, useAuth } from "hooks";
import React, { useState } from "react";
import { PrimaryButton, Modal, TextArea, DropDown, Input, SecondaryButton } from "components";
import { Map } from "./Map";
import { Tip, TipKind } from "types";
import { PlaceSearchBar } from "./PlaceSearchBar";

type EditTipProps = {
  tip: Tip | null;
  isOpen: boolean;
  setIsOpen: (showEditTips: boolean) => void;
};
export const EditTip: React.FC<EditTipProps> = ({ tip: _tip, isOpen, setIsOpen }) => {
  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) return <>No API key</>;
  if (!_tip || !isOpen) return null;
  const [tip, setTip] = useState(_tip);
  const { loadTips } = useTips();
  const { token, username } = useAuth();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });
  const updateTip = (field: any) => {
    if (field.tags && !Array.isArray(field.tags)) field.tags = field.tags.split(",").map((tag: string) => tag.trim());
    if (field.geometry) field.geometry = { lat: field.geometry.split(",")[0], lng: field.geometry.split(",")[1] };
    setTip({ ...tip, ...field });
  };
  const kindOptions: TipKind[] = ["Landmark", "Restaurant", "Sightseeing", "Nightlife", "Snacks", "Coffee", "Market"];
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = tip._id ? `/api/tip/${tip._id}` : `/api/tip`;
    tip.listId ||= username;
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(tip),
    });
    setIsOpen(false);
    loadTips(username);
  };

  const deleteTip = async () => {
    if (!tip._id) return;
    confirm("Are you sure you want to delete this tip?");
    await fetch(`/api/tip/${tip._id}/delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    });
    setIsOpen(false);
    loadTips(username);
  };

  const { setValue, clearSuggestions } = usePlacesAutocomplete();
  const handleSelect = async (address: any) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const details = await getDetails({ placeId: results[0].place_id });
    const { lat, lng } = await getLatLng(results[0]);
    updateTip({
      // @ts-ignore
      name: details.name,
      // @ts-ignore
      mapsUrl: details.url,
      geometry: `${lat},${lng}`,
    });
  };
  const Row = ({ children }: any) => <div className="col-span-8 sm:col-span-4">{children}</div>;
  return (
    <Modal isOpen={isOpen} big={true}>
      <div className="flex gap-4 w-full h-screen flex-col-reverse sm:flex-row">
        <div>
          <h4 className="text-lg font-medium text-gray-800">{tip.name}</h4>
          <form>
            <div className="grid grid-cols-8 gap-6 my-8">
              <Row>
                <Input field="Name" value={tip.name} onChange={(e) => updateTip({ name: e.target.value })} />
              </Row>
              <Row>
                <DropDown
                  field="Kind"
                  value={tip.kind}
                  onChange={(e) => updateTip({ kind: e.target.value })}
                  options={kindOptions}
                />
              </Row>
              <Row>
                <TextArea
                  field="Description"
                  value={tip.description}
                  rows={Math.floor(tip.description.length / 22)}
                  onChange={(e) => updateTip({ description: e.target.value })}
                />
              </Row>
              <Row>
                <Input
                  field="Tags"
                  value={tip.tags?.join(", ")}
                  onChange={(e) => updateTip({ tags: e.target.value })}
                />
              </Row>
              <Row>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                  Type
                </label>
                <div className="flex gap-1">
                  <Input
                    field="Type"
                    value={Object.keys(tip.type || {})[0]}
                    onChange={(e) => updateTip({ type: { [e.target.value]: Object.values(tip.type || {})[0] } })}
                    label={false}
                  />
                  <Input
                    field="Type val"
                    value={Object.values(tip.type || {})[0]}
                    onChange={(e) => updateTip({ type: { [Object.keys(tip.type || {})[0]]: [e.target.value] } })}
                    label={false}
                  />
                </div>
              </Row>
              <Row>
                <Input field="Maps URL" value={tip.mapsUrl} onChange={(e) => updateTip({ mapsUrl: e.target.value })} />
              </Row>
              <Row>
                <Input
                  field="Lat/Lng"
                  value={`${tip.geometry.lat}, ${tip.geometry.lng}`}
                  onChange={(e) => updateTip({ geometry: e.target.value })}
                />
              </Row>
            </div>
            <div className="flex">
              <PrimaryButton color="teal" onClick={(e) => handleSubmit(e)}>
                {tip._id ? "Update Tip" : "Add Tip"}
              </PrimaryButton>
              {tip._id && (
                <PrimaryButton color="red" onClick={deleteTip}>
                  Delete Tip
                </PrimaryButton>
              )}
              <SecondaryButton onClick={() => setIsOpen(false)}>Close</SecondaryButton>
              <button
                className="mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-teal-600 focus:ring-2"
                onClick={() => setIsOpen(false)}>
                Close
              </button>
            </div>
          </form>
        </div>
        {isLoaded && (
          <Map className="sm:w-full sm:h-92 h-full">
            <div className="absolute top-4 left-1/4 w-1/2">
              <PlaceSearchBar handleSelect={handleSelect} />
            </div>
          </Map>
        )}
      </div>
    </Modal>
  );
};
