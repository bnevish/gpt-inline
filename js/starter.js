const apiUrl = 'https://api.openai.com/v1/chat/completions';

// Function to fetch custom result from the OpenAI API
async function fetchwebcontent(text) {
    const apiKey = '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'; // Replace 'YOUR_API_KEY' with your actual API key
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
            const summary = await fetchwebcontent(section.textContent);
            console.log("Section:", section.textContent.trim());
            console.log("Summary:", summary);
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
