function updateResults(message, isError = false) {
    let resultsDiv = document.getElementById("results");
    if (isError) {
        resultsDiv.innerHTML += "<span style='color: red;'>" + message + "</span><br>";
    } else {
        resultsDiv.innerHTML += message + "<br>";
    }
}

chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    let currentTab = tabs[0];
    let url = currentTab.url;

    if (!url.startsWith("https://")) {
        updateResults("The site doesn't use a secure protocol.");
        return;
    }

    getDomainAge(url)
        .then(age => {
            updateResults(`Domain Age: ${age} years`);
        })
        .catch(error => {
            updateResults(`Error retrieving domain age: ${error}`, true);
        });

    getSSLCertificate(url)
        .then(ssl => {
            updateResults(`SSL Certificate - Chain Hierarchy: ${ssl.chainHierarchy}`);
            updateResults(`Validation Type: ${ssl.validationType}`);
            updateResults(`Valid from ${ssl.validFrom} to ${ssl.validTo}`);
            updateResults(`Serial Number: ${ssl.serialNumber}`);
            updateResults(`Signature Algorithm: ${ssl.signatureAlgorithm}`);
        })
        .catch(error => {
            updateResults(`Error retrieving SSL certificate: ${error}`, true);
        });

    checkSafeBrowsing(url)
        .then(matches => {
            if (matches) {
                updateResults(`WARNING! This domain may be unsafe due to: ${matches[0].threatType}`, true);
            } else {
                updateResults("This domain is considered SAFE by Google Safe Browsing.");
            }
        })
        .catch(error => {
            updateResults(`Error checking with Google Safe Browsing API: ${error}`, true);
        });
});
