document.addEventListener("DOMContentLoaded", function() {
    // Access the popup element and its style property
    console.log("started")
    const popup = document.getElementById('popup');
    popup.style.display = 'block'; // Show the popup

    // Rest of your JavaScript code goes here
    const apiUrl = 'https://api.openai.com/v1/chat/completions';

    // Function to fetch custom result from the OpenAI API
    async function fetchwebcontent(text) {
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
    async function summarizeSectionWithHighlightedText(highlightedText) {
        if (highlightedText) {
            const section = findSectionContainingHighlightedText(highlightedText);
            if (section) {
                const summary = await fetchwebcontent(section.textContent);
                console.log("Section:", section.textContent.trim());
                console.log("Summary:", summary);
                return summary;
            } else {
                console.log("Could not find section containing the highlighted text.");
            }
        } else {
            console.log("No text highlighted.");
        }
    }

    // Function to find the section containing the highlighted text
    function findSectionContainingHighlightedText(highlightedText) {
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
            // No need to call summarizeAndProcess here since we only want dictionary meaning
        })
        .catch(error => console.error('Error:', error));
    }

    async function summarizeAndProcess(highlightedText) {
        const webContent = await summarizeSectionWithHighlightedText(highlightedText); // Wait for the promise to resolve
        console.log("web_content:", webContent); // Now you can access the resolved content
        getHistoricalData(highlightedText, webContent);
    }

    function getHistoricalData(highlightedText,web_content) {
        const apiKey = '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';
        const apiUrl = 'https://api.openai.com/v1/chat/completions';

        const historicalDataPayload = {
            "model": "gpt-3.5-turbo",
            "messages": [
                {
                    "role": "user",
                    "content":`what is the historical details of ${highlightedText} in the following context ${web_content}?`
                },
                {
                    "role": "assistant",
                    "content": `i am developing a product which provides details about the text that they prefer to get a short detailed  historical data.when user provide a word then provide output in the following response format :<short historical details about the word><important dates><historical details reagrding to the context provided><make the response into these sections mentioned with proper header as given in tags>.For example if user prompt passed is what is the historical details of india in the following context india is good in sports  then below is the result expected : India, officially the Republic of India, is a country in South Asia known for its rich cultural heritage and diverse history. It has been home to several ancient civilizations and empires.

                    Important Dates:
                    - 15th August 1947: India gained independence from British rule.
                    - 26th January 1950: India adopted its constitution and became a republic.
                    
                    Historical Details Regarding the Context Provided:
                    India has a long history of sports, with cricket being one of the most popular sports in the country. It has produced many talented athletes who have excelled in various international competitions.`
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

    function getCustomResult(highlightedText, userQuestion) {
        const apiKey = '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';
        const apiUrl = 'https://api.openai.com/v1/chat/completions';

        function fetchCustomResult() {
            const customResultPayload = {
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'user', content: userQuestion },
                    { role: 'assistant', content: `i am developing a product where user highlights a keyword and user need to get some details about the keyword in his/her context.Here user highlighted the keyword ${highlightedText}`},
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
                alert("Custom Result: " + customResultData.choices[0].message.content);
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

    function showOptionsPopup(highlightedText) {
        const option = prompt("Choose an option:\n1. Dictionary Meaning\n2. Historical Data\n3. Custom Result");
        switch (option) {
            case '1':
                getDictionaryMeaning(highlightedText);
                break;
            case '2':
                summarizeAndProcess(highlightedText);
                break;
            case '3':
                const userQuestion = prompt("Enter your question:");
                if (userQuestion) {
                    getCustomResult(highlightedText, userQuestion);
                } else {
                    console.log("No question provided.");
                }
                break;
            default:
                console.log("Invalid option.");
        }
    }

    document.addEventListener("mouseup", function() {
        var highlightedText = getHighlightedText();
        if (highlightedText) {
            console.log("Highlighted Text: " + highlightedText);
            showOptionsPopup(highlightedText);
        } else {
            console.log("No text is highlighted.");
        }
    });
});
