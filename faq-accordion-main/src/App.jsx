import { useState } from "react";
import Accordion from "./Components/Accordion";
import { data } from "./data";

export default function App() {
  const [openIndex, setOpenIndex] = useState(0);

  const handleAccordionClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const ShowAccordion = data.map((item, index) => (
    <Accordion
      key={index}
      index={index}
      question={item.question}
      answer={item.answer}
      openIndex={openIndex}
      onClick={() => handleAccordionClick(index)}
    />
  ));
  return (
    <>
      <img
        src="/images/background-pattern-mobile.svg"
        alt="#"
        className="object-cover w-full sm:hidden"
      />
      <img
        src="/images/background-pattern-desktop.svg"
        alt="#"
        className="hidden sm:block w-full object-cover"
      />
      <div className="faqs bg-white rounded-xl shadow-[0_0_20px_hsl(292,42%,14%,20%)] px-5 py-8 w-[90%] sm:w-[80%] md:w-[75%] lg:w-[40%]">
        <header className="title flex gap-5 items-center mb-6">
          <img src="/images/icon-star.svg" alt="star" className="w-6" />
          <h1 className="text-3xl font-[700] sm:text-4xl md:text-5xl">FAQs</h1>
        </header>

        {ShowAccordion}
      </div>
    </>
  );
}
