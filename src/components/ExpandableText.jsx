import { useEffect, useState } from "react";
import { motion } from "framer-motion";
export default function ExpandableText({
  children,
  className = "",
  xs = 200,
  sm = 300,
  md = 400,
  lg = 500,
  xl = 600,
}) {
  const [expanded, setExpanded] = useState(false);
  const [tarLength, setTerLength] = useState(xs);

  const handleBreakpoint = (width) => {
    if (width >= 1280) return xl;
    else if (width >= 1024) return lg;
    else if (width >= 768) return md;
    else if (width >= 640) return sm;
    else return xs;
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      setTerLength(handleBreakpoint(window.innerWidth));
    });
  }, []);

  const text = expanded ? children : children.slice(0, tarLength);
  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={className}
    >
      {text}
      {children.length > tarLength && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-blue-600"
        >
          &nbsp;
          {expanded ? "See less" : "See more..."}
        </button>
      )}
    </motion.p>
  );
}
