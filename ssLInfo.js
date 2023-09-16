// function fetchSSLCertificateInfo(domain, callback) {
//     fetch(`https://ssl-certificates.whoisxmlapi.com/api/v1?apiKey=at_WXMdj3wIZbMsQ2pGpaIEJyINbGzpw&domainName=${domain}`)
//         .then(response => response.json())
//         .then(data => {
//             const certificate = data.certificates[0];
//             callback(null, certificate);
//         })
//         .catch(error => {
//             console.error('SSL API Error:', error);
//             callback(error);
//         });
// }
