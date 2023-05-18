import { Button, Modal } from "components";
import { useState } from "react";

export const Tour: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Button className="justify-center gap-4 bg-teal-600" onClick={() => setShowModal(true)}>
        <a>Go on a self-guided tour!</a>
      </Button>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white px-6 py-3 fixed inset-4 sm:inset-12 flex flex-col rounded shadow-xl opacity-100 z-10 ">
            <h4 className="text-lg mb-3 font-medium text-gray-800">Go on a self-guided Tour!</h4>
            <iframe className="flex-1 w-full"
              src="https://www.google.com/maps/d/embed?mid=1JSBPCzmm_jI9k9kMmFvH_4XShDzZj6c&ehbc=2E312F"
            />
            <div className="items-center gap-2 mt-3 sm:flex">
              <button
                className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                onClick={() => setShowModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
