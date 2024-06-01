# Build Your Own Pizza Application

## Description

This is a simple web application that allows users to build their own custom pizza by selecting ingredients from a list of options. Once the user submits their order, the application generates an XML file containing the order details and saves it to the 'public/orders' directory. Additionally, a receipt text file is generated and saved to the 'public/receipts' directory.

## Usage

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies: `npm install`
4. Start the server: `npm start`
5. Open your web browser and go to `http://localhost:3000/`
6. Build your own pizza by selecting ingredients and submitting your order.

## File Structure

- `server.js`: The Express server file.
- `public/`: Directory containing static files for the web application.
  - `index.html`: HTML file for the main page.
  - `script.js`: JavaScript file for client-side logic.
  - `orders/`: Directory for storing XML files of orders.
  - `receipts/`: Directory for storing text files of receipts.

## Dependencies

- [Express.js](https://expressjs.com/): Web framework for Node.js.
- [fs](https://nodejs.org/api/fs.html): File system module for Node.js.
- [path](https://nodejs.org/api/path.html): Path module for Node.js.

# pizzabuilder-js
# pizzabuilder-js
