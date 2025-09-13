import React, { useRef } from "react";
import TabList from "./Tab/TabList";
import CreateTabButton from "./CreateTabButton";

const TabsPage = () => {
  const tabListRef = useRef();

  const handleTabCreated = () => {
    tabListRef.current?.refreshTabs(); 
  };

  return (
    <>
      <TabList ref={tabListRef} />
      <CreateTabButton onTabCreated={handleTabCreated} />
    </>
  );
};

export default TabsPage;
