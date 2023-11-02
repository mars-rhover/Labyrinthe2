//fichier qui contient les fonctionalitées utilisé par le laby de l'IA
console.log("jsRIGHT loaded")

const canvasIA = document.getElementById('canvasRight')
const ctxIA = canvasIA.getContext('2d')
//let roadWidth = 600 / mazeArray.length
//let roadHeight = 600 / mazeArray.length

let xIA=0;
let yIA=0;
let vxIA= 5;
let vyIA= 5;

function drawIA(x,y){
    ctxIA.fillStyle = '#F9DC5C'
    ctxIA.fillRect(x,y,roadWidth,roadWidth)
    console.log(x,y)
}

function getExitPosition(){
//to get exit position 
}
function getEnterPosition(){
//to get position where it starts the maze
}
function isWall(){
    for(let i = 0; i<mazeWalls.length;i++){
    //logic for the collision 
       // if(x>=mazeWalls.x ||y )
    
}}



function updateIA(){
    ctxIA.clearRect(0,0,canvasIA.width,canvasIA.height)
    //ctxIA.fillRect(x,y,100,100)
    renderMaze(ctxIA, mazeArray)
    drawIA(x,y);
    requestAnimationFrame(updateIA)
}

updateIA()
//for(let i = 0; i<mazeWalls.length;i++)
  //  console.log(mazeWalls[i])