function checkSafeBrowsing(url) {
    return new Promise((resolve, reject) => {
        const API_URL = "https://safebrowsing.googleapis.com/v4/threatMatches:find?key=AIzaSyBTCUBFwdgIpSD1fETcU-v7o4V7yZgM2ow";
        const requestData = {
            "client": {
                "clientId": "CapitalSafe",
                "clientVersion": "1.0"
            },
            "threatInfo": {
                "threatTypes": ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE", "POTENTIALLY_HARMFUL_APPLICATION"],
                "platformTypes": ["ANY_PLATFORM"],
                "threatEntryTypes": ["URL"],
                "threatEntries": [{"url": url}]
            }
        };

        fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData)
        })
        .then(response => response.json())
        .then(data => {
            if (data && data.matches) {
                resolve(data.matches);
            } else {
                resolve(null); 
            }
        })
        .catch(error => {
            reject(error);
        });
    });
}
