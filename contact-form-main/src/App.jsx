import { useEffect, useState } from "react";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";

const formSchema = z.object({
  firstName: z.string().min(1, "This field is required"),
  lastName: z.string().min(1, "This field is required"),
  email: z
    .string()
    .min(1, "This field is required")
    .email("Please enter a valid email address"),
  query: z.string().refine((val) => ["general", "support"].includes(val), {
    message: "Please select a query type",
  }),
  message: z.string().min(1, "This field is required"),
  beingContacted: z.boolean().refine((val) => val === true, {
    message: "To submit this form, please consent to being contacted",
  }),
});

export default function App() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    query: "",
    message: "",
    beingContacted: false,
  });

  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      formSchema.parse(formData);
      setErrors({});
      setShowPopup((prev) => !prev);
    } catch (error) {
      const newError = {};
      error.errors.forEach((err) => {
        newError[err.path[0]] = err.message;
      });
      setErrors(newError);
    }
  };

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  return (
    <>
      <div className="bg-white p-5 rounded-2xl w-[90vw] my-6 md:my-20 md:p-8 xl:w-[50vw]">
        <h1 className="text-3xl font-bold text-[hsl(187,24%,22%)] mb-6">
          Contact Us
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-6 w-full md:flex-row md:gap-4">
            <div className="flex flex-col gap-2 md:flex-1">
              <label
                htmlFor="firstName"
                className="after:ml-2 after:text-[hsl(169,82%,27%)] after:content-['*'] text-[hsl(187,24%,22%)]"
              >
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                className={`text-[hsl(187,24%,22%)] pl-5 border rounded-lg px-2 py-3 cursor-pointer hover:border-[hsl(169,82%,27%)] focus:border-[hsl(169,82%,27%)] transition duration-200 ${
                  errors.firstName
                    ? "border-red-600"
                    : "border-[hsl(186,15%,59%)]"
                } outline-none`}
                value={formData.firstName}
                onChange={handleChange}
                aria-describedby={
                  errors.firstName ? "firstName-error" : undefined
                }
                aria-invalid={errors.firstName ? "true" : "false"}
              />
              {errors.firstName && (
                <p
                  id="firstName-error"
                  role="alert"
                  className="text-red-500 text-md"
                >
                  {errors.firstName}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2 md:flex-1">
              <label
                htmlFor="lastName"
                className="after:ml-2 after:text-[hsl(169,82%,27%)] after:content-['*'] text-[hsl(187,24%,22%)]"
              >
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                className={`text-[hsl(187,24%,22%)] pl-5 border rounded-lg px-2 py-3 cursor-pointer ${
                  errors.lastName
                    ? "border-red-600"
                    : "border-[hsl(186,15%,59%)]"
                } hover:border-[hsl(169,82%,27%)] focus:border-[hsl(169,82%,27%)] transition duration-200 outline-none`}
                value={formData.lastName}
                onChange={handleChange}
                aria-describedby={
                  errors.lastName ? "lastName-error" : undefined
                }
                aria-invalid={errors.lastName ? "true" : "false"}
              />
              {errors.lastName && (
                <p
                  id="lastName-error"
                  role="alert"
                  className="text-red-500 text-md"
                >
                  {errors.lastName}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label
              htmlFor="email"
              className="after:ml-2 after:text-[hsl(169,82%,27%)] after:content-['*'] text-[hsl(187,24%,22%)]"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className={`text-[hsl(187,24%,22%)] pl-5 border rounded-lg px-2 py-3 cursor-pointer ${
                errors.lastName ? "border-red-600" : "border-[hsl(186,15%,59%)]"
              } hover:border-[hsl(169,82%,27%)] focus:border-[hsl(169,82%,27%)] transition duration-200 outline-none`}
              value={formData.email}
              onChange={handleChange}
              aria-describedby={errors.email ? "email-error" : undefined}
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && (
              <p id="email-error" role="alert" className="text-red-500 text-md">
                {errors.email}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-3 w-full">
            <label
              id="queryLabel"
              className="after:ml-2 after:text-[hsl(169,82%,27%)] after:content-['*'] text-[hsl(187,24%,22%)]"
            >
              Query Type
            </label>
            <div
              role="radiogroup"
              aria-labelledby="queryLabel"
              className="space-y-4 md:flex md:gap-4 md:space-y-0"
            >
              <label
                role="radio"
                aria-checked={formData.query === "general" ? "true" : "false"}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setFormData({ ...formData, query: "general" });
                  }
                }}
                className="md:flex-1 custom-radio-label flex items-center space-x-3 border border-[hsl(186,15%,59%)] rounded-lg px-4 py-3 cursor-pointer transition duration-300 bg-white"
              >
                <input
                  type="radio"
                  name="query"
                  value="general"
                  className="hidden"
                  checked={formData.query === "general"}
                  id="query-general"
                  onChange={handleChange}
                />
                <div className="w-5 h-5 border-2 border-gray-300 rounded-full flex items-center justify-center transition relative before:content-[''] before:w-3 before:h-3 before:bg-[hsl(169,82%,27%)] before:rounded-full before:absolute before:opacity-0"></div>
                <span className="text-gray-700">General Enquiry</span>
              </label>

              <label
                role="radio"
                aria-checked={formData.query === "support" ? "true" : "false"}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setFormData({ ...formData, query: "support" });
                  }
                }}
                className="md:flex-1 custom-radio-label flex items-center space-x-3 border border-[hsl(186,15%,59%)] rounded-lg px-4 py-3 cursor-pointer transition duration-300 bg-white"
              >
                <input
                  type="radio"
                  name="query"
                  value="support"
                  id="query-support"
                  checked={formData.query === "support"}
                  className="hidden"
                  onChange={handleChange}
                />
                <div className="w-5 h-5 border-2 border-gray-300 rounded-full flex items-center justify-center transition relative before:content-[''] before:w-3 before:h-3 before:bg-[hsl(169,82%,27%)] before:rounded-full before:absolute before:opacity-0"></div>
                <span className="text-gray-700">Support Request</span>
              </label>
            </div>
            {errors.query && (
              <p role="alert" className="text-red-500 text-md">
                {errors.query}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label
              htmlFor="message"
              className="after:ml-2 after:text-[hsl(169,82%,27%)] after:content-['*'] text-[hsl(187,24%,22%)]"
            >
              Message
            </label>
            <textarea
              name="message"
              id="message"
              value={formData.message}
              onChange={handleChange}
              aria-describedby={errors.message ? "message-error" : undefined}
              aria-invalid={errors.message ? "true" : "false"}
              className={`text-[hsl(187,24%,22%)] pl-5 border rounded-lg cursor-pointer px-2 py-3 h-60 resize-none ${
                errors.message ? "border-red-600" : "border-[hsl(186,15%,59%)]"
              } hover:border-[hsl(169,82%,27%)] focus:border-[hsl(169,82%,27%)] transition duration-200 outline-none lg:h-30`}
            ></textarea>
            {errors.message && (
              <p
                id="message-error"
                role="alert"
                className="text-red-500 text-md"
              >
                {errors.message}
              </p>
            )}
          </div>

          <div className="mb-2">
            <div className="flex space-x-3 items-center mb-2">
              <input
                tabIndex={0}
                type="checkbox"
                name="beingContacted"
                id="beingContacted"
                role="checkbox"
                aria-checked={formData.beingContacted}
                aria-labelledby="beingContactedLabel"
                aria-describedby={
                  errors.beingContacted ? "beingContactedError" : undefined
                }
                checked={formData.beingContacted}
                onChange={handleChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    setFormData((prev) => ({
                      ...prev,
                      beingContacted: !prev.beingContacted,
                    }));
                  }
                }}
                className="appearance-none w-5 h-5 border-2 border-gray-300 cursor-pointer focus:ring checked:border-transparent focus:outline-none checked:bg-[url('/images/icon-checkbox-check.svg')] bg-no-repeat bg-center"
              />
              <label
                id="beingContactedLabel"
                htmlFor="beingContacted"
                className="after:ml-2 after:text-[hsl(169,82%,27%)] after:content-['*'] text-[hsl(187,24%,22%)] cursor-pointer"
              >
                I consent to being contacted by the team
              </label>
            </div>
            {errors.beingContacted && (
              <p id="beingContactedError" className="text-red-500 text-md">
                {errors.beingContacted}
              </p>
            )}
          </div>

          <button
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleSubmit(e);
              }
            }}
            type="submit"
            className="w-full bg-[hsl(169,82%,27%)] font-semibold text-white py-4 rounded-lg cursor-pointer text-[1.1rem] transition duration-200 hover:bg-[hsl(187,24%,22%)]"
          >
            Submit
          </button>
        </form>
      </div>

      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: "0%" }}
            exit={{ opacity: 0, y: "-100%" }}
            role="alert"
            className="w-[80%] md:w-auto text-white p-5 bg-[hsl(187,24%,22%)] rounded-xl fixed top-8 left-1/2 -translate-x-1/2"
          >
            <div className="flex gap-3 mb-3 ml-1 items-center">
              <img src="/images/icon-success-check.svg" alt="success" />
              <h1 className="text-xl font-bold">Message Sent!</h1>
            </div>
            <p>Thanks for completing the form. We&apos;ll be in touch soon!</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
