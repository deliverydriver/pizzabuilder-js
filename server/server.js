const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')));

// Parse JSON request bodies
app.use(express.json());

// Function to generate a random order number
function generateOrderNumber() {
    return Math.floor(Math.random() * 1000) + 1;
}

// Function to format the date
function formatDate(date) {
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    return year + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day;
}

// Function to handle order submission
function handleOrderSubmission(ingredients) {
    if (ingredients.length === 0) {
        return 'Please select at least one ingredient.';
    }

    var orderNumber = generateOrderNumber();
    var currentDate = formatDate(new Date());
    var xmlContent = `<?xml version="1.0" encoding="UTF-8"?>\n<order>\n<date>${currentDate}</date>\n<orderNumber>${orderNumber}</orderNumber>\n<ingredients>\n`;
    ingredients.forEach(ingredient => {
        xmlContent += `    <ingredient>${ingredient}</ingredient>\n`;
    });
    xmlContent += '</ingredients>\n</order>';

    var ordersDir = path.join(__dirname, '../public/orders');
    if (!fs.existsSync(ordersDir)) {
        fs.mkdirSync(ordersDir);
    }

    var xmlFilePath = path.join(ordersDir, `ORDER${orderNumber}.xml`);
    fs.writeFileSync(xmlFilePath, xmlContent);

    var receiptsDir = path.join(__dirname, '../public/receipts');
    if (!fs.existsSync(receiptsDir)) {
        fs.mkdirSync(receiptsDir);
    }

    var receiptContent = `Order Number: ${orderNumber}\nDate: ${currentDate}\nIngredients:\n`;
    ingredients.forEach(ingredient => {
        receiptContent += `- ${ingredient}\n`;
    });

    var receiptFilePath = path.join(receiptsDir, `ORDER${orderNumber}_Receipt.txt`);
    fs.writeFileSync(receiptFilePath, receiptContent);

    return `Order placed successfully. Order number: ${orderNumber}`;
}

// Handle order submission
app.post('/submit-order', (req, res) => {
    const ingredients = req.body.ingredients;
    const message = handleOrderSubmission(ingredients);
    res.send(message);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app; // Export the Express app
