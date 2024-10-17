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
    // const userName = readlineSync.question("May I have your name? ");
    // console.log(`Hello ${userName}`);
    console.log(colors.bold.green('Welcome to the Chatbot'));
    console.log(colors.bold.green('You can start chatting with the bot'));
    const chatHistory = []; // Store conversation History

    while (true) {

        const userInput = readlineSync.question(colors.yellow('You: '));

        try{

            // Construct messages by iterating over the history

            const messages = chatHistory.map(([role,content]) => ({role,content}))

            // Add latest user input
            messages.push({ role: 'user', content: userInput})

            // Call the API with user input
            const chatCompletion = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'user', content: userInput }
                ]
            });

            const completionText = chatCompletion.choices[0].message.content;

            // Get completion text/content 
            console.log(colors.green("Bot: "+completionText));
            chatHistory.push(['user', userInput]);
            chatHistory.push(['assistant', completionText])



            if (userInput.toLowerCase() === 'exit'){
                return;
            }

        } catch(error){
            console.error(colors.red(error));

        }

    }


}

main();


