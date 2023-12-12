let mazeWalls=[];






function renderMazeHumain(ctx, mazeArray) {
  for (let i = 0; i < mazeArray.length; i++) {
    for (let j = 0; j < mazeArray[i].length; j++) {

      let wall = {}
      ctx.beginPath();
      ctx.rect(j * roadWidth, i * roadHeight, roadWidth, roadHeight)
      ctx.fillStyle = mazeArray[i][j] === 0 ? 'white' : '#3581fc';
      ctx.fill();
      ctx.closePath()

      //Array to store position of walls 
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

function renderMazeIA(ctx, mazeArray) {
  for (let i = 0; i < mazeArray.length; i++) {
    for (let j = 0; j < mazeArray[i].length; j++) {

      let wall = {}
      ctx.beginPath();
      ctx.rect(j * roadWidth, i * roadHeight, roadWidth, roadHeight)
      ctx.fillStyle = mazeArray[i][j] === 0 ? 'white' : '#3581fc';
      ctx.fill();
      ctx.closePath()

      //Array to store position of walls 
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

