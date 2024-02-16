console.log("Lets begin!!!!!!!!!!!!!!!!!!!!!");


let userContext = null;

function getHighlightedText() {
    var highlightedText = "";
    var url = window.location.href; // Get the current URL
    if (window.getSelection) {
        var selection = window.getSelection();
        if (selection && selection.toString()) {
            highlightedText = selection.toString();
        }
    } else if (document.selection && document.selection.type != "Control") {
        highlightedText = document.selection.createRange().text;
    }
    return { highlightedText, url };
}

async function summarizeWebPage(url) {
    // Fetch the webpage content
    const response = await fetch(url);
    const html = await response.text();

    // Parse HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // Extract relevant elements for summarization (e.g., headings, paragraphs, sections)
    const elements = Array.from(doc.querySelectorAll('h1, h2, h3, p, section'));

    // Summarize each element individually
    const summaries = await Promise.all(elements.map(async (element) => {
        // Extract text content from the element
        const text = element.textContent.trim();

        // Pass the text to GPT for summarization
        const summary = await summarizeText(text);
        return summary;
    }));

    // Combine all summaries into a single string
    const combinedSummary = summaries.join('\n');

    return combinedSummary;
}

async function summarizeText(text) {
    // Call GPT to summarize the provided text
    const apiKey = 'YOUR_API_KEY';
    const apiUrl = 'https://api.openai.com/v1/engines/davinci/completions';

    const payload = {
        model: 'text-davinci-003',
        prompt: text,
        max_tokens: 50,
        temperature: 0.5,
        n: 1,
        stop: ['\n']
    };

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(payload)
    });

    const data = await response.json();
    const summary = data.choices[0].text.trim();

    return summary;
}

async function getHistoricalData() {
    const apiKey = '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';
    const apiUrl = 'https://api.openai.com/v1/chat/completions';

    // Fetch the highlighted text and URL
    const { highlightedText, url } = getHighlightedText();

    // Fetch and summarize the webpage content
    const webContent = await summarizeWebPage(url);

    const historicalDataPayload = {
        "model": "gpt-3.5-turbo",
        "messages": [
            {
                "role": "user",
                "content":`need to get the historical details of ${highlightedText} in a very short words to get a small idea about ${highlightedText}. The output should be in the following format:<first 3 lines of description><3 lines of important year details><4 line details on ${highlightedText} based on the  ${webContent} >`
            },
            {
                "role": "assistant",
                "content": "China, one of the world's oldest civilizations, boasts a rich history spanning over 4,000 years. From the legendary Xia Dynasty to the present-day People's Republic, China has witnessed dynastic shifts, cultural revolutions, and remarkable achievements.\n\nImportant Years:\n- 221 BCE: Unification under the Qin Dynasty establishes the first centralized imperial state.\n- 1271 CE: Mongol leader Kublai Khan establishes the Yuan Dynasty, marking foreign rule over China.\n- 1949 CE: The founding of the People's Republic of China under Mao Zedong ushers in communist rule.\n\nChina has demonstrated remarkable resilience and growth, emerging as a global economic powerhouse. With its vast market, manufacturing capabilities, and strategic investments, China plays a pivotal role in shaping the world economy."
            }
        ],
        "temperature": 0.3
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
            showUserContextPrompt();
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

function showUserContextPrompt() {
    const contextInput = prompt("Type any other context for the highlighted text:");
    if (contextInput !== null) {
        userContext = contextInput;
        console.log("User context set:", userContext);
        getCustomResult();
    } else {
        console.log("User canceled setting the context.");
    }
}

document.addEventListener("mouseup", function() {
    getHistoricalData();
});
