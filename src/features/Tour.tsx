"use client";
import { Button } from "@/components";
import { useState } from "react";
import { Modal } from "./Modal";

export default function Tour() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Button
        className="justify-center gap-4 bg-teal-600"
        onClick={() => setShowModal(true)}
      >
        <a>Go on a self-guided tour!</a>
      </Button>
      <Modal
        title="Go on a self-guided tour!"
        showModal={showModal}
        onClose={() => setShowModal(false)}
        big={true}
      >
        <iframe
          className="flex-1 w-full h-screen"
          src="https://www.google.com/maps/d/embed?mid=1TSwZyi2MdYJe1y8a2jv8NzCdS6AspvY&ehbc=2E312F"
        />
      </Modal>
    </>
  );
}
