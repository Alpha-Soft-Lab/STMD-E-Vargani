import { useParams } from "react-router-dom";
import CreateEntryForm from "../components/Entries/CreateEntryForm.jsx";

const CreateEntryPage = () => {
  const { tabId } = useParams();

  return (
    <div className="min-h-screen flex justify-center">
      <div className="w-full max-w-xl flex flex-col p-0 mt-4">
        <CreateEntryForm tabId={tabId} />
      </div>
    </div>
  );
};

export default CreateEntryPage;
