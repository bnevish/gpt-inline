const apiUrl = 'https://api.openai.com/v1/chat/completions';

// Function to fetch custom result from the OpenAI API
async function fetchWebContent(text) {
    const apiKey = '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'; // Replace 'YOUR_API_KEY' with your actual API key
    console.log("Section in function:", text);
    const payload = {
        "model": "gpt-3.5-turbo",
        "messages": [
            {
                "role": "user",
                "content": `Summarize the following : ${text}`
            }
        ],
        "max_tokens": 50,
        "temperature": 0.5,
        "n": 1,
        "stop": ["\n"]
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        const content = data.choices[0].message.content.trim(); // Accessing the 'content' part directly
        return content;
    } catch (error) {
        console.error('Error fetching custom result:', error);
        return 'Error: Failed to fetch custom result';
    }
}

// Function to summarize the section containing the highlighted text
async function summarizeSectionWithHighlightedText() {
    const highlightedText = getSelectedText().trim();
    if (highlightedText) {
        const section = findSectionContainingHighlightedText();
        if (section) {
            const summary = await fetchWebContent(section.textContent);
            console.log("Section:", section.textContent.trim());
            console.log("Summary:", summary);
            getDictionaryMeaning(highlightedText, summary); // Pass the summary to getDictionaryMeaning
        } else {
            console.log("Could not find section containing the highlighted text.");
        }
    } else {
        console.log("No text highlighted.");
    }
}

// Function to find the section containing the highlighted text
function findSectionContainingHighlightedText() {
    const highlightedText = getSelectedText().trim();
    if (highlightedText) {
        const elements = document.querySelectorAll('h1, h2, h3, p, section');
        for (const element of elements) {
            if (element.textContent.includes(highlightedText)) {
                return element;
            }
        }
    }
    return null;
}

// Function to get the highlighted text
function getSelectedText() {
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

// Function to get the dictionary meaning and historical data
function getDictionaryMeaning(highlightedText, summary) {
    const apiKey = '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';
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
        getHistoricalData(highlightedText, summary); // Pass the summary to getHistoricalData
    })
    .catch(error => console.error('Error:', error));
}

// Function to get historical data
function getHistoricalData(highlightedText, summary) {
    const historicalDataPayload = {
        "model": "gpt-3.5-turbo",
        "messages": [
            {
                "role": "user",
                "content":`what is the historical details of ${highlightedText} in the following context ${summary}?`
            },
            {
                "role": "assistant",
                "content": `i am developing a product which provides details about the text that they prefer to get a short detailed historical data. when user provide a word then provide output in the following response format :<short historical details about the word><important dates><relevance with current affairs>. For example if user selects keyword india then below is the result expected: India, one of the world's oldest civilizations, has a rich history spanning thousands of years. It has seen the rise and fall of numerous empires, the spread of religions, and the struggle for independence.

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
}

// Function to show user context prompt
function showUserContextPrompt(highlightedText) {
    const contextInput = prompt("Type any other context for the highlighted text:");
    if (contextInput !== null) {
        console.log("User context set:", contextInput);
        getCustomResult(highlightedText);
    } else {
        console.log("User canceled setting the context.");
    }
}

// Function to fetch custom result based on user input
function getCustomResult(highlightedText) {
    const customResultPayload = {
        model: 'gpt-3.5-turbo',
        messages: [
            { role: 'user', content: highlightedText },
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

// Event listener for mouseup event
document.addEventListener("mouseup", function() {
    var highlightedText = getSelectedText();
    if (highlightedText) {
        console.log("Highlighted Text: " + highlightedText);
        summarizeSectionWithHighlightedText(); // Call summarizeSectionWithHighlightedText
    } else {
        console.log("No text is highlighted.");
    }
});


// Event listener for text highlighting
document.addEventListener("mouseup", summarizeSectionWithHighlightedText);

// Function to get the selected text
function getSelectedText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    }
    return text;
}
