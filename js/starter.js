console.log("starter.js is running good");

function getHighlightedText() {
    var text = "";
    if (window.getSelection) {
        var selection = window.getSelection();
        if (selection && selection.toString()) {
            text = selection.toString();
        }
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}

function getDictionaryMeaning(text) {
    // Replace 'YOUR_API_KEY' with your actual GPT-3 API key
    const apiKey = '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';
    const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';  // Adjust the endpoint as per GPT-3 documentation

    // Construct the request payload
    const payload = {
        prompt: `Define: ${text}`,
        max_tokens: 50,  // Adjust as needed
        n: 1  // Number of completions
        // Add other parameters based on GPT-3 documentation
    };

    // Make the API request
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response from GPT-3
        const generatedText = data.choices[0].text;
        console.log("Generated Text: " + generatedText);
    })
    .catch(error => console.error('Error:', error));
}

// Example usage
document.addEventListener("mouseup", function() {
    var highlightedText = getHighlightedText();
    if (highlightedText) {
        console.log("Highlighted Text: " + highlightedText);
        getDictionaryMeaning(highlightedText);
    } else {
        console.log("No text is highlighted.");
    }
});
