function updateResults(message, isError = false) {
    let resultsDiv = document.getElementById("results");
    if (isError) {
        resultsDiv.innerHTML += "<span style='color: red;'>" + message + "</span><br>";
    } else {
        resultsDiv.innerHTML += message + "<br>";
    }
}

function getDomainAge(url) {
    return new Promise((resolve, reject) => {
        let domain = new URL(url).hostname;
        let apiUrl = `https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=at_WXMdj3wIZbMsQ2pGpaIEJyINbGzpw&domainName=${domain}&outputFormat=JSON`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                let registrationDate = new Date(data.WhoisRecord.createdDate);
                let currentDate = new Date();
                let age = currentDate.getFullYear() - registrationDate.getFullYear();
                resolve(age);
            })
            .catch(reject);
    });
}

function getSSLCertificate(url) {
    return new Promise((resolve, reject) => {
        let domain = new URL(url).hostname;
        let apiUrl = `https://ssl-certificates.whoisxmlapi.com/api/v1?apiKey=at_WXMdj3wIZbMsQ2pGpaIEJyINbGzpw&domainName=${domain}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.certificates && data.certificates.length > 0) {
                    resolve(data.certificates[0]);
                } else {
                    reject("No SSL certificates found.");
                }
            })
            .catch(reject);
    });
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
});

