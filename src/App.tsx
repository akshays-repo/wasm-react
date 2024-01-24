import { useEffect, useState } from 'react';
import './wasm_exec.js';  // Import the wasm_exec.js file for Go-Wasm compatibility
import './wasmTypes.d.ts';  // Import the TypeScript declarations for WebAssembly

// Function to wrap the wasmFibonacciSum function for asynchronous handling
function wasmFibonacciSum(n: number) {
  return new Promise<number>((resolve) => {
    // Call the wasmFibonacciSum function from Go
    const res = window.wasmFibonacciSum(n);  
    resolve(res);
  });
}

const App = () => {
  const [isWasmLoaded, setIsWasmLoaded] = useState(false);
  const [wasmResult, setWasmResult] = useState<number | null>(null);

  // useEffect hook to load WebAssembly when the component mounts
  useEffect(() => {
    // Function to asynchronously load WebAssembly
    async function loadWasm(): Promise<void> {
      // Create a new Go object
      const goWasm = new window.Go();  
      const result = await WebAssembly.instantiateStreaming(
        // Fetch and instantiate the main.wasm file
        fetch('main.wasm'),  
        // Provide the import object to Go for communication with JavaScript
        goWasm.importObject  
      );
      // Run the Go program with the WebAssembly instance
      goWasm.run(result.instance);  
      setIsWasmLoaded(true); 
    }

    loadWasm(); 
  }, []);  

  // Function to handle button click and initiate WebAssembly calculation
  const handleClickButton = async () => {
    const n = 10;  // Choose a value for n

    console.log('Starting WebAssembly calculation...');
    const wasmStartTime = performance.now();

    try {
      // Call the wasmFibonacciSum function asynchronously
      const result = await wasmFibonacciSum(n);  
      setWasmResult(result); 
      console.log('WebAssembly Result:', result);
    } catch (error) {
      console.error('WebAssembly Error:', error);
    }

    const wasmEndTime = performance.now();
    console.log(`WebAssembly Calculation Time: ${wasmEndTime - wasmStartTime} milliseconds`);
  };

  // JSX markup for the React component
  return (
    <div>
      {isWasmLoaded && <p>Wasm Loaded</p>} 
      {!isWasmLoaded && <p>Wasm not Loaded</p>} 

      <button onClick={handleClickButton}>Handle Click Wasm</button>  
      {wasmResult !== null && (
        <div>
          <p>WebAssembly Result: {wasmResult}</p> 
        </div>
      )}
    </div>
  );
};

export default App;
