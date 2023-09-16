// function checkSafeBrowsing(url, callback) {
//     const API_URL = "https://safebrowsing.googleapis.com/v4/threatMatches:find?key=AIzaSyBTCUBFwdgIpSD1fETcU-v7o4V7yZgM2ow";
    
//     const requestData = {
//         "client": {
//             "clientId": "CapitalSafee",
//             "clientVersion": "1.0"
//         },
//         "threatInfo": {
//             "threatTypes": ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE", "POTENTIALLY_HARMFUL_APPLICATION"],
//             "platformTypes": ["ANY_PLATFORM"],
//             "threatEntryTypes": ["URL"],
//             "threatEntries": [{"url": url}]
//         }
//     };

//     fetch(API_URL, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(requestData)
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data && data.matches) {
//             callback(false, data.matches);
//         } else {
//             callback(true);
//         }
//     })
//     .catch(error => {
//         console.error("Error with Safe Browsing API:", error);
//         callback(null);
//     });
// }
