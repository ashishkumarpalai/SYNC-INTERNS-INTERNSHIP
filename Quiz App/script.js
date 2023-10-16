
const quizDB = [
    {
        question: "Q1: Who is known as the father of India?",
        a: "Jawaharlal Nehru",
        b: "Mahatma Gandhi",
        c: "Sardar Vallabhbhai Patel",
        d: "B.R. Ambedkar",
        ans: "ans2"
    },
    {
        question: "Q2: What is the national flag of India ?",
        a: "Tricolor",
        b: "Saffron Flag",
        c: "Indian Standard Flag",
        d: "National Banner",
        ans: "ans1"
    },
    {
        question: "Q3: What is the national bird of India?",
        a: "Peacock",
        b: "Sparrow",
        c: "Pigeon",
        d: "Parrot",
        ans: "ans1"
    },
    {
        question: "Q4: What is the national flower of India?",
        a: "Rose",
        b: "Lotus",
        c: "Tulip",
        d: "Lily",
        ans: "ans2"
    },
    {
        question: "Q5: What is the national song of India?",
        a: "Vande Mataram",
        b: "Jana Gana Mana",
        c: "Saare Jahaan Se Achha",
        d: "Ae Mere Watan Ke Logo",
        ans: "ans1"
    },
    {
        question: "Q6: What is the national anthem of India?",
        a: "Vande Mataram",
        b: "Jana Gana Mana",
        c: "Saare Jahaan Se Achha",
        d: "Ae Mere Watan Ke Logo",
        ans: "ans2"
    },
    {
        question: "Q7: What is the national animal of India?",
        a: "Lion",
        b: "Tiger",
        c: "Elephant",
        d: "Leopard",
        ans: "ans2"
    }
];

const question = document.querySelector('.question');
const option1 = document.querySelector('#option1');
const option2 = document.querySelector('#option2');
const option3 = document.querySelector('#option3');
const option4 = document.querySelector('#option4');
const submit = document.querySelector('#submit');

const answers = document.querySelectorAll('.answer');
const showScore = document.querySelector('#showScore');

let questionCount = 0;
let score = 0;

const loadQuestion = () => {

    const questionList = quizDB[questionCount];
    question.innerText = questionList.question;
    option1.innerText = questionList.a;
    option2.innerText = questionList.b;
    option3.innerText = questionList.c;
    option4.innerText = questionList.d;
}
loadQuestion();

const getCheckAnswer = () => {
    let answer;

    answers.forEach((curAnsElem) => {
        if (curAnsElem.checked) {
            answer = curAnsElem.id;
        }
    });
    return answer;
};

submit.addEventListener('click', () => {
    const checkedAnswer = getCheckAnswer();
    console.log(checkedAnswer);

    if (checkedAnswer == quizDB[questionCount].ans) {
        score++;
    };
    questionCount++;

    if (questionCount < quizDB.length) {
        loadQuestion();

    } else {
        if (score === 7) {
            showScore.innerHTML = `
                <h3>You scored 🤩 ${score}/${quizDB.length}</h3>
                <h3>Congratulations, You are the winner! 🏆</h3>
                <button class="btn" onclick="location.reload()">Restart</button>
            `;
        } else {
            showScore.innerHTML = `
                <h3>You scored 🎉 ${score}/${quizDB.length}</h3>
                <button class="btn" onclick="location.reload()">Restart</button>
            `;
        }

        showScore.classList.remove('scoreArea');
    }
});