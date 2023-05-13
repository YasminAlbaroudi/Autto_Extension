// This code will run when the extension is clicked
chrome.browserAction.onClicked.addListener(function () {
  // Open a new tab
  chrome.tabs.create({}, function (tab) {
    // Get the URL of the new tab
    var tabUrl = tab.url;
    console.log(tabUrl);
  });
});
