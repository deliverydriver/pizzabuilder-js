// script.js

document.addEventListener('DOMContentLoaded', function() {
    // Function to handle form submission
    function handleSubmit(event) {
        event.preventDefault();
        var ingredients = Array.from(document.querySelectorAll('input[name="ingredient"]:checked')).map(checkbox => checkbox.value);

        fetch('/submit-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ingredients: ingredients }),
        })
        .then(response => response.text())
        .then(message => {
            document.getElementById('message').textContent = message;
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    // Event listener for form submission
    var form = document.getElementById('order-form');
    form.addEventListener('submit', handleSubmit);
});

