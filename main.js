//Fichier qui contient les fonctions et le gameloop qui sont utilisé uniquement pour le laby du joueur humain

console.log("js loaded")

const canvas = document.getElementById('canvasLeft')
const ctx = canvas.getContext('2d')

let mazeArray = [];

const form = document.getElementById("formLabyrinthe").addEventListener("submit", formSubmit);


let endGame=false;

let mazeHumain;
let mazeIA;
let secondesHumain=0;

let roadHeight = 0; //Height of rectangle
let roadWidth = 0; ////Width of rectangle

let y = 0; //Starting x position of the rectangle
let x = 0;//Starting y position of the rectangle
let countSteps = 0;
let colNum= 0;
let rowNum= 1;
let endPositionX = 0;
let endPositionY = 0;
let inputUsername=0;
let inputDifficulty=0;

function formSubmit(event) {



    const inputs = document.getElementById("formLabyrinthe").elements;
     inputUsername = inputs[0].value;
     inputDifficulty = inputs[1].value;
  

    mazeDifficulty(inputDifficulty);

    event.preventDefault();

    roadWidth = 600 / mazeArray.length
    roadHeight = 600 / mazeArray.length
    y = roadWidth;
    x = 0; //actual start position of square in pixels

    endPositionX = 600 - roadWidth;
    endPositionY = 600 - (2 * roadWidth);
  
    countSteps = 0;

    colNum= 0;
    rowNum= 1;


    updateIA()
    update();

}

function mazeDifficulty(inputDifficulty) {
    if (inputDifficulty === "1") {
        mazeArray = mazeArray10
    } else if (inputDifficulty === "2") {
        mazeArray = mazeArray30
    } else if (inputDifficulty === "3") {
        mazeArray = mazeArray51
    }
}


function draw(x, y, endPositionX, endPositionY) {
    ctx.fillStyle = '#F9DC5C'
    ctx.fillRect(x, y, roadWidth, roadWidth)
    ctx.fillRect(endPositionX, endPositionY, roadWidth, roadWidth)
}


function updateTimerHumain() {
    document.getElementById('timerHumain').innerHTML = secondesHumain++ + "ms";
  }

function update() {
    if ((inputDifficulty==='3' && colNum===50 )|| (inputDifficulty==='2' && colNum===29) || (inputDifficulty==='1' && colNum===9)) {
        endGame=true;
    }else{
        updateTimerHumain() 
        endGame=false;
    }
    console.log(endGame)
   
    
  
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    renderMazeHumain(ctx, mazeArray)
    draw(x, y, endPositionX, endPositionY);
    requestAnimationFrame(update)
}

