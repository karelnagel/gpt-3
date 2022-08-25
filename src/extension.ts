import * as vscode from 'vscode';
import { Configuration, OpenAIApi } from "openai";

const getConf = <T = string>(key: string) => vscode.workspace.getConfiguration('gpt3').get(key) as T;

const apiKey = getConf<string>("apiKey")
const model = getConf<string>("model")
const replace = getConf<boolean>("replace");
const temperature = getConf<number>("temperature");
const max_tokens = getConf<number>("maxTokens");

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "gpt3" is now active!');

	let disposable = vscode.commands.registerCommand('gpt3.complete', async () => {
		vscode.window.showInformationMessage('Hello Worldadsfasdf from gpt3!');

		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage("No editor is active");
			return;
		}

		const text = editor.selection.isEmpty ?
			editor.document.lineAt(editor.selection.active.line).text :
			editor.document.getText(editor.selection);

		vscode.window.showInformationMessage("Sending: " + text);

		const openai = new OpenAIApi(new Configuration({ apiKey }));
		const response = await openai.createCompletion({
			model,
			prompt: text,
			temperature,
			max_tokens
		});

		const result = response.data.choices ? response.data?.choices[0].text ?? "" : "";
		vscode.window.showInformationMessage("Success");

		editor.edit(edit => {
			const active = editor.selection.active;
			const anchor = editor.selection.anchor;
			if (replace) {
				editor.selection.isEmpty ?
					edit.replace(new vscode.Selection(new vscode.Position(active.line, 0), new vscode.Position(active.line + 1, 0)), result) :
					edit.replace(editor.selection, result);
			}
			else {
				edit.insert(new vscode.Position(Math.max(active.line, anchor.line) + 1, 0), result);
			}
		});
	});
	context.subscriptions.push(disposable);
}

export function deactivate() { }
