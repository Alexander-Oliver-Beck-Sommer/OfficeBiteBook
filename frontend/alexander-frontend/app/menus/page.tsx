import React from "react";
import MenuList from "@/components/MenuList";
import MenuFormCreator from "@/components/MenuFormUpsert";

const SomePage = () => {
  return (
    <div>
      <h1>Menu</h1>
      <MenuList />
      <MenuFormCreator />
    </div>
  );
};

export default SomePage;