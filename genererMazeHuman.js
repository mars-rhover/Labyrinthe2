//----------------------Generation du Labyrithe----------------------------------- 
let mazeDimensionsHuman = [];       
let canvas = document.getElementById('canvasH')
let context = canvas.getContext('2d')
let roadWidth = 600 / mazeArray.length
let roadHeight = 600 / mazeArray.length
       
  
function renderMaze(context, mazeArray) {
    for (let i = 0; i < mazeArray.length; i++) {
        for (let j = 0; j < mazeArray[i].length; j++) {
            //rect(x, y, width, height)
            //x, y co-ordinates of rectangles starting point
            //with, height of rectangle
            //
            let mazeObject = { 
                x: j * roadWidth,
                y: i * roadHeight,
                width : roadWidth,
                height : roadHeight,
            }
            context.beginPath();
            context.rect(j * roadWidth, i * roadHeight, roadWidth, roadHeight)
            context.fillStyle = mazeArray[i][j] === 0 ? 'white' : '#3581fc';
            context.fill();
            context.closePath()
            if (mazeArray[i][j]==1)
                mazeDimensionsHuman.push(mazeObject)
        }
    }
   
}
renderMaze(context, mazeArray)
        

//You create an image object that will be rendered into the canvas.
//An html Image Tag would just add a static html image under the laby

function draw(){
 let imgH = new Image();
 imgH.src="sprite.jpg"
 context.drawImage(imgH,roadWidth,roadWidth,roadWidth,roadWidth);
}

//------------------------GAMELOOPS-----------------------------

function intersect(x1, y1, w1, h1, x2, y2, w2, h2) {
    // Check x and y for overlap
    mazeDimensionsIA.x
    mazeDimensionsIA.y
    mazeDimensionsIA.width
    mazeDimensionsIA.height

    if (x2 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2){
        return false;
    }
    return true;
}

function gameLoopHuman(timeStamp){
    
    draw();
    window.requestAnimationFrame(gameLoopHuman);
}
//Initialisation du gameloop
window.requestAnimationFrame(gameLoopHuman);




           