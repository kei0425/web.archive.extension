chrome.webRequest.onHeadersReceived.addListener(
    function (details) {
        var
        matches = details.statusLine.match(/^(\S+) (\d\d\d)/) || [],
        statusCode = parseInt(matches[2], 10)
        ;
        if (statusCode < 200 && 300 <= statusCode) {
            console.log(details.statusLine + " url:" + details.url);
            if (statusCode == 404) {
                
            }
        }

        return;
    },
    {
        urls: ['*://*/*']
    },
    ["responseHeaders"]
);
