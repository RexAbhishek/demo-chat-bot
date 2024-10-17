import openai from "./config/open-ai.js";
import readlineSync from "readline-sync";
import colors from "colors";



async function m() {
    try {
        const chatCompletion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'user', content: 'What is the capital of Massachusetts?' }
            ]
        });
        console.log(chatCompletion.choices[0].message);
    } catch (error) {
        if (error.code === 'insufficient_quota') {
            console.error('You have exceeded your quota. Please check your plan and billing details.');
        } else {
            console.error('An error occurred:', error);
        }
    }
}

async function main() {
    const userName = readlineSync.question("May I have your name? ");
    console.log(`Hello ${userName}`);

}

main();


