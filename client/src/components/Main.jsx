import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Context } from "../context/Context";
import generatePpt from "./Generateppt";

export default function Main() {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  // Local state for image generation
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  // Function to generate image
  const generateImage = async () => {
    setError(null);
    setImage(null);
    try {
      const response = await fetch("http://localhost:5000/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || response.statusText);
      }

      const data = await response.json();
      const base64Image = data.image;

      if (
        base64Image &&
        /^data:image\/(png|jpeg|jpg);base64,/i.test(base64Image)
      ) {
        setImage(base64Image);
      } else {
        throw new Error("Invalid image data format");
      }
    } catch (err) {
      setError(err.message);
      console.error("Error:", err.message);
    }
  };

  return (
    <div>
      <div className="w-full flex flex-col items-center justify-center h-full">
        <div className="fixed top-0 left-[15%] flex mx-5 justify-between w-4/5 items-center h-32 bg-white">
          <p className="ml-9 text-3xl">
            <strong>Generative</strong>
            <strong className="text-sky-400">AI</strong>
          </p>
          <img
            className="rounded-full w-12"
            src={assets.user_icon}
            alt="user icon"
          />
        </div>

        <div className="flex flex-col w-4/5 h-full items-start">
          {!showResult ? (
            <>
              <div className="mt-36 text-3xl ml-5">
                <p>
                  <span>Hello, Kalki.</span>
                </p>
                <p>How can I help you today?</p>
              </div>
              <div className="flex mt-24 w-full">
                <div className="w-80 mx-6 h-60 bg-sky-100 hover:bg-slate-100 p-8 relative">
                  <p>
                    Suggest beautiful places to see on an upcoming road trip
                  </p>
                  <img
                    className="w-9 absolute bottom-4 right-4"
                    src={assets.compass_icon}
                    alt="compass icon"
                  />
                </div>
                <div className="w-80 mx-6 h-60 bg-sky-100 hover:bg-slate-100 p-8 relative">
                  <p>Briefly summarize this concept: urban planning</p>
                  <img
                    className="w-9 absolute bottom-4 right-4"
                    src={assets.bulb_icon}
                    alt="bulb icon"
                  />
                </div>
                <div className="w-60 mx-6 h-60 bg-sky-100 hover:bg-slate-100 p-8 relative">
                  <p>Brainstorm team bonding activities for our work retreat</p>
                  <img
                    className="w-9 absolute bottom-4 right-4"
                    src={assets.message_icon}
                    alt="message icon"
                  />
                </div>
                <div className="w-60 mx-6 h-60 bg-sky-100 hover:bg-slate-100 p-8 relative">
                  <p>Improve the readability of the following code</p>
                  <img
                    className="w-9 absolute bottom-4 right-4"
                    src={assets.code_icon}
                    alt="code icon"
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="py-[5%] max-h-[70vh] result mt-28 fixed left-[20%] top-[-5%] items-center">
              <div className="flex justify-start">
                <img
                  className="w-12 rounded-full"
                  src={assets.user_icon}
                  alt=""
                />
                <p className="ps-10">{recentPrompt}</p>
              </div>
              <div className="flex items-start">
                <img className="w-9" src={assets.gemini_icon} alt="" />
                {loading ? (
                  <div className="w-full flex flex-col gap-[10%] loader">
                    <hr />
                    <hr />
                    <hr />
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col ">
                      <p
                        className="text-lg w-[80%]"
                        dangerouslySetInnerHTML={{ __html: resultData }}
                      ></p>




                      
                      <div className="mt-4">
                        {image && (
                          <div className="mb-4">
                            <h2>Generated Image:</h2>
                            <img src={image} alt="Generated" />
                          </div>
                        )}
                        {error && (
                          <p style={{ color: "red" }}>Error: {error}</p>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          <div className="w-2/3 fixed bottom-[2%] left-[18%]">
            <div className="rounded-xl bg-slate-100 h-16 flex justify-between px-10">
              <input
                type="text"
                onChange={(e) => {
                  setInput(e.target.value);
                  setDescription(e.target.value);
                }}
                value={input}
                className="bg-slate-100 w-full searchField"
                placeholder="Enter a prompt here"
              />
              <div className="flex items-center">
                <img
                  className="w-6"
                  onClick={generateImage}
                  src={assets.gallery_icon}
                  alt=""
                />
                <img className="w-6 mx-4" src={assets.mic_icon} alt="" />
                <img
                  className="w-6"
                  onClick={() => onSent()}
                  src={assets.send_icon}
                  alt=""
                />
              </div>
            </div>
              <button onClick={() => generatePpt(resultData)}>
                Download Presentation
              </button>
            <p className="mt-2">
              Generative AI may display inaccurate info, including about people,
              so double-check its responses. Your privacy and Generative AI.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
