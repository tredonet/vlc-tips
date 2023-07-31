import { useTips, useAuth } from "hooks";
import { useState } from "react";
import { Tip } from "types";

type EditTipProps = {
  tip: Tip | null;
  isOpen: boolean;
  setIsOpen: (showEditTips: boolean) => void;
};
export const EditTip: React.FC<EditTipProps> = ({ tip: _tip, isOpen, setIsOpen }) => {
  if (!_tip || !isOpen) return null;
  const [tip, setTip] = useState(_tip);
  const { loadTips } = useTips();
  const { token, username } = useAuth();
  const updateTip = (field: any) => {
    if (field.tags && !Array.isArray(field.tags)) field.tags = field.tags.split(",").map((tag: string) => tag.trim());
    if (field.geometry) field.geometry = { lat: field.geometry.split(",")[0], lng: field.geometry.split(",")[1] };
    setTip({ ...tip, ...field });
  };
  const kindOptions = ["Landmark", "Restaurant", "Sightseeing", "Nightlife", "Snacks", "Coffee", "Market"];
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //@ts-ignore it has an id
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
    //@ts-ignore it has an id
    if (!tip._id) return;
    confirm("Are you sure you want to delete this tip?");
    //@ts-ignore it has an id
    await fetch(`/api/tip/${tip._id}/delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    });
    setIsOpen(false);
    loadTips(username);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-6 rounded shadow-xl opacity-100 z-10">
        <h4 className="text-lg font-medium text-gray-800">{tip.name}</h4>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-8 gap-6 my-8">
            <div className="col-span-8 sm:col-span-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={tip.name}
                onChange={(e) => updateTip({ name: e.target.value })}
                autoComplete="off"
                className="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="col-span-8 sm:col-span-4">
              <label htmlFor="kind" className="block text-sm font-medium text-gray-700">
                Kind
              </label>
              <select
                name="kind"
                id="kind"
                value={tip.kind}
                onChange={(e) => updateTip({ kind: e.target.value })}
                className="mt-1 py-2 px-1 focus:ring-teal-500 focus:teal-teal-500 block w-full sm:text-sm border-gray-300 rounded-md">
                {kindOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-8 sm:col-span-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                required
                rows={Math.floor(tip.description.length / 22)}
                id="description"
                value={tip.description}
                onChange={(e) => updateTip({ description: e.target.value })}
                autoComplete="off"
                className="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="col-span-8 sm:col-span-4">
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                Tags
              </label>
              <input
                type="text"
                name="tags"
                id="tags"
                value={tip.tags?.join(", ")}
                onChange={(e) => updateTip({ tags: e.target.value })}
                autoComplete="off"
                className="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="col-span-8 sm:col-span-4">
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                Type
              </label>
              <div className="flex gap-1">
                <input
                  type="text"
                  name="type_key"
                  id="type_key"
                  value={Object.keys(tip.type || {})[0]}
                  onChange={(e) => updateTip({ type: { [e.target.value]: Object.values(tip.type || {})[0] } })}
                  autoComplete="off"
                  className="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  name="type_val"
                  id="type_val"
                  value={Object.values(tip.type || {})[0]}
                  onChange={(e) => updateTip({ type: { [Object.keys(tip.type || {})[0]]: [e.target.value] } })}
                  autoComplete="off"
                  className="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="col-span-8 sm:col-span-4">
              <label htmlFor="mapsUrl" className="block text-sm font-medium text-gray-700">
                Maps URL
              </label>
              <input
                type="text"
                required
                name="mapsUrl"
                id="mapsUrl"
                value={tip.mapsUrl}
                onChange={(e) => updateTip({ mapsUrl: e.target.value })}
                autoComplete="off"
                className="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-80 sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="col-span-8 sm:col-span-4">
              <label htmlFor="mapsUrl" className="block text-sm font-medium text-gray-700">
                Lat/Lng
              </label>
              <input
                type="text"
                required
                name="mapsUrl"
                id="mapsUrl"
                value={`${tip.geometry.lat}, ${tip.geometry.lng}`}
                onChange={(e) => updateTip({ geometry: e.target.value })}
                autoComplete="off"
                className="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="flex">
            <button
              type="submit"
              className="bg-teal-600 hover:bg-teal-500 ext-sm font-medium  text-white mt-2 p-2.5 flex-1 rounded-md outline-none border ring-offset-2 ring-teal-600 focus:ring-2">
              Update Tip
            </button>
            <button
              onClick={() => deleteTip()}
              className="bg-red-600 hover:bg-red-500 ext-sm font-medium  text-white mt-2 p-2.5 flex-1 rounded-md outline-none border ring-offset-2 ring-red-600 focus:ring-2">
              Delete Tip
            </button>
            <button
              className="mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-teal-600 focus:ring-2"
              onClick={() => setIsOpen(false)}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
