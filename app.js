let gameSeq=[];
let userSeq=[];
let highest=[];

let btns=["yellow","red","purple","green"];

let started= false;
let level=0;
// let lastScore;
let h2=document.querySelector("h2");

document.addEventListener("keypress",function(){
    if(started==false){
        console.log("game is started");
        started=true;
        levelUp();
    }
});

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },500);

}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },500);

}

function levelUp(){
  userSeq=[];
  level++;
//   lastScore=level;
  h2.innerText=`Level ${level}`;
  
  let randidx=Math.floor(Math.random()*3);
  let randColor= btns[randidx];
  let randbtn=document.querySelector(`.${randColor}`);
//   console.log(randidx);
//   console.log(randColor);
//   console.log(randbtn);
  gameSeq.push(randColor);
//console.log(gameSeq);
  gameFlash(randbtn);
}


function checkAns(idx){
    // let idx=level-1;
    if(userSeq[idx]===gameSeq[idx]){
        if(userSeq.length==gameSeq.length){
           setTimeout(levelUp,1000) ;
           
        }

    }else{
        h2.innerHTML=`Game Over! Your score was <b>${level}<b><br> press any key to start`;
        highest.push(level);
        highestScore(...highest);
        // let highest=level;
        // if(lastScore>=highest){
        //    highestScore(lastScore);
        // }else{
        //     highestScore(highest);
        // }
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },200);
        reset();
    }

}

function btnPress(){
    // console.log("btn was pressed");
    // console.log(this);
    let btn=this;
    userFlash(btn);

    let userColor=btn.getAttribute("id");
    // console.log(userColor);
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}

let allBtns=document.querySelectorAll(".btn");
for(butn of allBtns){
    butn.addEventListener("click",btnPress);
}

function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;

}


function highestScore(highest){
    let newh2=document.createElement("h2");
    let body=document.querySelector("body");
    body.appendChild(newh2);
    newh2.innerHTML=`highest score is ${Math.max(highest)}`;
}
