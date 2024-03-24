import { MdAutoAwesome } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { navlinks } from "../navlinks";
export default function BotButton() {
  const navigate = useNavigate();
  return (
    <button
      className="fixed bottom-10 right-10 z-[100] bg-blue-400 rounded-lg p-1 lg:p-2"
      onClick={() => {
        navigate(navlinks.prompt.path);
      }}
    >
      <MdAutoAwesome
        style={{
          fontSize: "40px",
        }}
      />
    </button>
  );
}
