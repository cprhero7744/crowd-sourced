import { render } from "preact";
import { useEffect, useState } from "preact/compat";
import { GetSiteLanguageSelected } from "./helpers";
import { randomImage } from "./images";
import { Header } from "./components/header";
import { AudioInput } from "./components/input-audio";
import { TextInput } from "./components/input-text";
import { XMarkIcon } from "@heroicons/react/20/solid";

function handleSubmit(e, payload) {
  const f = new FormData();
  Object.keys(payload).forEach((k) => {
    f.append(k, payload[k]);
  });

  fetch(`${process.env.API_URL}/responses`, {
    method: "POST",
    body: f,
  });
}
function App({ img, language }) {
  const [audio, setAudio] = useState(null);
  const [text, setText] = useState(null);
  const [payload, setPayload] = useState({});
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    setPayload({
      image_id: img.id,
      audio: audio,
      text: text,
      language: language,
    });
  }, [img, audio, text, language]);

  return (
    isOpen && (
      <>
        <div
          class="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          {/* <!--
          Background backdrop, show/hide based on modal state.
      
          Entering: "ease-out duration-300"
            From: "opacity-0"
            To: "opacity-100"
          Leaving: "ease-in duration-200"
            From: "opacity-100"
            To: "opacity-0"
        --> */}
        </div>
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            {/* <!--
      Modal panel, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        To: "opacity-100 translate-y-0 sm:scale-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100 translate-y-0 sm:scale-100"
        To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    --> */}
            <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div class="flex flex-row-reverse">
                  <button
                    onClick={(e) => {
                      setIsOpen(false);
                    }}
                  >
                    <XMarkIcon class="h-8 w-8" />
                  </button>
                </div>
                <Header language={language} />

                {/* LANGUAGE SELECTOR */}

                {/* IMAGE APP */}
                {/* START IMAGE */}
                <div class="flex justify-around">
                  <img class="w-40 h-40" src={img.url} />
                </div>
                {/* END IMAGE */}
              </div>
              {/* <!-- INPUT SECTION --> */}
              <div class="flex flex-col space-y-3 px-4 sm:px-6">
                <TextInput text={text} setText={setText} />
                <AudioInput setAudio={setAudio} />
              </div>
              <div class="bg-gray-50 px-4 py-6 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                  onClick={(e) => handleSubmit(e, payload)}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
}

document.addEventListener("DOMContentLoaded", function () {
  // Parse DOM in parent website to detrmine selected language
  // Default to english for local development or demonstration purposes
  // in non-embedded context.
  console.log("Starting CrowdSourced...");
  const lang = GetSiteLanguageSelected() || { value: "en", text: "English" };
  console.log(`crowdsourced selected language: ${JSON.stringify(lang)}`);

  render(
    <App img={randomImage()} language={lang} />,
    document.getElementById("cswrapper")
  );
});
