let gameSeq=[];
let userSeq=[];

let btns=["yellow","red","purple","green"];

let started=false;
let level=0;

let h2=document.querySelector("h2");

//Agar document user koi bhi key press karega to game start kardo.
document.addEventListener("keypress",function()
{    //Game ko ek hi baar Start karna hai.
    if(started==false)
    {  
        console.log("Game Started!!");
        started=true;
    }

    //Sart hone ke baad levelup karna hai.
    levelUp();
});

function btnFlash(btn)
{
    //Pehle class add kro.
    btn.classList.add("flash");
    //Kuch samay ke baad wo class remove kardo so that purana color wapas ajaye.
    setTimeout(function(){
        btn.classList.remove("flash")
    },250);   //250 means 1/4 second badd class remove kardo.
}

function userFlash(btn)
{
    //Pehle class add kro.
    btn.classList.add("userflash");
    //Kuch samay ke baad wo class remove kardo so that purana color wapas ajaye.
    setTimeout(function(){
        btn.classList.remove("userflash")
    },250);   //250 means 1/4 second badd class remove kardo.
}

function levelUp()
{   //Jaise ki levelup function call hoga to userSqq empty ho jana chahiye so that user suru se value dale.
    userSeq=[];
    level++;
    //We need to change level in he so.
    h2.innerText=`Level ${level}`;

    //Now Game will flash one color randomly from his size.
    //so for that i have to choose random number b/w 0 to 3.
    let randIdx=Math.floor(Math.random()*3);
    //Now fron btns i have to choose that color and usko flash karwado.
    let randColor=btns[randIdx];
    //Uss class ko select karo in document.
    let randBtn=document.querySelector(`.${randColor}`);
    //gameseq mai jo button game show krra usko dalte jao.
    gameSeq.push(randColor);
    console.log(gameSeq);
    btnFlash(randBtn);
}

//Function to check whether user enter correct seq or not.
function checkAns(idx)
{   
    if(userSeq[idx]==gameSeq[idx])
    {
        if(userSeq.length==gameSeq.length)
        {
            setTimeout(levelUp,1000);
        }
    }
    else
    {
        h2.innerHTML=`Game Over! Your Score was <b>${level}</b> <br> Press any key to Start`;
        //Suppose i wants to make whole body as red if answer is wrong then.
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function()
       {
        document.querySelector("body").style.backgroundColor="white";
       },150);
        //if game gets over then again i have to start but befor
        //that i have to reset all values.
        reset();
    }
}

function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}


//Button press by user.
function btnpress() 
{
    //Koun sa button press hua usko store karlo.
    let btn=this;
    //When user click the button should flash.
    userFlash(btn);

    //User ne jo button press kiya usko store karo.
    userColor=btn.getAttribute("id"); //As id is same as that of olor name.
    userSeq.push(userColor);
    //Ab mereko check karna hai ki user ne jo last value daali hai wo sahi seq pe hai ki nhi.
    checkAns(userSeq.length-1);
}

let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns)
{
    btn.addEventListener("click",btnpress);
}
