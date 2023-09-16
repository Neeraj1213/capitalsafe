chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    let currentTab = tabs[0];
    let url = currentTab.url;
  
    // update div
    document.getElementById("results").innerText = "Evaluating...";
  
    // URL chekc krne ke liye
  });
  