"use client";
import Image from "next/image";
import parrot from "@/public/parrot.png";
import worldImage from "@/public/worldmap.png";
import { useState } from "react";
import { transaltor } from "../src/utils";
import dotenv from "dotenv";
import { BeatLoader, CircleLoader } from "react-spinners";
dotenv.config();

export default function Home() {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("");
  const [translatedMessage, setTranslatedMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event: any) => {
    setText(event.target.value);
  };
  const handleLanguage = (event: any) => {
    setLanguage(event.target.value);
  };

  const handleSubmit = async (event: any) => {
    event?.preventDefault()
    setLoading(true);
    const message = `Please translate """${text}""" to language """${language}""". I need translation only.`;
    const response = await transaltor(message);
    if (!response) {
      throw Error("Response was not Ok");
    }
    if (response.choices[0].message.content) {
      setLoading(false);
      setTranslatedMessage(response.choices[0].message.content);
      setText("")
      setLanguage("")
    }
    if (translatedMessage) {
      console.log(message);
      console.log("Translated Message: ", translatedMessage);
    }
  };

  return (
    <section className="h-screen flex md:items-center justify-center">
      <div className="md:max-w-[500px] mx-auto w-full font-[family-name:var(--font-geist-sans)]">
        <div className="relative flex items-center gap-4 border py-16 justify-center md:rounded-lg bg-[#0D182E] overflow-hidden">
          <Image
            src={worldImage}
            className="absolute right-0 top-0"
            width={350}
            alt="Parrot"
          />
          <Image src={parrot} width={120} alt="Parrot" />
          <div className="relative z-1">
            <h1 className="font-semibold text-[3rem] text-[#109910]">
              PollyGlot
            </h1>
            <p className="text-white font-light tracking-wide pl-1">
              Perfect Translation Every Time
            </p>
          </div>
        </div>
        <div className="">
          <div className="border-2 rounded-lg p-6 text-center mx-2 my-4">
            <form>
              <h2 className="font-bold text-[#035A9D] text-xl">
                Text to translate 👇
              </h2>
              <textarea
                name="textToTranslate"
                id="textToTranslate"
                onChange={handleChange}
                placeholder="How are you?"
                className="bg-gray-100 w-full resize-none h-40 rounded-lg p-2 my-4"
                required
              ></textarea>
              {translatedMessage ? (
                <div>
                  <h2 className="font-bold text-[#035A9D] text-xl ">
                    Your Translation 👇
                  </h2>
                  <div className="my-4 gap-2 flex-col justify-center text-left">
                    <div className="bg-gray-100 w-full resize-none h-40 rounded-lg p-2 my-4">
                      {translatedMessage}
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="font-bold text-[#035A9D] text-xl ">
                    Select language 👇
                  </h2>
                  <div className="my-4 ml-8 gap-2 flex-col justify-center text-xl">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="option"
                        value="French"
                        checked={language === "French"}
                        onChange={handleLanguage}
                      />
                      French
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="option"
                        value="Spanish"
                        checked={language === "Spanish"}
                        onChange={handleLanguage}
                      />
                      Spanish
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="option"
                        value="Japanese"
                        checked={language === "Japanese"}
                        onChange={handleLanguage}
                      />
                      Japanese
                    </label>
                  </div>
                </div>

              )}
              {translatedMessage ? (
                <button
                onClick={() => setTranslatedMessage("")}
                  disabled={loading}
                  className="w-full bg-[#035A9D] hover:bg-[#035a9de3] text-white font-semibold tracking-wide py-3 rounded-lg cursor-pointer"
                  >
                  Start Over
                </button>
              ) : (
                <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-[#035A9D] hover:bg-[#035a9de3] text-white font-semibold tracking-wide py-3 rounded-lg cursor-pointer"
                >
                  {loading ? (
                    <BeatLoader size={10} color="white" />
                  ) : "Translate"}                  
                </button>
              )}
              </form>
          </div>
        </div>
      </div>
    </section>
  );
}
