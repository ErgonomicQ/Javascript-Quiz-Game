var questions = [
    
    {question: "Commonly used data types DON'T include:", 
    options: ["strings", "booleans", "alerts", "numbers"], 
    answer: "alerts"},

    {question: "The condition in an 'if/else' statement is enclosed within ______.", 
    options: ["quotes", "curly brackets", "parentheses", "square brackets"], 
    answer: "parentheses"},

    {question: "Arrays in Javascript can be used to store ______.", 
    options: ["numbers & strings", "other arrays", "booleans", "all of the above"],
    answer: "all of the above"},

    {question: "String values must be enclosed within ______ when being assigned to variables.", 
    options: ["commas", "curly brackets", "quotes", "parantheses"], 
    answer: "quotes"},

    {question: "A very useful tool used during development and debugging for printing content to the debugger is:", 
    options: ["Javascript", "terminal/bash", "for-loops", "console.log"], 
    answer: "terminal/bash"},

    {question: "What does DOM stand for?",
    options: ["Document Object Model", "Divided Orientation Module", "Dedicated Organization Mode", "Definitive Order Mix"],
    answer: "Document Object Model"}
];
// This file contains the questions array only. Multiple scripts can be used, though their load order is exceptionally important
// Since this is above gamelogic.js, this will be loaded first, and can be referenced by the former.