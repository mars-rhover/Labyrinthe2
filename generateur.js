

function generateMaze(width, height) {
    // Initialiser le labyrinthe avec des murs
    let maze = Array(height).fill().map(() => Array(width).fill(1));
    
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

    carve(1, 1);  // Commencez à partir de la position (1,1)
    return maze;
}

let maze = generateMaze(51, 51);  // Taille du labyrinthe
console.log(maze);
