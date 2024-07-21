import { useState, useRef, useContext } from "react";
import emailjs from "@emailjs/browser";

import { MdEmail } from "react-icons/md";
import { FaFacebook, FaLinkedinIn, FaTwitter } from "react-icons/fa";

import { contactUsData } from "../../../data";
import toast, { Toaster } from "react-hot-toast";

import { AppContext } from "../../../AppContext";

function ContactUs() {
  const { language } = useContext(AppContext);
  const form = useRef();
  const data = contactUsData[language];
  const isArabic = language === "ar";

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    // Check if any field is empty
    if (!name || !email || !subject || !message) {
      toast.error("Please fill in all the fields.");
      return;
    }

    setIsSending(true);

    emailjs
      .sendForm("service_ddw9jud", "template_palagu5", form.current, {
        publicKey: "hhmcLXrE3BexHveR_",
      })
      .then(
        () => {
          toast.success("Email sent successfully!");
          setEmail("");
          setName("");
          setSubject("");
          setMessage("");
          setIsSending(false);
        },
        (err) => {
          toast.error("FAILED...", err.text);
          setIsSending(false);
        }
      );
  };

  return (
    <section
      id="contact"
      className="px-[10px] md:px-[50px] py-[100px] bg-[#F3FFFE]"
    >
      <div className="my-6">
        <div
          className={`flex flex-col ${
            isArabic ? "sm:flex-row-reverse" : "sm:flex-row"
          } items-center gap-16 p-8 mx-auto max-w-4xl bg-[#fff] shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md text-[#333]`}
        >
          <div className={`${isArabic ? "text-right" : "text-left"}`}>
            <h1 className="text-3xl font-extrabold">{data.mainTitle}</h1>
            <p className="text-sm text-gray-400 mt-3">{data.description}</p>
            <div className="mt-12">
              <h2 className="text-lg font-extrabold">{data.email}</h2>
              <ul className="mt-3">
                <li
                  className={`flex ${
                    isArabic ? "gap-[10px] flex-row-reverse" : ""
                  } items-center justify-start`}
                >
                  <div className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                    <MdEmail className="text-second-black text-xl" />
                  </div>
                  <a
                    target="_blank"
                    href="mailto:alnasrteam2024@gmail.com"
                    className="text-second-black text-sm ml-3"
                  >
                    <small className="block">{data.mail}</small>
                    <strong>alnasrteam2024@gmail.com</strong>
                  </a>
                </li>
              </ul>
            </div>
            <div className="mt-12">
              <h2 className="text-lg font-extrabold">{data.socials}</h2>
              <ul
                className={`flex ${
                  isArabic ? "justify-end" : "justify-start"
                } mt-3 space-x-4`}
              >
                <li className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                  <a href="javascript:void(0)">
                    <FaFacebook className="text-xl text-second-black" />
                  </a>
                </li>
                <li className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                  <a href="javascript:void(0)">
                    <FaTwitter className="text-xl text-second-black" />
                  </a>
                </li>
                <li className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                  <a href="javascript:void(0)">
                    <FaLinkedinIn className="text-xl text-second-black" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <form ref={form} onSubmit={sendEmail} className="ml-auo space-y-4">
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={`${isArabic ? "الِاسم" : "Your name"}`}
              className={`w-full rounded-md py-2.5 px-4 border text-sm ${
                isArabic ? "text-right" : "text-left"
              } outline-second-black`}
            />
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={`${isArabic ? "الاِيمايل" : "Your email"}`}
              className={`w-full rounded-md py-2.5 px-4 border text-sm ${
                isArabic ? "text-right" : "text-left"
              } outline-second-black`}
            />
            <input
              type="text"
              id="subject"
              name="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder={`${isArabic ? "الموضوع" : "Your subject"}`}
              className={`w-full rounded-md py-2.5 px-4 border text-sm ${
                isArabic ? "text-right" : "text-left"
              } outline-second-black`}
            />
            <textarea
              id="message"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`${isArabic ? "رسالتك" : "Your message"}`}
              rows="6"
              className={`w-full rounded-md px-4 border text-sm ${
                isArabic ? "text-right" : "text-left"
              } pt-2.5 outline-second-black`}
            ></textarea>
            <button
              type="submit"
              className="text-second-black hover:text-[#000] bg-second-yellow hover:bg-main-yellow font-semibold rounded-md text-sm px-4 py-2.5 w-full duration-200 ease-in-out"
            >
              {isSending ? "Sending..." : data.send}
            </button>
          </form>
        </div>
      </div>
      <Toaster />
    </section>
  );
}

export default ContactUs;
