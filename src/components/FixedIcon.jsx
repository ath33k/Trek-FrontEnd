import { MdAutoAwesome } from "react-icons/md";
export default function FixedIcon() {
  return (
    <span className="fixed bottom-10 right-10 z-[100] bg-blue-400 rounded-lg p-1 lg:p-2">
      <MdAutoAwesome
        style={{
          fontSize: "40px",
        }}
      />
    </span>
  );
}
