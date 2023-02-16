const options = document.querySelector(".gameStartSelect");
const startBtn = document.querySelector(".gameStart");
const leiras = document.querySelector("#leiras");
let nevCimke = document.querySelector(".hiddenAtStart");
let board = document.querySelector(".gameArea");
let nevInput = document.querySelector(".userName")
let selectedBoard;
let valaszto = document.querySelector("#valaszto");
let pushed = false;
let ingame = false;
let gameWon = false;
let visszaBtn = document.querySelector(".vissza");
let mentesBtn = document.querySelector(".mentes");
let victoryCimke = document.querySelector(".victory");
let prevGames = document.querySelector(".leaderBoard")
let jatekosNev;
let gameStats = document.querySelector(".gameStats")
let page = 0;
let sortedStats=[]
let buttonLeft=document.querySelector(".leftbtn")
let buttonRight=document.querySelector(".rightbtn")
let timeDiv=document.querySelector(".ido");
let time=0;
let timerOn=false;
let timerId;
let recentGames=document.querySelector(".recentGames")
let elozoGames=document.querySelector(".elozoGames")
let gameType;

//data
LoadAtStart();
loadRecentGames();

let easy = [
    { i: 0, j: 3, x: 1 },
    { i: 1, j: 1, x: 0 },
    { i: 1, j: 5, x: 2 },
    { i: 3, j: 0, x: -1 },
    { i: 3, j: 3, x: -1 },
    { i: 3, j: 6, x: -1 },
    { i: 5, j: 1, x: -1 },
    { i: 5, j: 5, x: 2 },
    { i: 6, j: 3, x: 3 }



]

let intermediate =
    [
        { i: 0, j: 2, x: 0 },
        { i: 0, j: 4, x: -1 },
        { i: 2, j: 0, x: -1 },
        { i: 2, j: 2, x: -1 },
        { i: 2, j: 4, x: 3 },
        { i: 2, j: 6, x: -1 },
        { i: 3, j: 3, x: 1 },
        { i: 4, j: 0, x: 2 },
        { i: 4, j: 2, x: -1 },
        { i: 4, j: 4, x: -1 },
        { i: 4, j: 6, x: -1 },
        { i: 6, j: 2, x: -1 },
        { i: 6, j: 4, x: 2 }

    ]

let extreme =
    [
        { i: 0, j: 1, x: -1 },
        { i: 1, j: 5, x: 3 },
        { i: 1, j: 7, x: 2 },
        { i: 1, j: 9, x: -1 },
        { i: 2, j: 1, x: 0 },
        { i: 2, j: 2, x: -1 },
        { i: 2, j: 7, x: -1 },
        { i: 3, j: 4, x: -1 },
        { i: 4, j: 1, x: 1 },
        { i: 4, j: 4, x: -1 },
        { i: 4, j: 5, x: 1 },
        { i: 4, j: 6, x: -1 },
        { i: 5, j: 3, x: -1 },
        { i: 5, j: 4, x: -1 },
        { i: 5, j: 5, x: -1 },
        { i: 6, j: 5, x: -1 },
        { i: 7, j: 2, x: 1 },
        { i: 8, j: 0, x: 3 },
        { i: 8, j: 2, x: -1 },
        { i: 8, j: 4, x: 0 },
        { i: 9, j: 8, x: 0 }







    ]




visszaBtn.style.visibility = "hidden";
mentesBtn.style.visibility = "hidden";

gameStats.addEventListener("click",function (e)
{
if(e.target.classList.contains("gameToLoad"))
{



  
    elozoGames.style.display="none";
    timeDiv.style.display="block";
    leiras.style.display = "none";
    prevGames.style.visibility = "hidden";
    startBtn.innerHTML = "Új játék";
    nevCimke.style.display = "block"
    visszaBtn.style.visibility = "visible";
    mentesBtn.style.visibility = "visible";
    gameWon = false;


    board.style.visibility="visible";
    
   
    Object.entries(localStorage).forEach(element => {
        if(parseInt(element[0].split(';')[1])===parseInt(e.target.dataset.numbering))
        {
            
            drawBoard(parseInt(element[0].split(';')[3]));
            console.log(element[0].split(';')[3]);
            board.innerHTML=element[1];
            time=e.target.dataset.time;
     
             nevCimke.innerHTML=`Jelenlegi játékos:${(e.target.innerHTML.split(',')[0]).split(':')[1]}`
        }



    });










    timeDiv.innerHTML="";
    if(!(timerId===undefined))
    {
        clearInterval(timerId);
    }
  
	timeDiv.innerHTML+="0:0";
    
	 timerId = setInterval(function() {
		time=parseInt(time)+1;
        let minutes = Math.floor(time / 60);
        let seconds = time - minutes * 60;
        timeDiv.innerHTML=`${minutes}:${seconds}`
	}, 1000);



}
})



buttonRight.addEventListener("click",function(e)
{
   
    
    if(Math.floor(localStorage.length/4)>page)
    {
        page+=1;
        
    }
    LoadAtStart()
   
    
})

buttonLeft.addEventListener("click",function (e)
{
    if(!(page===0))
    {
        page-=1;
    }
    LoadAtStart()
})




startBtn.addEventListener("click", function (e) {
    timeDiv.innerHTML="";
    if(!(timerId===undefined))
    {
        clearInterval(timerId);
    }
    elozoGames.style.display="none";
  
	timeDiv.innerHTML+="0:0";
    time=0;
	 timerId = setInterval(function() {
		time=parseInt(time)+1;
        let minutes = Math.floor(time / 60);
        let seconds = time - minutes * 60;
        timeDiv.innerHTML=`${minutes}:${seconds}`
	}, 1000);
  

    timeDiv.style.display="block";
    leiras.style.display = "none";
    prevGames.style.visibility = "hidden";
    startBtn.innerHTML = "Új játék";
    nevCimke.style.display = "block"
    visszaBtn.style.visibility = "visible";
    mentesBtn.style.visibility = "visible";
    gameWon = false;



    if (!(nevInput.value === undefined)) {
        jatekosNev = nevInput.value;
        nevCimke.innerHTML = `Jelenlegi játékos: ${nevInput.value}`;
    }
    victoryCimke.innerHTML = ""
    victoryCimke.style.visibility = "hidden";

    board.style.visibility = "visible"
    board.innerHTML = "";
    switch (options.selectedIndex) {
        case 0:
            drawBoard(7);
            drawWalls(easy);
            gameType="könnyű";

            break;

        case 1:
            drawBoard(7);
            drawWalls(intermediate);
            gameType="haladó";

            break;

        case 2:
            drawBoard(10);
            drawWalls(extreme);
            gameType="extrém";
            break;
        default:
            break;
    }

})

function LoadAtStart() {
    gameStats.innerHTML = "";
    let dataArray = [];

    let counter = page*4;
   
    Object.entries(localStorage).forEach(element => {
        if(element[0].split(';')[4]==="save")
        {
            let tempobj = { name:element[0].split(';')[0], numbering:element[0].split(';')[1],timeC:element[0].split(';')[2],sizeOfBoard:element[0].split(';')[3] }
            dataArray.push(tempobj);
        }
       



    });

 sorted= dataArray.sort(function (a, b) {
       return( parseInt(a.numbering) - parseInt(b.numbering));
    }).slice(0);

sorted.forEach(element => {
    
     if(parseInt(element.numbering)>=counter && element.numbering<parseInt(page*4)+4)
   {    
    counter++;
    let minutes = Math.floor(element.timeC / 60);
    let seconds = element.timeC - minutes * 60;
        gameStats.innerHTML+=`<div class="gameToLoad"   data-time=${element.timeC} data-sizeOfBoard="${element.sizeOfBoard}"  data-numbering="${element.numbering}">Név: ${element.name}, Idő:${minutes}:${seconds}</div>`
   }
   
    });


    
      
}






visszaBtn.addEventListener("click", visszaF)
function visszaF() {
    board.innerHTML = "";
    board.style.visibility = "hidden";
    leiras.style.display = "block";
    visszaBtn.style.visibility = "hidden";
    prevGames.style.visibility = "visible"
    nevCimke.style.display = "none";
    mentesBtn.style.visibility = "hidden";
    timeDiv.style.display="none";
    elozoGames.style.display="block";
    victoryCimke.style.visibility="hidden"


}



function drawBoard(size) {
    board.dataset.size = size;
    board.style.display = "visible";
    board.style.gridTemplateColumns = "";
    for (let index = 0; index < size; index++) {
        board.style.gridTemplateColumns += " 70px";

    }

    board.style.gridTemplateRows = "";
    for (let index = 0; index < size; index++) {
        board.style.gridTemplateRows += " 70px";
        for (let j = 0; j < size; j++) {




            board.innerHTML += `<div data-row="${index}" data-col="${j}" data-light="0" class="boardElement"></div>`

        }



    }






}


function drawWalls(valueSet) {

    valueSet.forEach(element => {
        let temp1 = board.querySelector(`[data-row="${element.i}"][data-col="${element.j}"]`)
        temp1.classList.add("wall");
        temp1.Atti


        if (element.x > -1) {
            temp1.innerHTML = element.x;
        }
        else {
            temp1.innerHTML = "";
        }
    });
}

board.addEventListener("click", function (e) {

    if (!(gameWon) && !(pushed) && e.target.classList.contains("boardElement") && !(e.target.classList.contains("wall"))) {

        if (!(e.target.classList.contains("bulb"))) {
            e.target.classList.add("bulb")
            pushed = true;

            lightUp(e.target.dataset.col, e.target.dataset.row)
            checkWalls();
            checkBulbPlacement();


        }
        else {

            //remove light

            removeLight(e.target.dataset.col, e.target.dataset.row)

            e.target.classList.remove("bulb");
            checkWalls();
            detectWrongBulbs();

        }

    }


})



function isEverythingLit() {
    let temp = Array.from(board.querySelectorAll("div")).filter(x => !(x.classList.contains("wall")));
    if (temp.every(x => x.dataset.light > 0)) {

        return true;
    }
    return false


}


function checkWalls() {
    let temp = Array.from(board.querySelectorAll("div")).filter(x => (x.classList.contains("wall"))).filter(t => !(t.innerHTML === ""));
    let final = [];
    temp.forEach(element => {
        let wallsurrounded = [];


        if (!(null === board.querySelector(`[data-row="${parseInt(element.dataset.row) + 1}"][data-col="${element.dataset.col}"]`))) {
            wallsurrounded.push(board.querySelector(`[data-row="${parseInt(element.dataset.row) + 1}"][data-col="${element.dataset.col}"]`));
        }
        if (!(null === board.querySelector(`[data-row="${parseInt(element.dataset.row) - 1}"][data-col="${element.dataset.col}"]`))) {
            wallsurrounded.push(board.querySelector(`[data-row="${parseInt(element.dataset.row) - 1}"][data-col="${element.dataset.col}"]`));
        }
        if (!(null === board.querySelector(`[data-row="${element.dataset.row}"][data-col="${parseInt(element.dataset.col) + 1}"]`))) {
            wallsurrounded.push(board.querySelector(`[data-row="${element.dataset.row}"][data-col="${parseInt(element.dataset.col) + 1}"]`));

        }
        if (!(null === board.querySelector(`[data-row="${element.dataset.row}"][data-col="${parseInt(element.dataset.col) - 1}"]`))) {
            wallsurrounded.push(board.querySelector(`[data-row="${element.dataset.row}"][data-col="${parseInt(element.dataset.col) - 1}"]`));
        }


        if (parseInt(element.innerHTML) === (wallsurrounded.filter(x => x.classList.contains('bulb'))).length) {
            element.style.backgroundColor = "green";
            final.push(true)
        }
        else {
            element.style.backgroundColor = "black";
            final.push(false);

        }
    });

    if (final.every(x => x === true)) {
        return true;
    }
    else {
        return false;
    }




}

function checkBulbPlacement() {
    let bulbs = Array.from(board.querySelectorAll(".bulb"));



    if (bulbs.every(x => parseInt(x.dataset.light) === 1)) {
        return true;
    }
    else {
        return false;
    }

}


function lightUp(col, row) {



    let bulbPlacement = board.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    bulbPlacement.classList.add("lit");
    bulbPlacement.dataset.light = parseInt(bulbPlacement.dataset.light) + 1;
    let tempAR = Array.from(board.querySelectorAll(`[data-row="${row}"]`));
    let colB = parseInt(bulbPlacement.dataset.col) - 1;

    let temp = tempAR.find(x => parseInt(x.dataset.col) === parseInt(colB));
    let ar1 = [];
    let ar2 = [];
    let ar3 = [];
    let ar4 = [];


    if (!(temp === undefined) && !(tempAR.find(x => parseInt(x.dataset.col) === parseInt(colB)).classList.contains("wall"))) {
        do {


            temp.dataset.light = parseInt(temp.dataset.light) + 1;
            ar1.push(temp);

            colB = parseInt(colB - 1);
            temp = tempAR.find(x => parseInt(x.dataset.col) === parseInt(colB));
        }
        while (parseInt(colB) >= 0 && !(temp.classList.contains("wall")) && !(temp === undefined))
    }

    colB = parseInt(bulbPlacement.dataset.col) + 1;
    temp = tempAR.find(x => parseInt(x.dataset.col) === parseInt(colB))
    if (!(temp === undefined) && !(tempAR.find(x => parseInt(x.dataset.col) === parseInt(colB)).classList.contains("wall"))) {
        do {


            temp.dataset.light = parseInt(temp.dataset.light) + 1;
            ar2.push(temp)
            colB = parseInt(colB + 1);
            temp = tempAR.find(x => parseInt(x.dataset.col) === parseInt(colB));
        } while (parseInt(colB) < parseInt(board.dataset.size) && !(temp.classList.contains("wall")) && !(temp === undefined))
    }
    tempAR = Array.from(board.querySelectorAll(`[data-col="${col}"]`));
    let rowB = parseInt(bulbPlacement.dataset.row) - 1;
    temp = tempAR.find(x => parseInt(x.dataset.row) === parseInt(rowB));
    if (!(temp === undefined) && !(tempAR.find((x => parseInt(x.dataset.row) === parseInt(rowB))).classList.contains("wall"))) {

        do {

            temp.dataset.light = parseInt(temp.dataset.light) + 1;

            ar3.push(temp);
            rowB = parseInt(rowB) - 1;
            temp = tempAR.find(x => parseInt(x.dataset.row) === parseInt(rowB));
        } while (parseInt(rowB) >= 0 && !(temp.classList.contains("wall")) && !(temp === undefined))
    }
    rowB = parseInt(bulbPlacement.dataset.row) + 1;
    temp = tempAR.find(x => parseInt(x.dataset.row) === parseInt(rowB));
    if (!(temp === undefined) && !(tempAR.find((x => parseInt(x.dataset.row) === parseInt(rowB))).classList.contains("wall"))) {

        do {

            temp.dataset.light = parseInt(temp.dataset.light) + 1;

            ar4.push(temp);
            rowB = parseInt(rowB + 1);
            temp = tempAR.find(x => parseInt(x.dataset.row) === parseInt(rowB));
        } while (parseInt(rowB) < parseInt(board.dataset.size) && !(temp.classList.contains("wall")) && !(temp === undefined))

    }

    let max = Math.max(ar1.length, ar2.length, ar3.length, ar4.length);

    let index = 0;
    let i = setInterval(() => {

        detectWrongBulbs();
        if (!(ar1[index] === undefined)) {
            ar1[index].classList.add("lit");

        }
        if (!(ar2[index] === undefined)) {
            ar2[index].classList.add("lit");

        }

        if (!(ar3[index] === undefined)) {
            ar3[index].classList.add("lit");

        }

        if (!(ar4[index] === undefined)) {
            ar4[index].classList.add("lit");

        }
        if (index >= max) {

            pushed = false;

            checkWalls();
            if (isEverythingLit() && checkWalls() && checkBulbPlacement()) {
                victoryCimke.innerHTML = `Megnyerted a játékot:${jatekosNev}!`
                victoryCimke.style.visibility = "visible";
                let boardTiles = board.querySelectorAll(".boardElement");
                saveGameToLocalStorage(false);
                loadRecentGames();
                gameWon = true;
                
                
            }

            clearInterval(i);
        }
        index++;
    }, 100)

}

function loadRecentGames()
{

    recentGames.innerHTML = "";
    let dataArray = [];

    let counter = page*4;
   
    Object.entries(localStorage).forEach(element => {
        if(element[0].split(';')[4]==="nosave")
        {
            let tempobj = { name:element[0].split(';')[0], numbering:element[0].split(';')[1],timeC:element[0].split(';')[2],sizeOfBoard:element[0].split(';')[3],boardName:element[0].split(';')[5] }
            dataArray.push(tempobj);
        }
       



    });

 sorted= dataArray.sort(function (a, b) {
       return( parseInt(a.numbering) - parseInt(b.numbering));
    }).slice(0);

sorted.forEach(element => {
    
     if(parseInt(element.numbering)>=counter && element.numbering<parseInt(page*4)+4)
   {    
    counter++;
    let minutes = Math.floor(element.timeC / 60);
    let seconds = element.timeC - minutes * 60;
        recentGames.innerHTML+=`<div   data-time=${element.timeC} data-sizeOfBoard="${element.sizeOfBoard}"  data-numbering="${element.numbering}">Név: ${element.name}, Idő:${minutes}:${seconds},Pálya neve:${element.boardName}</div>`
   }
   
    });


    
}

function saveGameToLocalStorage(mentesBool) {
    if(mentesBool)
    { 
        let llength = localStorage.length;
        localStorage.setItem(`${jatekosNev};${llength};${time};${Math.sqrt(Array.from(board.querySelectorAll(".boardElement")).length)};save;${gameType}`, board.innerHTML);

    }
    else
    {
        let llength = localStorage.length;
        localStorage.setItem(`${jatekosNev};${llength};${time};${Math.sqrt(Array.from(board.querySelectorAll(".boardElement")).length)};nosave;${gameType}`, board.innerHTML)
    }
    
 
 

    LoadAtStart();




}








mentesBtn.addEventListener("click", saveGameToLocalStorage);




function removeLight(col, row) {

    let bulbPlacement = board.querySelector(`[data-row="${row}"][data-col="${col}"]`);

    bulbPlacement.dataset.light = parseInt(bulbPlacement.dataset.light) - 1;
    if (bulbPlacement.dataset.light < 1) {
        bulbPlacement.classList.remove("lit");
    }
    bulbPlacement.classList.remove("wrongBulb")
    let tempAR = Array.from(board.querySelectorAll(`[data-row="${row}"]`));
    let colB = parseInt(bulbPlacement.dataset.col) - 1;

    let temp = tempAR.find(x => parseInt(x.dataset.col) === parseInt(colB));


    if (!(temp === undefined) && !(tempAR.find(x => parseInt(x.dataset.col) === parseInt(colB)).classList.contains("wall"))) {
        do {


            temp.dataset.light = parseInt(temp.dataset.light) - 1;
            if (parseInt(temp.dataset.light) < 1) {
                temp.classList.remove("lit");

            }


            colB = parseInt(colB - 1);
            temp = tempAR.find(x => parseInt(x.dataset.col) === parseInt(colB));
        }
        while (parseInt(colB) >= 0 && !(temp.classList.contains("wall")) && !(temp === undefined))
    }

    colB = parseInt(bulbPlacement.dataset.col) + 1;
    temp = tempAR.find(x => parseInt(x.dataset.col) === parseInt(colB))
    if (!(temp === undefined) && !(tempAR.find(x => parseInt(x.dataset.col) === parseInt(colB)).classList.contains("wall"))) {
        do {


            temp.dataset.light = parseInt(temp.dataset.light) - 1;

            if (parseInt(temp.dataset.light) < 1) {
                temp.classList.remove("lit");
            }

            colB = parseInt(colB + 1);
            temp = tempAR.find(x => parseInt(x.dataset.col) === parseInt(colB));
        } while (parseInt(colB) < parseInt(board.dataset.size) && !(temp.classList.contains("wall")) && !(temp === undefined))
    }
    tempAR = Array.from(board.querySelectorAll(`[data-col="${col}"]`));
    let rowB = parseInt(bulbPlacement.dataset.row) - 1;
    temp = tempAR.find(x => parseInt(x.dataset.row) === parseInt(rowB));
    if (!(temp === undefined) && !(tempAR.find((x => parseInt(x.dataset.row) === parseInt(rowB))).classList.contains("wall"))) {

        do {

            temp.dataset.light = parseInt(temp.dataset.light) - 1;
            if (parseInt(temp.dataset.light) < 1) {
                temp.classList.remove("lit");
            }

            rowB = parseInt(rowB) - 1;
            temp = tempAR.find(x => parseInt(x.dataset.row) === parseInt(rowB));
        } while (parseInt(rowB) >= 0 && !(temp.classList.contains("wall")) && !(temp === undefined))
    }
    rowB = parseInt(bulbPlacement.dataset.row) + 1;
    temp = tempAR.find(x => parseInt(x.dataset.row) === parseInt(rowB));
    if (!(temp === undefined) && !(tempAR.find((x => parseInt(x.dataset.row) === parseInt(rowB))).classList.contains("wall"))) {

        do {

            temp.dataset.light = parseInt(temp.dataset.light) - 1;
            if (parseInt(temp.dataset.light) < 1) {
                temp.classList.remove("lit");
            }

            rowB = parseInt(rowB + 1);
            temp = tempAR.find(x => parseInt(x.dataset.row) === parseInt(rowB));
        } while (parseInt(rowB) < parseInt(board.dataset.size) && !(temp.classList.contains("wall")) && !(temp === undefined))

    }
    checkWalls();



}

function detectWrongBulbs() {


    let all = document.querySelectorAll(".boardElement");



    all.forEach(element => {
        if (element.classList.contains("bulb") && parseInt(element.dataset.light) > 1) {
            element.classList.add("wrongBulb");
        }
        else {
            element.classList.remove("wrongBulb");
        }


    });

}


