console.log("jsRIGHT loaded")

const canvasIA = document.getElementById('canvasRight')
const ctxIA = canvasIA.getContext('2d')



let xIA = 0;
let yIA = 1;
let vxIA = 5;
let vyIA = 5;
let solutionPath = [];
let dfs = false;
let bfs = false;
let astar = false;
let dikstra = false;
let greedy=false;
let visitedX = 0;
let visitedY = 0;
let timeBFS = 0;
let timeDFS = 0;
let timeAStar = 0;
let timeDijkstra = 0;
let timerGreedy=0;
const visitedXY = new Set();





//Handling the maze and coordinates

function getExitPosition(inputDifficulty) {
    let exit = {};
    if (inputDifficulty === '2') {

        exit = { x: 29, y: 28 };
    }
    else if (inputDifficulty === '1') {
        exit = { x: 9, y: 8 };
    } else if (inputDifficulty === '3') {
        exit = { x: 50, y: 49 };
    }
    return exit;
}

function getEnterPosition() {
    return { x: 0, y: 1 };
}

function isWall(x, y) {
    for (let i = 0; i < mazeWalls.length; i++) {
        const wall = mazeWalls[i];
        // Logic for collision handling
        if (
            x >= wall.x &&
            x < wall.x + roadWidth &&
            y >= wall.y &&
            y < wall.y + roadHeight
        ) {
            return true; // Collision detected
        }
    }
    return false; // No collision
}


//---------------------------------------------------------------------------------------------



// painting and updating maze

function drawIA(xIA, yIA) {

    ctx.fillStyle = '#F9DC5C'
    ctxIA.fillRect(x * roadWidth, y * roadHeight, roadWidth, roadHeight);
}

function tracePath(path) {
    console.log("TRACING PATH");
    for (let i = 0; i < path.length; i++) {
        const { x, y } = path[i];
        drawIA(x, y);
    }
}

function drawSolutionPath(path) {
    let index = 0;

    console.log("DRAWING SOLUTION PATH", path);

    function drawNext() {
        if (index < path.length) {
            const { x, y } = path[index];

            // Définir la couleur en fonction de l'algorithme utilisé
            if (dfs) {
                ctxIA.fillStyle = 'red';
            } else if (bfs) {
                ctxIA.fillStyle = 'black';
            } else if (astar) {
                ctxIA.fillStyle = 'green';
            } else if (dikstra) {
                ctxIA.fillStyle = 'yellow';
            }
            else if (greedy) {
                ctxIA.fillStyle = 'blue';
            }

            // Dessiner le nœud
            ctxIA.fillRect(x * roadWidth, y * roadHeight, roadWidth, roadHeight);
            
            index++;
            setTimeout(drawNext, 50); // Ajuster le délai ici
        }
    }

    drawNext();
}

function parcourirSet(set) {
    let index = 0;

    function drawNext() {
        if (index < set.length) {
            const [x, y] = set[index].split('-');
            ctxIA.fillRect(x * roadWidth, y * roadHeight, roadWidth, roadHeight);
            visitedXY.add(set[index]);
            index++;
            setTimeout(() => {
                ctxIA.clearRect(0, 0, canvasIA.width, canvasIA.height);
                renderMazeIA(ctxIA, mazeArray);
                drawVisitedCells();
            }, 500);
            setTimeout(drawNext, 500);
        }
    }

    drawNext();
}
function drawVisitedCells(callback) {
    ctxIA.fillStyle = '#F9DC5C';
    let index = 0;

    function drawNext() {
        if (index < visitedXY.size) {
            const cell = Array.from(visitedXY)[index];
            const [x, y] = cell.split('-');
            ctxIA.fillRect(x * roadWidth, y * roadWidth, roadWidth, roadWidth);
            index++;
            setTimeout(drawNext, 10);
        } else {
            if (callback) {
                callback();
            }
        }
    }

    drawNext();
}

function updateIA() {
    console.log("exit x = " + getExitPosition(inputDifficulty).x);
    console.log("exit y = " + getExitPosition(inputDifficulty).y);

    ctxIA.clearRect(0, 0, canvasIA.width, canvasIA.height);
    renderMazeIA(ctxIA, mazeArray); // Redraw the maze

    // Draw visited cells and then draw the solution path
    drawVisitedCells(() => {
        console.log("Drawing solution");
        drawSolutionPath(solutionPath);
    });
}

//---------------------------------------------------------------------------------------------

// ALL FOUR AI ALGORITHMS

function solveMazeBFS() {
    console.log("STARTING BFS");
    const queue = [{ x: getEnterPosition().x, y: getEnterPosition().y, path: [] }];


    const visited = new Set();
    const startTime = performance.now();
    while (queue.length > 0) {

        const current = queue.shift();
        const { x, y, path } = current;

        // Check if reached the exit
        // Check if reached the exit
        if (x === getExitPosition(inputDifficulty).x && y === getExitPosition(inputDifficulty).y) {
            console.log("end BFS");
            const endTime = performance.now(); // Record the end time when the solution is found
            const elapsedTime = endTime - startTime;
            return { path: path, time: elapsedTime };
        }


        // Check if the current cell has been visited
        if (!visited.has(`${x}-${y}`) && !isWall(x * roadWidth, y * roadHeight)) {
            console.log("ADDING ", `${x}-${y}`);

            visited.add(`${x}-${y}`);
            visitedXY.add(`${x}-${y}`);




            // Check adjacent cells (up, down, left, right)
            const directions = [
                { dx: 0, dy: -1 }, // up
                { dx: 0, dy: 1 }, // down
                { dx: -1, dy: 0 }, // left
                { dx: 1, dy: 0 }, // right
            ];

            for (const dir of directions) {
                const nextX = x + dir.dx;
                const nextY = y + dir.dy;

                // Check if the next cell is within bounds
                if (
                    nextX >= 0 &&
                    nextX < mazeArray[0].length &&
                    nextY >= 0 &&
                    nextY < mazeArray.length &&
                    mazeArray[nextY][nextX] === 0 &&
                    !visited.has(`${nextX}-${nextY}`)
                ) {
                    queue.push({
                        x: nextX,
                        y: nextY,
                        path: path.concat({ x: nextX, y: nextY }),
                    });
                }
            }
        }
    }

    // No solution found
    return { path: [], time: 0 };
}


function solveMazeDFS() {
    console.log("STARTING DFS");
    const stack = [{ x: getEnterPosition().x, y: getEnterPosition().y, path: [] }];
    const visited = new Set();
    const startTime = performance.now();
    while (stack.length > 0) {
        const current = stack.pop();
        const { x, y, path } = current;

        // Check if reached the exit
        if (x === getExitPosition(inputDifficulty).x && y === getExitPosition(inputDifficulty).y) {
            const endTime = performance.now(); // Record the end time when the solution is found
            const elapsedTime = endTime - startTime;
            return { path: path, time: elapsedTime };
        }

        // Check if the current cell has been visited
        if (!visited.has(`${x}-${y}`) && !isWall(x * roadWidth, y * roadHeight)) {
            visited.add(`${x}-${y}`);
            visitedXY.add(`${x}-${y}`);

            // Check adjacent cells (up, down, left, right)
            const directions = [
                { dx: 0, dy: -1 }, // up
                { dx: 0, dy: 1 }, // down
                { dx: -1, dy: 0 }, // left
                { dx: 1, dy: 0 }, // right
            ];

            for (const dir of directions) {
                const nextX = x + dir.dx;
                const nextY = y + dir.dy;

                // Check if the next cell is within bounds
                if (
                    nextX >= 0 &&
                    nextX < mazeArray[0].length &&
                    nextY >= 0 &&
                    nextY < mazeArray.length &&
                    mazeArray[nextY][nextX] === 0 &&
                    !visited.has(`${nextX}-${nextY}`)
                ) {
                    stack.push({
                        x: nextX,
                        y: nextY,
                        path: path.concat({ x: nextX, y: nextY }),
                    });
                }
            }
        }
    }

    // No solution found
    return { path: [], time: 0 };
}

function solveMazeAStar() {
    console.log("STARTING A*");
    const openSet = [{ x: getEnterPosition().x, y: getEnterPosition().y, path: [], f: 0 }];
    const closedSet = new Set();
    const startTime = performance.now();
    while (openSet.length > 0) {
        openSet.sort((a, b) => a.f - b.f); 
        const current = openSet.shift();
        const { x, y, path } = current;

        // Check if reached the exit
        if (x === getExitPosition(inputDifficulty).x && y === getExitPosition(inputDifficulty).y) {
            const endTime = performance.now(); // Record the end time when the solution is found
            const elapsedTime = endTime - startTime;
            return { path: path, time: elapsedTime };
        }

        const currentPos = `${x}-${y}`;
        if (!closedSet.has(currentPos) && !isWall(x * roadWidth, y * roadHeight)) {
            closedSet.add(currentPos);
            visitedXY.add(`${x}-${y}`);

            // Check adjacent cells (up, down, left, right)
            const directions = [
                { dx: 0, dy: -1 }, // up
                { dx: 0, dy: 1 }, // down
                { dx: -1, dy: 0 }, // left
                { dx: 1, dy: 0 }, // right
            ];

            for (const dir of directions) {
                const nextX = x + dir.dx;
                const nextY = y + dir.dy;

                // Check if the next cell is within bounds
                if (
                    nextX >= 0 &&
                    nextX < mazeArray[0].length &&
                    nextY >= 0 &&
                    nextY < mazeArray.length &&
                    mazeArray[nextY][nextX] === 0
                ) {
                    const g = path.length + 1; // Update the cost function (g value)
                    const h = heuristic(nextX, nextY); // Calculate heuristic value
                    const f = g + h; // Calculate f value (f = g + h)
                    openSet.push({
                        x: nextX,
                        y: nextY,
                        path: path.concat({ x: nextX, y: nextY }),
                        f: f,
                    });
                }
            }
        }
    }

    // No solution found
    return { path: [], time: 0 };
}

function solveMazeDijkstra() {
    console.log("STARTING Dijkstra's Algorithm");
    const minHeap = new MinHeap();
    minHeap.insert({ x: getEnterPosition().x, y: getEnterPosition().y, path: [], cost: 0 });
    const visited = new Set();
    const startTime = performance.now();
    while (!minHeap.isEmpty()) {
        const current = minHeap.extractMin();
        const { x, y, path, cost } = current;

        // Check if reached the exit
        if (x === getExitPosition(inputDifficulty).x && y === getExitPosition(inputDifficulty).y) {
            const endTime = performance.now(); // Record the end time when the solution is found
            const elapsedTime = endTime - startTime;
            return { path: path, time: elapsedTime };
        }

        const currentPos = `${x}-${y}`;
        if (!visited.has(currentPos) && !isWall(x * roadWidth, y * roadHeight)) {
            visited.add(currentPos);
            visitedXY.add(currentPos);

            // Check adjacent cells (up, down, left, right)
            const directions = [
                { dx: 0, dy: -1 }, // up
                { dx: 0, dy: 1 }, // down
                { dx: -1, dy: 0 }, // left
                { dx: 1, dy: 0 }, // right
            ];

            for (const dir of directions) {
                const nextX = x + dir.dx;
                const nextY = y + dir.dy;

                // Check if the next cell is within bounds
                if (
                    nextX >= 0 &&
                    nextX < mazeArray[0].length &&
                    nextY >= 0 &&
                    nextY < mazeArray.length &&
                    mazeArray[nextY][nextX] === 0
                ) {
                    const g = cost + 1; // Update the cost function (g value)
                    minHeap.insert({
                        x: nextX,
                        y: nextY,
                        path: path.concat({ x: nextX, y: nextY }),
                        cost: g,
                    });
                }
            }
        }
    }

    // No solution found
    return { path: [], time: 0 };
}
class MinHeap {
    constructor() {
        this.heap = [];
    }

    insert(node) {
        this.heap.push(node);
        this.bubbleUp();
    }

    extractMin() {
        if (this.isEmpty()) {
            return null;
        }
        const min = this.heap[0];
        const end = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = end;
            this.sinkDown();
        }
        return min;
    }

    bubbleUp() {
        let currentIndex = this.heap.length - 1;
        while (currentIndex > 0) {
            const parentIndex = Math.floor((currentIndex - 1) / 2);
            if (this.heap[parentIndex].cost <= this.heap[currentIndex].cost) {
                break;
            }
            [this.heap[parentIndex], this.heap[currentIndex]] = [this.heap[currentIndex], this.heap[parentIndex]];
            currentIndex = parentIndex;
        }
    }

    sinkDown() {
        let currentIndex = 0;
        const length = this.heap.length;
        while (true) {
            const leftChildIndex = 2 * currentIndex + 1;
            const rightChildIndex = 2 * currentIndex + 2;
            let swapIndex = null;

            if (leftChildIndex < length) {
                if (this.heap[leftChildIndex].cost < this.heap[currentIndex].cost) {
                    swapIndex = leftChildIndex;
                }
            }

            if (rightChildIndex < length) {
                if (
                    (swapIndex === null && this.heap[rightChildIndex].cost < this.heap[currentIndex].cost) ||
                    (swapIndex !== null && this.heap[rightChildIndex].cost < this.heap[leftChildIndex].cost)
                ) {
                    swapIndex = rightChildIndex;
                }
            }

            if (swapIndex === null) {
                break;
            }

            [this.heap[currentIndex], this.heap[swapIndex]] = [this.heap[swapIndex], this.heap[currentIndex]];
            currentIndex = swapIndex;
        }
    }

    isEmpty() {
        return this.heap.length === 0;
    }
}

function heuristic(x, y) {
   
    const dx = Math.abs(x - getExitPosition(inputDifficulty).x);
    const dy = Math.abs(y - getExitPosition(inputDifficulty).y);
    return dx + dy;
}

function solveMazeGreedyBestFirst() {
    console.log("STARTING Greedy Best-First Search");
    const openSet = [{ x: getEnterPosition().x, y: getEnterPosition().y, path: [] }];
    const closedSet = new Set();
    const startTime = performance.now();

    while (openSet.length > 0) {
        // trier l'ensemble ouvert en fonction de la distance heuristique à la sortie
        openSet.sort((a, b) => heuristic(a.x, a.y) - heuristic(b.x, b.y));

        const current = openSet.shift();
        const { x, y, path } = current;

        // Vérifier si on a atteint la sortie
        if (x === getExitPosition(inputDifficulty).x && y === getExitPosition(inputDifficulty).y) {
            const endTime = performance.now();
            const elapsedTime = endTime - startTime;
            console.log('Solution Path:', path);
            return { path: path, time: elapsedTime };
        }

        const currentPos = `${x}-${y}`;
        if (!closedSet.has(currentPos) && !isWall(x * roadWidth, y * roadHeight)) {
            closedSet.add(currentPos);
            visitedXY.add(currentPos);

            const directions = [
                { dx: 0, dy: -1 },
                { dx: 0, dy: 1 }, 
                { dx: -1, dy: 0 }, 
                { dx: 1, dy: 0 }  
            ];

            for (const dir of directions) {
                const nextX = x + dir.dx;
                const nextY = y + dir.dy;
                
                if (
                    nextX >= 0 &&
                    nextX < mazeArray[0].length &&
                    nextY >= 0 &&
                    nextY < mazeArray.length &&
                    mazeArray[nextY][nextX] === 0 &&
                    !closedSet.has(`${nextX}-${nextY}`)
                ) {
                    openSet.push({
                        x: nextX,
                        y: nextY,
                        path: path.concat({ x: nextX, y: nextY })
                    });
                }
            }
        }
    }

    return { path: [], time: 0 };
}


//---------------------------------------------------------------------------------------------
// DOM Buttons linked to the HTML that you made (Rohini)

// Calls DFS
const startButtonDFS = document.getElementById('startButtonDFS');
startButtonDFS.addEventListener('click', () => {

    dfs = true;
    dikstra = false;
    astar = false;
    bfs = false;
    greedy=false;
    visitedXY.clear();
    solutionPath = [];
    const { path, time } = solveMazeDFS();
    console.log('Solution Path:', path);
    solutionPath = path;
    document.getElementById('timerDFS').textContent = time + "ms";

    updateIA(); // Render DFS solution on the canvas

});


// Calls BFS
const startButtonIA = document.getElementById('startButtonIA');

startButtonIA.addEventListener('click', () => {
    bfs = true;
    dfs = false;
    dikstra = false;
    astar = false;
    greedy=false;
    visitedXY.clear();
    solutionPath = [];
    // Solve the maze using BFS and get the solution path and time
    const { path, time } = solveMazeBFS();
    console.log('Solution Path:', path);
    solutionPath = path;
    document.getElementById('timerBFS').textContent = time + "ms";
    console.log('Time taken:', time.toFixed(3), 'milliseconds'); // Log the time taken

    // Stop the BFS timer

    updateIA(); // Render the solution path
});



// Calls A* 
const startButtonAStar = document.getElementById('startButtonAStar');

startButtonAStar.addEventListener('click', () => {

    astar = true;
    dikstra = false;
    bfs = false;
    dfs = false;
    greedy=false;
    visitedXY.clear();
    solutionPath = [];
    const { path, time } = solveMazeAStar();
    console.log('Solution Path:', path);
    solutionPath = path;
    document.getElementById('timerAStar').textContent = time + " ms";

    updateIA(); // Render A* search solution on the canvas

});


// Calls Dijkstra
const startButtonDijkstra = document.getElementById('startButtonDijkstra');

startButtonDijkstra.addEventListener('click', () => {

    dikstra = true;
    astar = false;
    bfs = false;
    dfs = false;
    greedy=false;
    visitedXY.clear();
    solutionPath = [];
    const { path, time } = solveMazeDijkstra();
    console.log('Solution Path:', path);
    solutionPath = path;
    document.getElementById('timerDijkstra').textContent = time + " ms";
    updateIA();
});

// pour greedy
const startButtonGreedyBFS = document.getElementById('startButtonGreedyBFS');
startButtonGreedyBFS.addEventListener('click', () => {
    dfs = false; bfs = false; astar = false; dikstra = false; greedy = true;
    visitedXY.clear();
    solutionPath = [];

    const { path, time } = solveMazeGreedyBestFirst();
    solutionPath = path;

    console.log('Solution Path pour greedy:', path);
    document.getElementById('timerGreedy').textContent = time + "ms";
    updateIA();
});
