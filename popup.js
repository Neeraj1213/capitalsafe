function hasSecureProtocol(url) {
    return url.startsWith("https://");
}

function getDomainAge(url, callback) {
    let domain = new URL(url).hostname;
    let apiUrl = `https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=at_WXMdj3wIZbMsQ2pGpaIEJyINbGzpw&domainName=${domain}&outputFormat=JSON`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            let registrationDate = new Date(data.WhoisRecord.createdDate);
            let currentDate = new Date();
            let age = currentDate.getFullYear() - registrationDate.getFullYear();
            callback(age);
        })
        .catch(error => {
            console.error("Error fetching WHOIS data:", error);
            callback(null);
        });
}

chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    let currentTab = tabs[0];
    let url = currentTab.url;

    let resultsDiv = document.getElementById("results");

    if (!hasSecureProtocol(url)) {
        resultsDiv.innerText = "The site doesn't use a secure protocol.";
        return;
    }

    getDomainAge(url, function(age) {
        if (age !== null) {
            resultsDiv.innerText = `Domain Age: ${age} years\n`;
        } else {
            resultsDiv.innerText = "Could not determine domain age.\n";
        }
        
        resultsDiv.innerText += "Blacklist checking feature is currently disabled.";
    });
});
