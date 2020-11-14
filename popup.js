const resolutionInput = document.querySelector("#resolution");

const loadOptions = () => {
  chrome.storage.sync.get(
    { resolutionOption: "unmodified" },
    ({ resolutionOption }) => {
      resolutionInput.value = resolutionOption;
    }
  );
};

const setBadgeText = (resolutionOption) => {
  if (resolutionOption === "1080p") {
    chrome.browserAction.setBadgeText({ text: "HD" });
  } else if (resolutionOption === "1440p") {
    chrome.browserAction.setBadgeText({ text: "2K" });
  } else if (resolutionOption === "2160p") {
    chrome.browserAction.setBadgeText({ text: "4K" });
  }
};

const saveOptions = () => {
  const resolutionOption = resolutionInput.value;
  chrome.storage.sync.set({ resolutionOption });
  setBadgeText(resolutionOption);
};

document.addEventListener("DOMContentLoaded", loadOptions);
resolutionInput.addEventListener("change", saveOptions);
