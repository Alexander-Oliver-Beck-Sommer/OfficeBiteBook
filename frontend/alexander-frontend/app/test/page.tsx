"use client";
import React, { useState } from "react";
import Accordion from "@/components/Accordion";
import ContentModal from "@/components/ContentModal";

const page = () => {
  // const [modalVisibility, setModalVisibility] = useState(false);
  // const handleModal = () => {
  //   setModalVisibility(!modalVisibility);
  // };
  return (
    <>
      <h4>Hello, World!</h4>
      {/* <button onClick={handleModal}>Open accordion</button>
      <ContentModal
        visibility={modalVisibility}
        toggle={handleModal}
        title="Hello, World!"
        size="max-w-screen-xl"
      >
        <p>Hej!</p>
      </ContentModal> */}
    </>
  );
};

export default page;
