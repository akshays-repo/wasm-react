import { useEffect, useState } from 'react'
import './App.css'
import "./wasm_exec.js";
import "./wasmTypes.d.ts";

function wasmFibonacciSum(n:number) {
  return new Promise((resolve) => {
    const res = window.wasmFibonacciSum(n);
    resolve(res);
  });
}

function  jsFibonacciSum(n:number) {
  let a = 0, b = 1, totalSum = 0;

  for (let i = 0; i < n; i++) {
    totalSum += a;
    [a, b] = [b, a + b];
  }

  return totalSum;
}

const App = () => {
  const [isWasmLoaded, setIsWasmLoaded] = useState(false);

  useEffect(() => {
    async function loadWasm(): Promise<void> {
      const goWasm = new window.Go();
      const result = await WebAssembly.instantiateStreaming(
        fetch("main.wasm"),
        goWasm.importObject
      );
      goWasm.run(result.instance);
    }
    loadWasm().then(() => {
      setIsWasmLoaded(true)
    })
  }, [])

  const handleClickButton = async() => {
      const n = 1000000000;

      console.log("Starting WebAssembly calculation...");
      const wasmStartTime = performance.now();
      const wasmResult = await wasmFibonacciSum(n);
      const wasmEndTime = performance.now();
      console.log("WebAssembly Result:", wasmResult);
      console.log(`WebAssembly Calculation Time: ${wasmEndTime - wasmStartTime} milliseconds`);

      // JavaScript
      console.log("Starting JavaScript calculation...");
      const jsStartTime = performance.now();
      const jsResult = jsFibonacciSum(n);
      const jsEndTime = performance.now();
      console.log("JavaScript Result:", jsResult);
      console.log(`JavaScript Calculation Time: ${jsEndTime - jsStartTime} milliseconds`);
  }

  return (
    <div>
      {isWasmLoaded && <p>Wasm Loaded</p>}
      {!isWasmLoaded && <p>Wasm not Loaded</p>}

      <button onClick={handleClickButton}>Handle Click Wasm</button>
    </div>
  )
}

export default App
