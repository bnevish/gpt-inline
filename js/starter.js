document.addEventListener("DOMContentLoaded", function() {
    // Access the popup element
    const popup = document.getElementById('popup');
    const popupContent = document.getElementById('popupContent');
    const popupText = document.getElementById('popupText');

    // Show the popup
    function showPopup(message) {
        popupText.textContent = message;
        popup.style.display = 'block';
    }

    // Hide the popup
    function hidePopup() {
        popup.style.display = 'none';
    }

    // Close the popup when the close button is clicked
    document.getElementById('closeButton').addEventListener('click', hidePopup);

    // Example usage:
    showPopup("This is a custom popup message.");
});
