@echo off
setlocal

if "%~1"=="" (
	curl -X GET https://purge.jsdelivr.net/gh/reamkf/nanoda-wiki@main/inject.js
	curl -X GET https://purge.jsdelivr.net/gh/reamkf/nanoda-wiki@main/table.js
) else (
	curl -X GET https://purge.jsdelivr.net/gh/reamkf/nanoda-wiki/%~1.js
)

endlocal