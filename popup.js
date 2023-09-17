function updateResults(message, isHeading = false) {
    let resultsDiv = document.getElementById("results");
    if (isHeading) {
        resultsDiv.innerHTML += "<h3>" + message + "</h3>";
    } else {
        resultsDiv.innerHTML += message + "<br>";
    }
}

chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    let currentTab = tabs[0];
    let url = currentTab.url;

    let domainAge;
    let sslInfo;
    let isSafeBrowsing;

    if (!url.startsWith("https://")) {
        updateResults("Not Safe to Browse", true);
        updateResults("This site doesn't use a secure protocol. It's not recommended to share any personal or financial information.");
        return;
    }

    getDomainAge(url)
        .then(age => {
            domainAge = age;
            return getSSLCertificate(url);
        })
        .then(ssl => {
            sslInfo = ssl;
            return checkSafeBrowsing(url);
        })
        .then(matches => {
            isSafeBrowsing = !matches;

            if (isSafeBrowsing && domainAge > 1 && sslInfo) {
                updateResults("Safe to Browse", true);
                updateResults(`This site is considered safe by Google Safe Browsing, has been around for ${domainAge} years, and uses a secure SSL certificate.`);
            } else if (isSafeBrowsing && domainAge <= 1 && sslInfo) {
                updateResults("Safe to Browse with Caution", true);
                updateResults("This site is considered safe by Google Safe Browsing, and uses a secure SSL certificate but has only been around for less than one year.");
            } else {
                updateResults("Not Safe to Browse", true);
                updateResults("This site has some safety concerns. Please be cautious.");
            }

            if (domainAge) {
                updateResults("<br>Domain Details:", true);
                updateResults(`Age: ${domainAge} years`);
            }

            if (sslInfo) {
                updateResults("<br>SSL Certificate:", true);
                updateResults(`Type: ${sslInfo.chainHierarchy}`);
                updateResults(`Validation: ${sslInfo.validationType}`);
                updateResults(`Validity: ${sslInfo.validFrom} - ${sslInfo.validTo}`);
            }

            updateResults("<br>Remember, even safe websites can sometimes be compromised. Always avoid sharing personal or financial information unless you're certain.");
        })
        .catch(error => {
            updateResults(`Error: ${error}`, true);
        });
});
