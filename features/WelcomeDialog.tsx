import { Modal } from "components";
import { useState } from "react";

export const WelcomeDialog = () => {
  const [showModal, setShowModal] = useState(true);
  return (
    <Modal title="Hi There!" showModal={showModal} onClose={() => setShowModal(false)}>
      Welcome to vlc tips! This is a hobby project to help you discover the best places in Valencia. All tips are based on personal experience and are updated regularly. Enjoy!
    </Modal>
  );
};
