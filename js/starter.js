console.log("starter.js is running");

document.addEventListener("mouseup", function() {
    var highlightedText = getHighlightedText();
    if (highlightedText) {
        console.log("Highlighted Text: " + highlightedText);
        // You can do whatever you want with the highlighted text here
    } else {
        console.log("No text is highlighted.");
    }
});

function getHighlightedText() {
    var text = "";
    if (window.getSelection) {
        var selection = window.getSelection();
        if (selection && selection.toString()) {
            text = selection.toString();
        }
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}

