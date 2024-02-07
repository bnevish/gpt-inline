let userContext = null;

function summarizeWebpageContent() {
    const apiKey = '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';
    const apiUrl = 'https://api.openai.com/v1/summarization';

    const webpageContent = document.documentElement.outerHTML;

    const summarizePayload = {
        model: 'text-davinci-003',
        prompt: webpageContent,
        max_tokens: 150,
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(summarizePayload)
    })
    .then(response => response.json())
    .then(summaryData => {
        console.log("Summary:", summaryData.choices[0].text);
        getHistoricalData(summaryData.choices[0].text);
    })
    .catch(error => console.error('Error:', error));
}

function getHistoricalData(summary) {
    const apiKey = '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';
    const apiUrl = 'https://api.openai.com/v1/chat/completions';

    const historicalDataPayload = {
        model: 'gpt-3.5-turbo',
        messages: [
            { role: 'user', content: `I'm curious about the historical data summarized from the webpage. Could you provide insights into a particular aspect, time period, or context related to this summary in history? My goal is to gather information and understand the historical background. A concise and informative overview in 10 lines would be great.` },
            { role: 'assistant', content: summary },
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
        showUserContextPrompt();
    })
    .catch(error => console.error('Error:', error));
}

function getCustomResult() {
    const apiKey = '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';
    const apiUrl = 'https://api.openai.com/v1/chat/completions';

    // Assuming we have some highlighted text or user input to provide as context
    const userInput = prompt("Type any highlighted text or additional context:");

    const customResultPayload = {
        model: 'gpt-3.5-turbo',
        messages: [
            { role: 'user', content: userInput },
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

    function continueOrEnd() {
        const userInput = prompt("Type context or 'end' to stop:");
        if (userInput !== null) {
            if (userInput.toLowerCase() !== 'end') {
                userContext = userInput;
                console.log("User context set:", userContext);
                getCustomResult();
            } else {
                console.log("User ended the process.");
            }
        } else {
            console.log("User canceled setting the context.");
        }
    }
}

function showUserContextPrompt() {
    const contextInput = prompt("Type any additional context for the historical data:");
    if (contextInput !== null) {
        userContext = contextInput;
        console.log("User context set:", userContext);
        getCustomResult();
    } else {
        console.log("User canceled setting the context.");
    }
}

document.addEventListener("DOMContentLoaded", function() {
    summarizeWebpageContent();
});
