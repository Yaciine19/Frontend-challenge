import { motion } from "motion/react";
import { useRef } from "react";

export default function Accordion({
  question,
  answer,
  openIndex,
  onClick,
  index,
}) {
  const isOpen = openIndex === index;
  const questionDivRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      onClick();
    } else if (e.key === "ArrowDown") {
      const nextElement =
        questionDivRef.current?.parentElement?.nextElementSibling?.querySelector(
          "div"
        );
      nextElement?.focus();
    } else if (e.key === "ArrowUp") {
      const prevElement =
        questionDivRef.current?.parentElement?.previousElementSibling?.querySelector(
          "div"
        );
      prevElement?.focus();
    }
  };

  return (
    <div className="border-b-1 border-[hsl(275,100%,97%)] pb-5 last:border-none">
      <div
        ref={questionDivRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="flex items-center justify-between mt-4 p-1"
      >
        <h1
          className="question text-lg/6 font-[600] text-[hsl(292,42%,14%)] w-5/6 hover:text-[hsl(280.92,82.98%,53.92%)] cursor-pointer"
          onClick={onClick}
        >
          {question}
        </h1>
        {isOpen ? (
          <img
            src="/images/icon-minus.svg"
            alt="plus"
            className="cursor-pointer"
            onClick={onClick}
          />
        ) : (
          <img
            src="/images/icon-plus.svg"
            alt="plus"
            className="cursor-pointer"
            onClick={onClick}
          />
        )}
      </div>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <p className="mt-6 text-[hsl(292,16%,49%)]">{answer}</p>
      </motion.div>
    </div>
  );
}
