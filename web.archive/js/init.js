chrome.webRequest.onHeadersReceived.addListener(
    function (details) {
        var
        matches = details.statusLine.match(/^(\S+) (\d\d\d)/) || [],
        statusCode = parseInt(matches[2], 10)
        ;
        if (statusCode < 200 || 300 <= statusCode) {
            console.log(details.statusLine + " url:" + details.url +
                        ' type:' + details.type);
            if (statusCode == 404) {
                checkWebArchive(details.url, details.tabId);
            }
        }

        return;
    },
    {
        urls: ['*://*/*'],
        types: ['main_frame']
    },
    ["responseHeaders"]
);

function checkWebArchive(url, tabId) {
    $.getJSON(
        'http://archive.org/wayback/available',
        {
            url : url
        },
        function (json) {
            if (json.archived_snapshots.closest) {
                chrome.tabs.update(
                    tabId,
                    {
                        url : json.archived_snapshots.closest.url
                    });
            }
        }
    );
}