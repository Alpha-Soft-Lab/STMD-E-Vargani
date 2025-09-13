import { useNavigate, useParams } from "react-router-dom";

const CreateEntryButton = () => {
  const navigate = useNavigate();
  const { tabId } = useParams(); 

  const handleClick = () => {
    navigate(`/tab/${tabId}/create-entry`);
  };

  return (
    <button
      onClick={handleClick}
      className="flex-1 sm:flex-none bg-blue-600 text-white px-5 py-2 rounded-full shadow hover:bg-blue-700 transition"
    >
      Create Entry
    </button>
  );
};

export default CreateEntryButton;
