import { Button } from "components";
import { useState } from "react";
import { Modal } from "./Modal";

export const Tour: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Button className="justify-center gap-4 bg-teal-600" onClick={() => setShowModal(true)}>
        <a>Go on a self-guided tour!</a>
      </Button>
      <Modal title="Go on a self-guided tour!" showModal={showModal} onClose={() => setShowModal(false)} big={true}>
        <iframe
          className="flex-1 w-full"
          src="https://www.google.com/maps/d/embed?mid=1JSBPCzmm_jI9k9kMmFvH_4XShDzZj6c&ehbc=2E312F"
        />
      </Modal>
    </>
  );
};
