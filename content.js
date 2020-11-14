const setCodec = (codec) => {
  const codecData = {
    h264: { h264: "ExternalDecoder", vp9: "libvpx", "vp9-profile0": "libvpx" },
    vp9: { vp9: "ExternalDecoder" },
  };
  localStorage.setItem(
    "video_codec_implementation_by_codec_key",
    JSON.stringify(codecData[codec] || codecData.h264)
  );
};

const setStreamRes = (res) => {
  const resCodes = {
    auto: 4,
    "1080p": 3,
    "720p": 2,
  };
  localStorage.setItem(
    "_bl3",
    JSON.stringify({
      data: [resCodes[res] || resCodes.auto, 1],
      creation: Date.now(),
    })
  );
};

const setWindowRes = (w, h) => {
  Object.defineProperty(window.screen, "availWidth", { value: w });
  Object.defineProperty(window.screen, "availHeight", { value: h });
  Object.defineProperty(window.screen, "width", { value: w });
  Object.defineProperty(window.screen, "height", { value: h });
};

const set2160p = () => {
  setWindowRes(3840, 2160);
  setStreamRes("auto");
  setCodec("vp9");
};

const set1440p = () => {
  setWindowRes(2560, 1440);
  setStreamRes("auto");
  setCodec("vp9");
};

const set1080p = () => {
  setWindowRes(1920, 1080);
  setStreamRes("1080p");
  setCodec("vp9");
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

window.addEventListener("load", () => {
  chrome.storage.sync.get(
    { resolutionOption: "unmodified" },
    ({ resolutionOption }) => {
      setBadgeText(resolutionOption);

      if (resolutionOption === "1080p") {
        return set1080p();
      }

      if (resolutionOption === "1440p") {
        return set1440p();
      }

      if (resolutionOption === "2160p") {
        return set2160p();
      }
    }
  );
});
