import { useState, useEffect } from "react";

const SwitchButton = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
    chrome.runtime.sendMessage({ command: "save", value: !isEnabled });
  };

  chrome.runtime.onMessage.addListener((req, sender, res) => {
    if (req.command == "response") {
      setIsEnabled(req.data.status);
    }
  });

  useEffect(() => {
    chrome.runtime.sendMessage({ command: "get" });
  }, []);

  return (
    <>
      <div className="flex justify-center my-4">
        <label
          htmlFor="toggleSwitch"
          className="flex items-center cursor-pointer select-none"
        >
          <span className="mr-2 text-gray-900 text-lg">Enable: </span>
          <input
            type="checkbox"
            id="toggleSwitch"
            checked={isEnabled}
            onChange={toggleSwitch}
            className="h-5 w-5 text-blue-500 transition duration-200 ease-in-out"
          />
        </label>
      </div>
      <div className="text-center">
        <p className="text-sm">
          Youtube Rounded Corners is:{" "}
          <b className={isEnabled ? "text-green-500" : "text-red-500"}>
            {isEnabled ? "Enabled" : "Disabled"}
          </b>
        </p>
      </div>
    </>
  );
};

export default SwitchButton;
