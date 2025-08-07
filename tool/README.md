# CLI TypeScript Project

This project is a simple CLI application written in TypeScript. It serves as an example of how to set up a TypeScript project that can be compiled to JavaScript and run in a Node.js environment.

## Project Structure

```
cli
├── src
│   └── index.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (version 12 or higher)
- npm (Node package manager)

### Installation

1. Clone the repository or download the project files.
2. Navigate to the project directory:
   ```
   cd cli
   ```
3. Install the dependencies:
   ```
   npm install
   ```

### Compiling TypeScript

To compile the TypeScript code to JavaScript, run the following command:
```
npx tsc
```

This will generate the JavaScript files in the `dist` directory (if configured in `tsconfig.json`).

### Running the Script

After compiling, you can run the script using Node.js:
```
node dist/index.js
```

### Scripts

You can also add scripts to your `package.json` for easier execution. For example, you can add the following under "scripts":
```json
"scripts": {
  "build": "tsc",
  "start": "node dist/index.js"
}
```

Then you can run:
```
npm run build
npm start
```

## Contributing

Feel free to submit issues or pull requests for improvements or bug fixes.