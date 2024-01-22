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
      const n = 1000;
      console.log("Running wasm.....");
      const op = await wasmFibonacciSum(n);
      console.log("wasm op", op);

      console.log("Running js.....");
      const ops = await jsFibonacciSum(n);
      console.log("wasm op", ops);
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
