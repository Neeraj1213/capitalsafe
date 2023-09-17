function getSSLCertificate(url) {
    return new Promise((resolve, reject) => {
        let domain = new URL(url).hostname;
        let apiUrl = `https://ssl-certificates.whoisxmlapi.com/api/v1?apiKey=at_x9S2ZOyWcZZUIWd1fSoo6Rl4fYOco&domainName=${domain}`;

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
