const apiUrl = 'https://api.openai.com/v1/chat/completions';
const delayBetweenRequests = 500; // Adjust the delay as needed (in milliseconds)

// Function to fetch custom result from the OpenAI API with rate limiting
async function fetchCustomResult(text) {
    const apiKey = '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'; // Replace 'YOUR_API_KEY' with your actual API key

    const payload = {
        model: 'gpt-3.5-turbo',
        prompt: text,
        max_tokens: 50, // Limit summary to 5 lines (assuming 10 words per line)
        temperature: 0.5,
        n: 1,
        stop: ['\n']
    };

    try {
        // Introduce a delay between requests to avoid rate-limiting issues
        await new Promise(resolve => setTimeout(resolve, delayBetweenRequests));

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

// Function to summarize each major section of the webpage
async function summarizeWebPage() {
    const url = window.location.href; // Get the current URL
    const response = await fetch(url);
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const elements = Array.from(doc.querySelectorAll('h1, h2, h3, p, section'));

    let combinedSummary = '';

    for (const element of elements) {
        const text = element.textContent.trim();
        const summary = await fetchCustomResult(text);
        combinedSummary += summary + '\n';
    }

    // Display the combined summary in the console
    console.log("Combined Summary:");
    console.log(combinedSummary);
}

// Load the summarization when the webpage is loaded
window.addEventListener("load", summarizeWebPage);
