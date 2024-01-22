package main

import (
	"syscall/js"
)

func main() {
	done := make(chan struct{}, 0)
	js.Global().Set("wasmFibonacciSum", js.FuncOf(fibonacciSum))

	<-done
}

func fibonacciSum(this js.Value, p []js.Value) interface{} {
	n := p[0].Int()
	a, b, totalSum := 0, 1, 0

	for i := 0; i < n; i++ {
		totalSum += a
		a, b = b, a+b
	}
	return js.ValueOf(totalSum)
}
