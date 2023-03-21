const last_window_info = {
  location_default: {
    height: 500,
    width: 500,
    top: 100,
    left: 100,
  },
  save(w) {
    this.location.height = w.height;
    this.location.width = w.width;
    this.location.top = w.top;
    this.location.left = w.left;
  },
};

const extensionView = {
  window: null,
  tab: null,
  find() {
    return new Promise((resolve) => {
      chrome.windows.getAll({ populate: true }, (windows) => {
        for (let window of windows) {
          for (let tab of window.tabs) {
            if (
              tab.url.includes(
                `chrome-extension://${chrome.i18n.getMessage("@@extension_id")}`
              )
            ) {
              this.window = window;
              this.tab = tab;
              resolve(true);
              return;
            }
          }
        }
        resolve(false);
      });
    });
  },
  focus() {
    chrome.windows.update(this.window.id, { focused: true });
    chrome.tabs.update(this.tab.id, { active: true });
  },
};

function getLastWindowLocation() {
  return new Promise((resolve) => {
    chrome.storage.local.get(["lastLocation"], ({ lastLocation }) => {
      if (lastLocation) {
        resolve(lastLocation);
      } else {
        resolve(null);
      }
    });
  });
}

async function launchExtension() {
  let res = await getLastWindowLocation();
  let location;
  if (res == null) {
    location = last_window_info.location_default;
  } else {
    location = res;
  }
  await extensionView.find().then((found) => {
    if (found) {
      extensionView.focus();
    } else {
      chrome.windows.create(
        {
          url: chrome.runtime.getURL("index.html#/templates"),
          type: "popup",
          focused: true,
          ...location,
        },
        (w) => {
          extensionView.window = w;
        }
      );
    }
  });
}

function updateWindowSize(window) {
  if (extensionView.window) {
    if (extensionView.window.id === window.id) {
      let location = {
        height: window.height,
        width: window.width,
        top: window.top,
        left: window.left,
      };
      chrome.storage.local
        .set({ lastLocation: location })
        .then(() => {})
        .catch(() => {});
    }
  }
}

chrome.action.onClicked.addListener(launchExtension);
chrome.windows.onBoundsChanged.addListener(updateWindowSize);
