import { useState } from "react";
import { motion } from "framer-motion";
export default function ExpandableText({
  children,
  className = "",
  maxLength = 200,
}) {
  const [expanded, setExpanded] = useState(false);
  const shouldExpand = children.length > maxLength;
  const text = expanded ? children : children.slice(0, maxLength);
  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={className}
    >
      {text}
      {shouldExpand && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-blue-500"
        >
          &nbsp;
          {expanded ? "See less" : "See more..."}
        </button>
      )}
    </motion.p>
  );
}
