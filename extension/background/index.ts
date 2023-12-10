export {}
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getResponse') {
    // Access the response JSON using the chrome.tabs API
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, { action: 'sendResponse' }, (response) => {
        // Handle the response here
        if (response && response.data) {
          const responseData = response.data;
          // Perform further actions with the response data
        }
      });
    });
  }
});
chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    title: 'Ask Sensei "%s"',
    contexts: ["selection"],
    id: "myContextMenuId"
  });

  chrome.contextMenus.create({
    title: "Save Image URL to Local Storage",
    contexts: ["image"],
    id: "saveImageURL"
  });
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId === "myContextMenuId") {
    const dict = info.selectionText;

    chrome.storage.sync.set({ dict1: dict }, function() {
      chrome.windows.create({
        url: "popup.html",
        type: "popup",
        width: 1050,
        height: 800
      }, function(popupWindow) {
        chrome.tabs.query({ active: true, windowId: popupWindow.id }, function(tabs) {
          const tabId = tabs[0].id;
          chrome.tabs.sendMessage(tabId, { type: "lookup" });
        });
      });
    });
  } else if (info.menuItemId === "saveImageURL") {
    const imageUrl = info.srcUrl;

    chrome.storage.local.set({ "imageUrl": imageUrl }, function() {
      console.log("Image URL saved to local storage");
      chrome.runtime.openOptionsPage();
    });
  }
});
