# GPT 3 

[VS CODE EXTENSION](https://marketplace.visualstudio.com/items?itemName=KarelNagel.gpt3)


## Introduction

A easy to use extension for using GPT-3 in VS Code


## Configuration

1. Get API key from OpenAI
2. Add API key to extension settings or go to settings.json and add "gpt3.apiKey"="<YOUR_API_KEY>"
3. Modify other settings
4. Type a line or select text that you would like to send to GPT-1 
5. Press ctr+cmd+g or cmd+shift+p and select "GPT3 complete"


## Using 

If you have selected a area then it will send that to GPT-3, but if you haven't selected anything then it will send the current line. If you set `replace` to true then it will replace the selected text with the generated text, otherwise add another line with the generated text.