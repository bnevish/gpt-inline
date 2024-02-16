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
            { role: 'user', content: `What is the dictionary meaning of the ${highlightedText}?`},
            
        ],
        temperature: 0.5,
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
        "model": "gpt-3.5-turbo",
        "messages": [
            {
                "role": "user",
                "content": `need to get the historical details of ${highlightedText} in a very short words to get a small idea about ${highlightedText}. The output should be in the following format:<first 3 lines of description><3 lines of important year details><4 line details on ${highlightedText} based on the context world war >`
            },
            {
                "role": "assistant",
                "content": `need to get the historical details of ${highlightedText} in a very short words to get a small idea about ${highlightedText}. The output should be in the following format: <first 3 lines of description><3 lines of important year details><4 line details on ${highlightedText} based on the context ${highlightedText} is good in economy>`
            }
        ],
        "temperature": 0.3
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
    .catch(error => {
        console.error('Error:', error);
        // Retry after a delay
        setTimeout(() => {
            getHistoricalData(highlightedText);
        }, 5000); // Delay for 5 seconds (adjust as needed)
    });
}



function getCustomResult(highlightedText) {
    const apiKey = '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';
    const apiUrl = 'https://api.openai.com/v1/chat/completions';

    function fetchCustomResult() {
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
            continueOrEnd();
        })
        .catch(error => console.error('Error:', error));
    }

    function continueOrEnd() {
        const userInput = prompt("Type context or 'end' to stop:");
        if (userInput !== null) {
            if (userInput.toLowerCase() !== 'end') {
                userContext = userInput;
                console.log("User context set:", userContext);
                fetchCustomResult();
            } else {
                console.log("User ended the process.");
            }
        } else {
            console.log("User canceled setting the context.");
        }
    }

    fetchCustomResult();
}

function showUserContextPrompt(highlightedText) {
    const contextInput = prompt("Type any other context for the highlighted text:");
    if (contextInput !== null) {
        userContext = contextInput;
        console.log("User context set:", userContext);
        getCustomResult(highlightedText);
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
