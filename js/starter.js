// Function to fetch custom result from the OpenAI API
async function fetchCustomResult(text) {
    const apiKey = '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'; // Replace 'YOUR_API_KEY' with your actual API key
    const apiUrl = 'https://api.openai.com/v1/chat/completions';

    const payload = {
        model: 'gpt-3.5-turbo',
        prompt: text,
        max_tokens: 150, // Adjust the max_tokens as needed
        temperature: 0.5,
        n: 1,
        stop: ['\n']
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
        return data.choices[0].text.trim();
    } catch (error) {
        console.error('Error fetching custom result:', error);
        return 'Error: Failed to fetch custom result';
    }
}

// Function to summarize each section of the webpage
async function summarizeWebPage() {
    const url = window.location.href; // Get the current URL
    const response = await fetch(url);
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const elements = Array.from(doc.querySelectorAll('h1, h2, h3, p, section'));

    for (const element of elements) {
        const text = element.textContent.trim();
        const summary = await fetchCustomResult(text);
        console.log("Section:", text);
        console.log("Summary:", summary);
    }
}

// Load the summarization when the webpage is loaded
window.addEventListener("load", summarizeWebPage);
