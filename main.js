//Fichier qui contient les fonctions et le gameloop qui sont utilisé uniquement pour le laby du joueur humain

console.log("js loaded")

const canvas = document.getElementById('canvasLeft')
const ctx = canvas.getContext('2d')
let roadWidth = 600 / mazeArray.length
let roadHeight = 600 / mazeArray.length

let x=0; //actual start position of square in pixels
let y=roadWidth;
let colNum= 0;
let rowNum= 1;
let countSteps=0;


function draw(x,y){
    ctx.fillStyle = '#F9DC5C'
    ctx.fillRect(x,y,roadWidth,roadWidth)
}

function getExitPositionStatic(){ 
    //a modifier
    if (difficulty == 1){
        x=0
        y=0
    }
    if (difficulty == 2){
        x=0
        y=0
    }
    if (difficulty == 3){
        x=0
        y=0
    }


//to get exit position 
}
function getEnterPositionStatic(){
    //a modifier
    if (difficulty == 1){
        x=0
        y=0
    }
    if (difficulty == 2){
        x=0
        y=0
    }
    if (difficulty == 3){
        x=0
        y=0
    }


//to get position where it starts the maze
}






function update(){
    
    
    
    ctx.clearRect(0,0,canvas.width,canvas.height)
    //ctx.fillRect(x,y,100,100)
    renderMaze(ctx, mazeArray)
    draw(x,y);
    requestAnimationFrame(update)
}

update()

//for(let i = 0; i<mazeWalls.length;i++)
  //  console.log(mazeWalls[i])