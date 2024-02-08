let userContext = null;
let allSectionSummaries = [];

function getPageContent() {
    return fetch(window.location.href)
        .then(response => response.text())
        .catch(error => {
            console.error("Error retrieving page content:", error);
            throw error;
        });
}

async function generatePageSummary() {
    try {
        const pageContent = await getPageContent();
        const apiKey = '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';
        const apiUrl = 'https://api.openai.com/v1/chat/completions';

        const pageSummaryPayload = {
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'user', content: pageContent },
                { role: 'assistant', content: 'Generate a summary of the entire webpage.' },
            ],
            temperature: 0.7,
        };

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(pageSummaryPayload)
        })
        .then(response => response.json())
        .then(pageSummaryData => {
            const summary = pageSummaryData.choices[0].message.content;
            console.log("Page Summary:", summary);
        })
        .catch(error => console.error('Error:', error));
    } catch (error) {
        console.error("Error generating page summary:", error);
    }
}

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
            { role: 'user', content: `What is the dictionary meaning of the ${highlightedText}?` },
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
        getHistoricalData(highlightedText, allSectionSummaries.join("\n"));
    })
    .catch(error => console.error('Error:', error));
}

function getHistoricalData(highlightedText, entireSummary) {
    const apiKey = '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';
    const apiUrl = 'https://api.openai.com/v1/chat/completions';

    const historicalDataPayload = {
        model: 'gpt-3.5-turbo',
        messages: [
            { role: 'user', content: `I'm curious about the historical data of ${highlightedText}.Could you provide insights into a particular aspect, time period, or context related to ${highlightedText} in history?My goal is to gather information and understand the historical background of ${highlightedText}.A concise and informative overview  in 10 lines would be great.` },
            { role: 'assistant', content: entireSummary },
        ],
        temperature: 0.5,
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
        userContext = historicalData.choices[0].message.content;
        showUserContextPrompt(highlightedText);
    })
    .catch(error => console.error('Error:', error));
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

document.addEventListener("mouseup", async function() {
    var highlightedText = getHighlightedText();
    if (highlightedText) {
        console.log("Highlighted Text: " + highlightedText);
        await generatePageSummary();
        getDictionaryMeaning(highlightedText);
    } else {
        console.log("No text is highlighted.");
    }
});

function handleSectionSummary(summary) {
    allSectionSummaries.push(summary);
    if (allSectionSummaries.length === sections.length) {
        console.log("All section summaries:", allSectionSummaries);
        console.log("Summary is:", allSectionSummaries.join("\n"));
    }
}
