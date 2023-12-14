let mazeWalls=[];


let wallImage = new Image();
wallImage.src = 'handpaintedwall2.png';



function renderMaze(ctx, mazeArray) {
  for (let i = 0; i < mazeArray.length; i++) {
    for (let j = 0; j < mazeArray[i].length; j++) {
      let wall = {};
      ctx.beginPath();
      ctx.rect(j * roadWidth, i * roadHeight, roadWidth, roadHeight);

      if (mazeArray[i][j] === 0) {
        ctx.fillStyle = 'white';
        ctx.fill();
      } else {
        ctx.drawImage(wallImage, j * roadWidth, i * roadHeight, roadWidth, roadHeight);
      }

      ctx.closePath();

      if (mazeArray[i][j] == 1) {
        wall.xcol = i;
        wall.ycol = j;
        wall.startXPos = j * roadWidth;
        wall.startYPos = i * roadWidth;
        mazeWalls.push(wall);
      }
    }
  }
}

// Call renderMazeHumain and renderMazeIA with renderMaze
function renderMazeHumain(ctx, mazeArray) {
  renderMaze(ctx, mazeArray);
}

function renderMazeIA(ctx, mazeArray) {
  renderMaze(ctx, mazeArray);
}


