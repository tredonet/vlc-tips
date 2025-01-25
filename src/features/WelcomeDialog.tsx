"use client";
import { Button } from "@/components";
import { Modal } from "@/features";
import { useState } from "react";

export default function WelcomeDialog() {
  const [showModal, setShowModal] = useState(true);
  return (
    <Modal title="Hi There!" showModal={showModal} onClose={() => setShowModal(false)}>
      <p className="max-w-lg mt-2 leading-relaxed text-black">
        Welcome to vlc tips! This is a hobby project to help you discover the best places in Valencia. All tips are based on personal experience and are updated
        regularly. Enjoy!
      </p>
      <Button className="justify-center gap-4 bg-teal-600 w-full mt-4" onClick={() => setShowModal(false)}>
        Got it!
      </Button>
    </Modal>
  );
}
