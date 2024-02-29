import React from "react";
import Head from "../Components/Head";
import { FiMail, FiPhoneCall, FiMapPin } from "react-icons/fi";
function ContactUs() {
  const contactData = [
    {
      id: 1,
      title: "Email Us",
      info: "Interactively grow backend ideas for cross-platform models.",
      icon: FiMail,
      contact: "info@zpunet.com",
    },
    {
      id: 2,
      title: "Call Us",
      info: "Distinctively exploit optimal alignments for intuitive bandwidth.",
      icon: FiPhoneCall,
      contact: "+255 789 456 123",
    },
    {
      id: 3,
      title: "Location",
      info: "Distinctively exploit optimal alignments for intuitive bandwidth.",
      icon: FiMapPin,
      contact: "",
    },
  ];
  return (
    <div className="px-2 py-6 mx-auto min-height-screen container">
      <Head title="Contact Us" />
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6 mt-10 xl:gap-8">
        {contactData.map((item, index) => (
          <div
            key={index}
            className="bg-dry border flex-colo text-center border-border rounded-lg p-10"
          >
            <span className="w-20 h-20 flex-colo mb-4 rounded-full bg-main text-subMain text-2xl">
              <item.icon />
            </span>
            <h3 className="text-3xl font-sans mb-4 font-semibold text-white">
              {item.title}
            </h3>
            <p className="text-text text-md leading-7">
              <a href={`mailto:${item.contact}`} className="text-indigo-700">
                {item.contact}
              </a>{" "}
              {item.info}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default ContactUs;
