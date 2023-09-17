function getDomainAge(url) {
    return new Promise((resolve, reject) => {
        let domain = new URL(url).hostname;
        let apiUrl = `https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=at_UeQ3eLOxnHkYxuJCgJh2SmHaDKcYv&domainName=${domain}&outputFormat=JSON`;

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
