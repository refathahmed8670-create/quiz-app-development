const MyBtn = document.querySelector(".MyBtn button")
const RuleBox = document.querySelector(".RuleBox")
const exitButtons = document.querySelector(".Buttons .ExitButton")
const ContinueButton = document.querySelector(".Buttons .ContinueButton")
const Questions = document.querySelector(".Questions")
const TimeCount = document.querySelector(".TimeCount .seconds");
const timeLine = document.querySelector("QuestionHeader .time_lines");


let que_count = 0;
let counter;
let timeValue = 15;

let counterLine;
let widthValue = 0;
let userScore = 0;

MyBtn.onclick = () => {
    RuleBox.classList.add("activeInfo");
}

exitButtons.onclick = () => {
    RuleBox.classList.remove("activeInfo")
}

ContinueButton.onclick = () => {
    RuleBox.classList.remove("activeInfo")
    Questions.classList.add("activeQuiz")
    showQuestion(0)
    startTimer(15)
    startTimerLine(0);
}

const NextBtn = document.querySelector(".NextBtn"); 

const result_box = document.querySelector(".result_box");
const quit_quiz = document.querySelector(".buttons .quit")

    

quit_quiz.onclick = ()=>{
    window.location.reload();
}


let TimeLine = document.querySelector(".time_lines");
let option_list = document.querySelector(".MyOption");

NextBtn.onclick = ()=> {
    if(que_count <questions.length -1){
         que_count ++ 
         showQuestion(que_count);
         clearInterval(counter);
         startTimer(timeValue);

         clearInterval(counterLine);
         startTimerLine(widthValue);
         NextBtn.style.display = "none";
    }else{
        console.log("You have complete your task🎉");
        showResultBox()
        NextBtn.innerHTML = "Replay"
        NextBtn.style.display = "block"
    }
}

function showQuestion(index) {
    const que_text = document.querySelector('.text');
    const option_list = document.querySelector('.MyOption')
    let option_tag = `<div class="Option">`+ questions[index].options[0] +`</div>`
                    +`<div class="Option">`+ questions[index].options[1] +`</div>`
                    +`<div class="Option">`+ questions[index].options[2] +`</div>`
                    +`<div class="Option">`+ questions[index].options[3] +`</div>`


    let que_tag = "<span>"+ questions[index].numb + "." + questions[index].question + "</span>"; 
    que_text.innerHTML = que_tag
    option_list.innerHTML = option_tag
    const Total_Que = document.querySelector(".Total_Que")
    let Total_QueTag = `<p>`+questions[index].numb+ ` Of 5 </p>`
    Total_Que.innerHTML = Total_QueTag;


    const Option = option_list.querySelectorAll(".Option");
    for(let i=0; i<Option.length; i++){
        Option[i].setAttribute("onclick", "OptionSelected(this)");
    }
}

let tickIcon = '<div class="tickic on"> <i class="fas fa-check"></i></div>';
let crossIcon = '<div class="cross icon"><i class="fas fa-times"></i></div>';

function OptionSelected(answer){
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    let allOptions = option_list.children.length;
    if(userAns == correctAns){
        userScore +=1;
        console.log(userScore)
        answer.classList.add("correct")
        console.log("Answer Is Correct");
        answer.insertAdjacentHTML("beforeend", tickIcon);
    }else{
        answer.classList.add("Incorrect")
        console.log("Answer Is Wrong");
        answer.insertAdjacentHTML("beforeend", crossIcon);

        for(let i=0; i<allOptions; i++){
            if(option_list.children[i].textContent == correctAns){
                option_list.children[i].setAttribute("class", "Option correct");
                option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
            }
        }
    }
     
for(let i=0; i<allOptions; i++){
    option_list.children[i].classList.add("disabled")
}

NextBtn.style.display = "block";

}

function showResultBox(){
    RuleBox.classList.remove("activeInfo");
    Questions.classList.remove("activeQuiz");
    result_box.classList.add("activeResult"); 
    const scoreText = document.querySelector(".score_text");
    if(userScore > 3){
        let scoreTag = '<span>Congratulations 🎉🎉 You Got <p>'+userScore +'</p> Out Of <p>'+questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else if(userScore > 1){
        let scoreTag = '<span>Carry on 👍 You Got <p>'+userScore +'</p> Out Of <p>'+questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{
        scoreTag = '<span> I am Sorry You Got <p>'+userScore +'</p> Out Of <p>'+questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }

}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        TimeCount.textContent = time;
        time--;

        if(time <9){
            let addZero = TimeCount.textContent;
            TimeCount.textContent = "0" + addZero 
        }

        if(time <0){
            clearInterval(counter)
            TimeCount.textContent = "00";
        }
    }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 50);
    function timer(){
        time += 1;
        TimeLine.style.width = time + "px";
        if(time > 319){
            clearInterval(counterLine);
        }
    }
}