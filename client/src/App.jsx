import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import config from "./config/appConfig.json";
import MainLayout from "./layout/Mainlayout";
import TabList from "./components/Tab/TabList";
import TabDetailsPage from "./pages/TabDetailsPage";
import ProfilePage from "./pages/ProfilePage";
import CreateEntryPage from "./pages/CreateEntryPage";
import TabAllEntriesPage from "./pages/TabEntriesPage"; 

const App = () => {
  useEffect(() => {
    document.title = `${config.appName} ${config.subtitle}`;
  }, []);

  return (
    
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<TabList />} />
        <Route path="tab/:tabId" element={<TabDetailsPage />} />
         <Route path="tab/:tabId/create-entry" element={<CreateEntryPage />} /> 
         <Route path="tab/:tabId/all-entries" element={<TabAllEntriesPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
};

export default App;
