// Function to fetch and summarize the webpage content using ChatGPT
async function summarizeWebPage() {
    const url = window.location.href; // Get the current URL

    // Fetch the webpage content
    const response = await fetch(url);
    const html = await response.text();

    // Parse HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // Extract relevant elements for summarization (e.g., headings, paragraphs, sections)
    const elements = Array.from(doc.querySelectorAll('h1, h2, h3, p, section'));

    // Extract text content from elements
    const textContent = elements.map(element => element.textContent.trim()).join('\n');

    // Call ChatGPT to summarize the webpage content
    const summary = await getGPTSummary(textContent);
    
    // Display the summarized content
    console.log("Webpage Summary:", summary);
}

// Function to call ChatGPT for summarization
async function getGPTSummary(text) {
    const apiKey = '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';
    const apiUrl = 'https://api.openai.com/v1/completions';

    const payload = {
        model: 'text-davinci-003',
        prompt: text,
        max_tokens: 100,
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

// Event listener for text highlighting
document.addEventListener("mouseup", function() {
    var selectedText = getSelectedText();
    if (selectedText) {
        console.log("Highlighted Text:", selectedText);
        summarizeWebPage();
    }
});

// Function to get the selected text
function getSelectedText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    }
    return text;
}
