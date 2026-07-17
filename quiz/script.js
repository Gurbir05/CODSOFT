

let questions = JSON.parse(localStorage.getItem("quizQuestions")) || [];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;
let userAnswers = [];

// Pages
const pages = document.querySelectorAll(".page");

function showPage(id){

pages.forEach(page=>page.classList.remove("active"));

document.getElementById(id).classList.add("active");

}

// Navigation Buttons

document.getElementById("homeBtn").onclick=()=>showPage("home");

document.getElementById("createBtn").onclick=()=>showPage("create");

document.getElementById("listBtn").onclick=()=>{

showPage("list");

displayQuestions();

}

document.getElementById("takeBtn").onclick=()=>{

if(questions.length==0){

alert("No quiz available!");

return;

}

startQuiz();

};

document.getElementById("startQuiz").onclick=()=>{

if(questions.length==0){

alert("Please create a quiz first!");

return;

}

startQuiz();

};

// Add Question

document.getElementById("addQuestion").onclick=function(){

let question=document.getElementById("question").value.trim();

let op1=document.getElementById("option1").value.trim();

let op2=document.getElementById("option2").value.trim();

let op3=document.getElementById("option3").value.trim();

let op4=document.getElementById("option4").value.trim();

let correct=document.getElementById("correct").value;

if(question==""||op1==""||op2==""||op3==""||op4==""||correct==""){

alert("Please fill all fields.");

return;

}

questions.push({

question:question,

options:[op1,op2,op3,op4],

correct:Number(correct)

});

localStorage.setItem("quizQuestions",JSON.stringify(questions));

document.getElementById("questionCount").innerHTML=

"Questions Added : "+questions.length;

// Clear Form

document.getElementById("question").value="";

document.getElementById("option1").value="";

document.getElementById("option2").value="";

document.getElementById("option3").value="";

document.getElementById("option4").value="";

document.getElementById("correct").value="";

alert("Question Added Successfully!");

};

// Display Questions

function displayQuestions(){

let list=document.getElementById("quizList");

list.innerHTML="";

questions.forEach((q,index)=>{

list.innerHTML+=`

<div class="question-card">

<h3>Question ${index+1}</h3>

<p><b>${q.question}</b></p>

<p>A. ${q.options[0]}</p>

<p>B. ${q.options[1]}</p>

<p>C. ${q.options[2]}</p>

<p>D. ${q.options[3]}</p>

</div>

`;

});

}

// Start Quiz

function startQuiz(){

currentQuestion=0;

score=0;

selectedAnswer=null;

userAnswers=[];

showPage("quiz");

loadQuestion();

}

// Load Question

function loadQuestion(){

let q=questions[currentQuestion];

document.getElementById("qNumber").innerHTML=

`Question ${currentQuestion+1} of ${questions.length}`;

document.getElementById("quizQuestion").innerHTML=q.question;

let answers=document.getElementById("answers");

answers.innerHTML="";

q.options.forEach((option,index)=>{

let btn=document.createElement("button");

btn.className="option";

btn.innerHTML=option;

btn.onclick=function(){

document.querySelectorAll(".option").forEach(o=>{

o.classList.remove("selected");

});

btn.classList.add("selected");

selectedAnswer=index;

};

answers.appendChild(btn);

});

// Progress Bar

document.getElementById("progressBar").style.width=

((currentQuestion)/questions.length)*100+"%";

}
// ===============================
// Part 2 - Quiz Logic
// ===============================

// Next Button
document.getElementById("nextBtn").onclick = function () {

    if (selectedAnswer === null) {
        alert("Please select an answer.");
        return;
    }

    userAnswers.push(selectedAnswer);

    if (selectedAnswer === questions[currentQuestion].correct) {
        score++;
    }

    currentQuestion++;
    selectedAnswer = null;

    if (currentQuestion < questions.length) {

        loadQuestion();

    } else {

        showResult();

    }

};

// Show Result
function showResult() {

    showPage("result");

    document.getElementById("progressBar").style.width = "100%";

    let percentage = Math.round((score / questions.length) * 100);

    document.getElementById("score").innerHTML =

        `Your Score : ${score} / ${questions.length}<br><br>
         Percentage : ${percentage}%`;

    let review = document.getElementById("correctAnswers");

    review.innerHTML = "<h2>Answer Review</h2><br>";

    questions.forEach((q, index) => {

        let user =
            userAnswers[index] != null
                ? q.options[userAnswers[index]]
                : "Not Answered";

        let correct = q.options[q.correct];

        review.innerHTML += `

        <div class="answer-review">

            <h3>Question ${index + 1}</h3>

            <p><b>${q.question}</b></p>

            <p>Your Answer :
                <span style="color:${
                    userAnswers[index] == q.correct ? "green" : "red"
                }">
                ${user}
                </span>
            </p>

            <p>Correct Answer :
                <span style="color:green">
                ${correct}
                </span>
            </p>

        </div>

        `;

    });

}

// Restart Quiz
document.getElementById("restart").onclick = function () {

    currentQuestion = 0;
    score = 0;
    selectedAnswer = null;
    userAnswers = [];

    startQuiz();

};

// Load Existing Questions Count
document.getElementById("questionCount").innerHTML =
"Questions Added : " + questions.length;

// Show Home Initially
showPage("home");


document.addEventListener("keydown", function (e) {

    if (e.ctrlKey && e.shiftKey && e.key === "D") {

        if (confirm("Delete all saved quiz questions?")) {

            localStorage.removeItem("quizQuestions");

            questions = [];

            document.getElementById("questionCount").innerHTML =
                "Questions Added : 0";

            document.getElementById("quizList").innerHTML = "";

            alert("All quiz questions deleted.");

        }

    }

});
questions = [
{
question: "What does HTML stand for?",
options: [
"Hyper Text Markup Language",
"High Text Machine Language",
"Hyperlinks Text Markup Language",
"Home Tool Markup Language"
],
correct: 0
},

{
question: "Which language is used for styling web pages?",
options: [
"HTML",
"CSS",
"Java",
"Python"
],
correct: 1
},

{
question: "Which language is used to make a website interactive?",
options: [
"C++",
"JavaScript",
"SQL",
"PHP"
],
correct: 1
},
{
question: "Which symbol is used to declare a JavaScript single-line comment?",
options: [
"<!-- -->",
"//",
"##",
"**"
],
correct: 1
},

{
question: "Which company developed JavaScript?",
options: [
"Microsoft",
"Netscape",
"Google",
"Apple"
],
correct: 1
}
];