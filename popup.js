function updateResults(message, isHeading = false, color = "") {
    const resultsDiv = document.getElementById("results");
    const fragment = document.createDocumentFragment();
    
    const element = document.createElement(isHeading ? 'h3' : 'p');
    element.innerText = message;
    
    if (color) {
        element.style.color = color;
    }

    fragment.appendChild(element);
    resultsDiv.appendChild(fragment);
}

function generateReport(isSafeBrowsing, domainAge, sslInfo) {
    if (isSafeBrowsing && domainAge > 1 && sslInfo) {
        updateResults("Safe to Browse", true, "#34A853");
        updateResults(`This site is considered safe by Google Safe Browsing, has been around for ${domainAge} years, and uses a secure SSL certificate.`);
    } else if (isSafeBrowsing && domainAge <= 1 && sslInfo) {
        updateResults("Browse with Caution", true, "#FBBC04");
        updateResults("This site is considered safe by Google Safe Browsing and uses a secure SSL certificate but has only been around for less than one year.");
    } else {
        updateResults("Not Safe to Browse", true, "#EF5350");
        updateResults("This site has some safety concerns. Please be cautious.");
    }
}

chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const currentTab = tabs[0];
    const url = currentTab.url;

    if (!url.startsWith("https://")) {
        updateResults("Not Safe to Browse", true, "#EF5350");
        updateResults("This site doesn't use a secure protocol. It's not recommended to share any personal or financial information.");
        return;
    }

    Promise.all([getDomainAge(url), getSSLCertificate(url), checkSafeBrowsing(url)])
    .then(results => {
        const [domainAge, sslInfo, matches] = results;
        const isSafeBrowsing = !matches;
        
        generateReport(isSafeBrowsing, domainAge, sslInfo);
        
        if (domainAge) {
            updateResults("Domain Details:", true);
            updateResults(`Age: ${domainAge} years`);
        }

        if (sslInfo) {
            updateResults("SSL Certificate:", true);
            updateResults(`Type: ${sslInfo.chainHierarchy}`);
            updateResults(`Validation: ${sslInfo.validationType}`);
            updateResults(`Validity: ${sslInfo.validFrom} - ${sslInfo.validTo}`);
        }

        updateResults("Remember, even safe websites can sometimes be compromised. Always avoid sharing personal or financial information unless you're certain.");
    })
    .catch(error => {
        updateResults(`Error: ${error}`, true, "#EF5350");
    });
});
