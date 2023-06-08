chrome.runtime.onMessage.addListener((request, sender, response) => {
  if (request.command == "save") {
    chrome.storage.local.set({ status: request.value }, () => {
      console.log("Set value: ", request.value);
    });
  }
  if (request.command == "get") {
    chrome.storage.local.get("status").then((data) => {
      chrome.runtime.sendMessage({ command: "response", data: data });
    });
  }
});
