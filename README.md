# Collectwire Backend Challenge

This is my subsmission for the Collectwire backend assessment test. It includes a development environment setup, basic request handling, and a test suite for verifying functionality.

## Prerequisites

Before getting started, ensure you have the following installed:

- Node.js (LTS version recommended)
- npm (comes with Node.js)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/nicholasikiroma/collectWire-backend-challenge.git
cd collectWire-backend-challenge
```

### 2. Install Dependencies

Install the required dependencies by running:

```bash
npm install
```

### 3. Set Up Environment

Make sure to set any necessary environment variables. You can do so by adding them to a `.env` file or setting them directly in your terminal before running the app.

### 4. Running the Application in Development Mode

To run the application in development mode with automatic restarts when files change, use:

```bash
npm run dev
```

This will start the server on `localhost:8088` (default port is set to 8088, you can configure this port in the `.env` ).

### 5. Sending a Request

You can send a `POST` request to your server with a file using `curl`. Here's an example that uploads a `matrix.csv` file:

```bash
curl -F 'file=@/path/matrix.csv' "localhost:8088/echo"
```

This will send the file to the `/echo` endpoint of the server.

### 6. Running Unit Tests

To run the tests for the app, execute the following command:

```bash
npm run test
```
