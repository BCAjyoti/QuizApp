const questions = [
    {
        question :"Inside which HTML element do we put the JavaScript?",
        answers:[
           {text:"<javascript>", correct:false},
           {text:"<scripting>", correct:false},
           {text:"<script>", correct:true},
           {text:"<js>", correct:false}
        ]
    },
     {
        question :"Which of the following is the correct syntax to print a page using JavaScript?",
        answers:[
           {text:"window.print();", correct:true},
           {text:"browser.print();", correct:false},
           {text:"navigator.print();", correct:false},
           {text:"document.print();", correct:false}
        ]
    },
     {
        question :"Which built-in method adds one or more elements to the end of an array and returns the new length of the array?",
        answers:[
           {text:"last()", correct:false},
           {text:"put()", correct:false},
           {text:"push()", correct:true},
           {text:"None of the above", correct:false}
        ]
    },
    {
        question :"Which of the following function of String object returns the calling string value converted to upper case?",
        answers:[
           {text:"toLocaleUpperCase()", correct:false},
           {text:"toUpperCase()", correct:true},
           {text:"toUpper()", correct:false},
           {text:"toString()", correct:false}
        ]
    },
    {
        question :"Which of the following function of Array object removes the last element from an array and returns that element?",
        answers:[
           {text:"pop()", correct:true},
           {text:"push()", correct:false},
           {text:"join()", correct:false},
           {text:"map()", correct:false}
        ]
    },
    {
        question :"Where is the preferred place to insert JavaScript?",
        answers:[
           {text:"Inside the <head> tag", correct:false},
           {text:"At the end of the <body> tag", correct:true},
           {text:"Anywhere in the file", correct:false},
           {text:"Outside the HTML file altogether", correct:false}
        ]
    },
];
const qs = document.getElementById("question");
const answer_button = document.getElementById("answer-Buttons")
const next_btn = document.getElementById("next");

// console.log(answer_button.firstElementChild)

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    start =0;
    next_btn.innerHTML = "Next"
    showQuestion();
}

function showQuestion(){
    resetState()
    let currentQuestion = questions[currentQuestionIndex];
    qs.innerHTML = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        console.log(answer.text)
        button.innerText= answer.text;
        button.classList.add("btn");
        answer_button.appendChild(button)
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        // answerButtons.appendChild(button);
    });
}

function resetState(){
    next_btn.style.display = "none";
    while(answer_button.firstChild){
        answer_button.removeChild(answer_button.firstChild)
    }
}
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++
    }
    else{
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answer_button.children).forEach(button=>{
        if(button.dataset.correct === "true"){
           button.classList.add("correct")
        }
        button.disabled = true
    })
    next_btn.style.display = "block"
}
next_btn.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextBtn()
    }
    else{
        startQuiz()
    }
});
function handleNextBtn(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion()
    }
    else{
        showScore()
    }
}
function showScore(){
    resetState();
    qs.innerHTML = `You scored ${score} out of ${questions.length} !`;
    next_btn.innerHTML = "Play Again";
    next_btn.style.display = "block"
}
startQuiz()
