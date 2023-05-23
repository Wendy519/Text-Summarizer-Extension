chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "summarize",
        title: "Summarize Selected Text",
        contexts: ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "summarize") {
        chrome.tabs.sendMessage(tab.id, { action: "getSelection" }, (response) => {
            if (response && response.selectedText) {
                fetch("http://127.0.0.1:5000/summarize", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ selectedText: response.selectedText }),
                })
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        console.log("Summarized Text:", data.summarizedText);
                        // Perform actions with the summarized text
                    })
                    .catch(function (error) {
                        console.error("Error:", error);
                    });
            }
        });
    }
});
