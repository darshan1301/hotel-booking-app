import { useNavigate } from "react-router-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";

const BackBtn = ({ to }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(to)}
      className="m-1 rounded-full bg-stone-600 text-sm text-stone-50"
    >
      <IoArrowBackCircleOutline className="text-4xl" />
    </div>
  );
};

export default BackBtn;
