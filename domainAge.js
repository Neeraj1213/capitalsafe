// function fetchDomainAge(domain, callback) {
//     fetch(`https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=at_WXMdj3wIZbMsQ2pGpaIEJyINbGzpw&domainName=${domain}&outputFormat=JSON`)
//         .then(response => response.json())
//         .then(data => {
//             const creationDate = new Date(data.WhoisRecord.createdDate);
//             const currentYear = new Date().getFullYear();
//             const domainAge = currentYear - creationDate.getFullYear();
//             callback(null, domainAge);
//         })
//         .catch(error => {
//             console.error('Whois API Error:', error);
//             callback(error);
//         });
// }
