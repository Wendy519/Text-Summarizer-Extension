document.addEventListener("DOMContentLoaded", function () {
    var summarizeButton = document.getElementById("summarizeButton");

    summarizeButton.addEventListener("click", function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "getSelection" }, function (
                response
            ) {
                if (response && response.selectedText) {
                    // Send the selected text to your server for summarization
                    fetch("http://127.0.0.1:5000/summarize", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ selectedText: response.selectedText }),
                    })
                        .then(function (response) {
                            return response.json();
                        })
                        .then(function (data) {
                            // Handle the summarized text returned from the server
                            console.log("Summarized Text:", data.summarizedText);
                            // Perform actions with the summarized text
                            document.getElementById("summary").textContent =
                                data.summarizedText;
                        })
                        .catch(function (error) {
                            console.error("Error:", error);
                        });
                }
            });
        });
    });
});
