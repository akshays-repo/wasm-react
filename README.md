# WebAssembly with Go and React

This repository demonstrates the integration of WebAssembly (Wasm) with Go and React.

## How to Run

1. Clone the repository:

    ```bash
    git clone https://github.com/akshays-repo/wasm-react.git
    cd wasm-react
    ```

2. ### Build Go WebAssembly:

   ```bash
   GOARCH=wasm GOOS=js go build -o main.wasm
   ```

3. ### Copy `wasm_exec.js`:

   ```bash
   cp "$(go env GOROOT)/misc/wasm/wasm_exec.js" .
   ```

4. ### Move the `main.wasm` file to public:


5. ### Move the `wasm_exec.js` file to src:


6. ### Run the React App:

   ```bash
   npm install
   npm start
   ```

7. Open your browser and visit [http://localhost:5173](http://localhost:5173). You should see the React app with integrated WebAssembly.

Adjust the code and configurations based on your specific requirements. Feel free to explore and modify the code for your needs. Happy coding!
```

This version provides a concise set of instructions on how to run the code without focusing on the installation process.