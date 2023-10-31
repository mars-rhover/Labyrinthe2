//----------------------Generation du Labyrithe----------------------------------- 
let mazeDimensionsIA = [];
let canvasIA = document.getElementById('canvas_AI')
let contextIA = canvasIA.getContext('2d')
let roadWidthIA = 600 / mazeArray.length
let roadHeightIA = 600 / mazeArray.length
let imgIA = new Image();
imgIA.src="imageIA.jpg"
  
function renderMazeIA(contextIA, mazeArray) {
    for (let i = 0; i < mazeArray.length; i++) {
        for (let j = 0; j < mazeArray[i].length; j++) {
            let mazeObjectIA = { 
                x: j * roadWidthIA,
                y: i * roadHeightIA,
                width : roadWidthIA,
                height : roadHeightIA,
            }
            contextIA.beginPath();
            contextIA.rect(j * roadWidthIA, i * roadHeightIA, roadWidthIA, roadHeightIA)
            contextIA.fillStyle = mazeArray[i][j] === 0 ? 'white' : '#3581fc';
          
            contextIA.fill();
            contextIA.closePath()
          if (mazeArray[i][j]==1)
            mazeDimensionsIA.push(mazeObjectIA)
        }
    }
    
}
  
renderMazeIA(contextIA, mazeArray)
         
function drawIA(){
    // contextIA.drawImage(imgIA,xAxis,YAxis,Width,Height);
    contextIA.drawImage(imgIA,10,10,roadHeightIA,roadHeightIA);
5
    document.addEventListener('keyup',(e)=>{
        switch(e.key){
            case 'ArrowLeft': contextIA.drawImage(imgIA,20,20,roadHeightIA,roadHeightIA);
            case 'ArrowUp': contextIA.drawImage(imgIA,40,40,roadHeightIA,roadHeightIA);
            case 'ArrowDown': contextIA.drawImage(imgIA,60,60,roadHeightIA,roadHeightIA);
            case 'ArrowRight': contextIA.drawImage(imgIA,80,80,roadHeightIA,roadHeightIA);
        }
    });
    
    

    
    
}
function rectIntersect() {
    // Check x and y for overlap
    let isColliding=false;
    console.log(imgIA.x)
    let y2 = imgIA.y
    let w2 = imgIA.width
    let h2 = imgIA.height
    //console.log(x2,y2,w2,h2) 

    for (let i =0; i<mazeDimensionsIA;i++){
        let x1 = mazeDimensionsIA[i].x
        let y1 = mazeDimensionsIA[i].y
        let w1 = mazeDimensionsIA[i].width
        let h1 = mazeDimensionsIA[i].height
        //console.log(x1,y1,w1,h1) 
        if (x1 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2){
            isColliding=true;
        }
        else
        isColliding=false;
    }
    //console.log(isColliding) 
}
      

//------------------------GAMELOOPS-----------------------------
function gameLoopIA(timeStamp){ 
    drawIA();
    rectIntersect();

    window.requestAnimationFrame(gameLoopIA);
}
//Initialisation du gameloop
window.requestAnimationFrame(gameLoopIA);

           