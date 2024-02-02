console.log("starter.js is running good as usual");

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
    })
    .catch(error => console.error('Error:', error));
}

function getHistoricalData() {
    const apiKey = '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';
    const apiUrl = 'https://api.openai.com/v1/chat/completions';

    const historicalDataPayload = {
        model: 'gpt-3.5-turbo',
        messages: [
            { role: 'user', content: highlightedText },
            { role: 'assistant', content: 'is the above word related to any historical data,if so what is that' },
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
    })
    .catch(error => console.error('Error:', error));
}

document.addEventListener("mouseup", function() {
    var highlightedText = getHighlightedText();
    if (highlightedText) {
        console.log("Highlighted Text: " + highlightedText);
        getDictionaryMeaning(highlightedText);
        getHistoricalData();
    } else {
        console.log("No text is highlighted.");
    }
});
