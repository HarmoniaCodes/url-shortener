import React, { useRef, useState } from "react";

function App() {
  const baseURL = "https://api.shrtco.de/v2/shorten?url=";

  const get_longLink = useRef(null);

  const [getOrig, setOrig] = useState(null);
  const [getShort, setShort] = useState(null);
  //Take the long link from user input
  async function getShortLink() {
    const title = get_longLink.current.value;

    if (title) {
      try {
        //Pass user input to the API
        const shortener = await fetch(`${baseURL}${title}`);
        // If it broke, give an error
        if (!shortener.ok) {
          const message = `Uh oh! ${shortener.status} - ${shortener.statusText}`;
          throw new Error(message);
        }
        //display the data in a human-readable way
        const data = await shortener.json();
        const origLink = data.result.original_link;
        const shortenedLink = data.result.short_link;

        setShort(shortenedLink);
        setOrig(origLink);
      } catch (err) {
        setOrig(err.message);
      }
    }
  }

  return (
    <div className="flex flex-col align-center justify-center rounded-lg relative -top-8 md:top-1">
      <div className="card-body flex justify-center">
        <div className="flex flex-col md:flex-row justify-center p-4 md:p-12 w-3/4 m-6 md:w-3/4 rounded-md bg-darkviolet linkSection">
          <input
            type="text"
            ref={get_longLink}
            className="block w-full md:w-11/12 rounded-md p-4 mb-4 md:mb-0"
            placeholder="Shorten a Link here..."
          />
          <input
            type="button"
            value="Shorten it!"
            className="w-full md:ml-8 md:w-fit text-white bg-cyan rounded-md font-bold  text-lg py-2 px-8"
            onClick={() => {
              getShortLink();
              document.getElementById("urlInfo").className =
                "text-lg w-3/4 text-center space-y-6 md:space-y-0 md:text-left self-center block md:flex md:justify-start rounded-md bg-white md:mx-40 py-8 mx-6 px-6";
            }}
          />
        </div>
      </div>
      <div id="urlInfo" className="hidden">
        <span id="originalLink" className="block md:w-full">
          {getOrig}
        </span>
        <span id="shortLink" className="block text-cyan">
          {getShort}
        </span>
        <input
          type="button"
          id="copyButton"
          value="Copy"
          className="md:ml-4 text-white bg-cyan rounded-md px-8 py-2 text-sm font-bold w-full md:w-fit"
          onClick={() => {
            navigator.clipboard.writeText(`${getShort}`);
            document.getElementById("copyButton").value = "Copied!";
            document.getElementById("copyButton").className =
              "md:ml-4 text-white bg-verydarkviolet rounded-md px-8 py-2 text-sm font-bold w-full md:w-fit";
          }}
        />
      </div>
    </div>
  );
}

export default App;
