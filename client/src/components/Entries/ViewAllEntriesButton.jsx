import { useNavigate, useParams } from "react-router-dom";

const ViewAllEntriesButton = () => {
    const navigate = useNavigate();
    const { tabId } = useParams();

    const handleClick = () => {
        navigate(`/tab/${tabId}/all-entries`);
    };

    return (
        <button
            onClick={handleClick}
            className="flex-1 sm:flex-none bg-emerald-500 rounded-full px-5 py-2 text-md font-medium text-white shadow hover:bg-emerald-600 transition"
        >
            View Entries
        </button>

    );
};

export default ViewAllEntriesButton;
