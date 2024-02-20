
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
                "content":`what is the historical details of ${highlightedText} based on the context: ${sectioncontext}?`
            },
            {
                "role": "assistant",
                "content": `i am developing a product which provides details about the text that they prefer to get a short detailed  historical data.when user provide a word then provide output in the following response format :<short historical details about the word><important dates><relevance with current affairs>.For example if user selects keyword india then below is the result expected : India, one of the world's oldest civilizations, has a rich history spanning thousands of years. It has seen the rise and fall of numerous empires, the spread of religions, and the struggle for independence.

                Important Dates:
                
                1947: Independence from British rule, marking the birth of the modern Indian nation.
                1950: Adoption of the Indian Constitution, establishing India as a democratic republic.
                1991: Economic liberalization reforms launched, leading to significant economic growth and globalization.
                Current Affairs:
                India continues to be a vibrant democracy with a booming economy, facing challenges such as regional tensions, economic inequality, and environmental degradation. Recent years have seen advancements in technology, space exploration, and diplomatic relations, positioning India as a key player on the global stage`
            }
        ],
        "temperature": 0.6
    };

    const fetchData = () => {
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
            // Retry after a delay with exponential backoff
            setTimeout(fetchData, Math.pow(2, fetchData.retryCount) * 1000); // Exponential backoff
            fetchData.retryCount++;
        });
    };

    fetchData.retryCount = 0;
    fetchData();
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
