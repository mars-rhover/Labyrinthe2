console.log("js loaded")

const canvas = document.getElementById('canvasLeft')
const ctx = canvas.getContext('2d')
let roadWidth = 600 / mazeArray.length
let roadHeight = 600 / mazeArray.length

let x=0;
let y=0;
let vx= 5;
let vy= 5;

function draw(x,y){
    ctx.fillStyle = '#F9DC5C'
    ctx.fillRect(x,y,roadWidth,roadWidth)
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