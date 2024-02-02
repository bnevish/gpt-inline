let userContext = null;

function getHighlightedText() {
    var highlightedText = "";
    if (window.getSelection) {
        var selection = window.getSelection();
        if (selection && selection.toString()) {
            highlightedText = selection.toString();
        }
    } else if (document.selection && document.selection.type != "Control") {
        highlightedText = document.selection.createRange().text;
    }
    return highlightedText;
}

function getDictionaryMeaning(highlightedText) {
    const apiKey = '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';
    const apiUrl = 'https://api.openai.com/v1/chat/completions';

    const dictionaryMeaningPayload = {
        model: 'gpt-3.5-turbo',
        messages: [
            { role: 'user', content: highlightedText },
            { role: 'assistant', content: 'What is the dictionary meaning of the highlighted text?' },
        ],
        temperature: 0.7,
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(dictionaryMeaningPayload)
    })
    .then(response => response.json())
    .then(dictionaryMeaningData => {
        console.log("Dictionary Meaning:", dictionaryMeaningData.choices[0].message.content);
        getHistoricalData(highlightedText);
    })
    .catch(error => console.error('Error:', error));
}

function getHistoricalData(highlightedText) {
    const apiKey = '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';
    const apiUrl = 'https://api.openai.com/v1/chat/completions';

    const historicalDataPayload = {
        model: 'gpt-3.5-turbo',
        messages: [
            { role: 'user', content: highlightedText },
            { role: 'assistant', content: 'Tell me about the historical data of highlightedText.' },
        ],
        temperature: 0.7,
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(historicalDataPayload)
    })
    .then(response => response.json())
    .then(historicalData => {
        console.log("Historical Data:", historicalData.choices[0].message.content);
        showUserContextPrompt(highlightedText);
    })
    .catch(error => console.error('Error:', error));
}

function getCustomResult(highlightedText, userContext) {
    const apiKey = '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';
    const apiUrl = 'https://api.openai.com/v1/chat/completions';

    const customResultPayload = {
        model: 'gpt-3.5-turbo',
        messages: [
            { role: 'user', content: highlightedText },
            { role: 'assistant', content: userContext },
        ],
        temperature: 0.7,
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(customResultPayload)
    })
    .then(response => response.json())
    .then(customResultData => {
        console.log("Custom Result:", customResultData.choices[0].message.content);
    })
    .catch(error => console.error('Error:', error));
}

function showUserContextPrompt(highlightedText) {
    const contextInput = prompt("Type any other context for the highlighted text:");
    if (contextInput !== null) {
        const userContext = contextInput;
        console.log("User context set:", userContext);
        getCustomResult(highlightedText, userContext);
    } else {
        console.log("User canceled setting the context.");
    }
}

document.addEventListener("mouseup", function() {
    var highlightedText = getHighlightedText();
    if (highlightedText) {
        console.log("Highlighted Text: " + highlightedText);
        getDictionaryMeaning(highlightedText);
    } else {
        console.log("No text is highlighted.");
    }
});
