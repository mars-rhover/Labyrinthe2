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
    } else if (inputDifficulty === "auto") {
      let width = 15;  
      let height = 15;
      mazeArray = generateMaze(width, height);
  }
}

function generateMaze(width, height) {
  let maze;
  let pathExists = false;

  while (!pathExists) {
      // Initialiser le labyrinthe avec des murs
      maze = Array(height).fill().map(() => Array(width).fill(1));

      function carve(x, y) {
          const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
          maze[y][x] = 0;

          shuffleArray(directions);

          for (let [dx, dy] of directions) {
              const newX = x + dx * 2, newY = y + dy * 2;
              if (newX >= 0 && newY >= 0 && newX < width && newY < height && maze[newY][newX] === 1) {
                  maze[y + dy][x + dx] = 0;
                  carve(newX, newY);
              }
          }
      }

      // Mélanger un tableau
      function shuffleArray(array) {
          for (let i = array.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [array[i], array[j]] = [array[j], array[i]];
          }
      }

      carve(1, 1); // Commencez à partir de la position (1,1)

      // Définir les points d'entrée et de sortie comme des espaces vides APRES la sculpture
      maze[1][0] = 0; // Point d'entrée
      maze[height - 2][width - 1] = 0; // Point de sortie

      // Vérifier si un chemin existe entre l'entrée et la sortie
      pathExists = checkPathExists(maze, {x: 1, y: 1}, {x: width - 2, y: height - 2});
  }

  return maze;
}


function checkPathExists(maze, start, end) {
  let rows = maze.length;
  let cols = maze[0].length;
  let visited = Array.from(Array(rows), () => new Array(cols).fill(false));
  let queue = [];

  // Directions: haut, bas, gauche, droite
  let dRow = [-1, 1, 0, 0];
  let dCol = [0, 0, -1, 1];

  // Marquer le point de départ comme visité et l'ajouter à la queue
  visited[start.y][start.x] = true;
  queue.push(start);

  while (queue.length > 0) {
      let current = queue.shift();

      // Si le point de sortie est atteint
      if (current.x === end.x && current.y === end.y) {
          return true;
      }

      // Explorer les directions adjacentes
      for (let i = 0; i < 4; i++) {
          let adjRow = current.y + dRow[i];
          let adjCol = current.x + dCol[i];

          // Vérifier la validité, si non visité et pas un mur
          if (isValid(adjRow, adjCol, rows, cols) && maze[adjRow][adjCol] === 0 && !visited[adjRow][adjCol]) {
              visited[adjRow][adjCol] = true;
              queue.push({ x: adjCol, y: adjRow });
          }
      }
  }

  return false;
}

function isValid(row, col, rows, cols) {
  return row >= 0 && row < rows && col >= 0 && col < cols;
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
   if ((inputDifficulty === '3' && colNum === 50) || 
    (inputDifficulty === '2' && colNum === 29) || 
    (inputDifficulty === '1' && colNum === 9) || (inputDifficulty === 'auto' && colNum === 14)) {
    endGame = true;
    showWinnerModal();
} else {
    updateTimerHumain();
    endGame = false;
}
   
    
  
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    renderMazeHumain(ctx, mazeArray)
    draw(x, y, endPositionX, endPositionY);
    requestAnimationFrame(update)
}

// Get the modal
var modal = document.getElementById("winnerModal");

// Get the buttons
var continueButton = document.getElementById("continueButton");
var homeButton = document.getElementById("homeButton");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal


// When the user clicks on "Continue", close the modal
continueButton.onclick = function() {
    window.location.href = 'Myindex.html';
}

// When the user clicks on "Home", redirect to index.html
homeButton.onclick = function() {
  window.location.href = 'index.html';
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Function to show the modal
function showWinnerModal() {
  modal.style.display = "flex";
}
