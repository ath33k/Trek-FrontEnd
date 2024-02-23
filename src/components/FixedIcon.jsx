import React from "react";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

export default function FixedIcon() {
  return (
    <span className="fixed bottom-10 right-10 z-[100] bg-blue-400 rounded-lg p-1 lg:p-2">
      <AutoAwesomeIcon
        style={{
          fontSize: "40px",
        }}
      />
    </span>
  );
}
