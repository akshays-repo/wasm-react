@echo off

REM Set GOOS environment variable
set GOOS=js

REM Set GOARCH environment variable
set GOARCH=wasm

REM Run the go build command
go build -o public/main.wasm -ldflags "-s -w" ./go/main.go
