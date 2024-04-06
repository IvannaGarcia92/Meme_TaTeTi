document.addEventListener("DOMContentLoaded", function () {
    const board = document.getElementById("board");
    const cells = [];
    let currentPlayer = 1;
    let gameOver = false;

    // Crear las celdas del tablero
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener("click", handleCellClick);
            cells.push(cell);
            board.appendChild(cell);
        }
    }

    // Función para manejar el clic en una celda
    function handleCellClick() {
        if (gameOver) return;

        const row = this.dataset.row;
        const col = this.dataset.col;

        // Verificar si la celda está vacía
        if (isEmptyCell(row, col)) {
            // Colocar la imagen del jugador actual en la celda
            const currentPlayerImage = document.getElementById(`player${currentPlayer}`).querySelector("img");
            this.appendChild(currentPlayerImage.cloneNode());

            // Cambiar al siguiente jugador
            currentPlayer = 3 - currentPlayer; // Alternar entre jugador 1 y jugador 2

            // Verificar si hay empate después de cambiar de jugador
            if (checkDraw()) {
                gameOver = true;
                setTimeout(displayDraw, 0); // Mostrar la alerta de empate después de la actualización de la interfaz
            } else if (checkWin()) {
                // Verificar si el jugador actual ha ganado
                gameOver = true;
                setTimeout(displayWinner, 0); // Mostrar la alerta de victoria después de la actualización de la interfaz
            }
        }
    }


    // Función para verificar si una celda está vacía
    function isEmptyCell(row, col) {
        return !cells.some(cell => cell.dataset.row === row && cell.dataset.col === col && cell.children.length > 0);
    }

// Función para verificar si alguien ha ganado
function checkWin() {
    const winPatterns = [
        // Horizontales
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        // Verticales
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        // Diagonales
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        const cellA = cells[a];
        const cellB = cells[b];
        const cellC = cells[c];

        if (
            cellA.children.length > 0 &&
            cellB.children.length > 0 &&
            cellC.children.length > 0 &&
            cellA.children[0].src === cellB.children[0].src &&
            cellB.children[0].src === cellC.children[0].src
        ) {
            return true;
        }
    }

    return false;
}


    // Función para verificar si hay empate
    function checkDraw() {
        return cells.every(cell => cell.children.length > 0);
    }

    function displayWinner() {
        const winnerImage = document.getElementById(`player${currentPlayer}`).querySelector("img");
        Swal.fire({
            title: `¡Jugador ${currentPlayer} ha ganado!`,
            icon: 'success',
            confirmButtonText: 'OK'
        }).then((result) => {
            resetGame();
        });
    }

    // Función para mostrar empate
    function displayDraw() {
        Swal.fire({
            title: '¡Empate!',
            icon: 'info',
            confirmButtonText: 'OK'
        }).then((result) => {
            resetGame();
        });
    }
    
    /*
    // Función para mostrar al ganador
    function displayWinner() {
        const winnerImage = document.getElementById(`player${currentPlayer}`).querySelector("img");
        alert(`¡Jugador ${currentPlayer} ha ganado!`); //reemplazar alert por modal
        //reemplazar Jugador 1 o Jugador 2 por la imagen asignada para el ganador. Mostrar la img del lado del ganador
        //mostrar del lado del perdedor la imagen relacionada al perdedor, banana cry o apple cry, segun corresponda
        resetGame();
    }

    // Función para mostrar empate
    function displayDraw() {
        alert("¡Empate!"); //reemplazar alert por modal
        resetGame();
    }

    */ 

    // Función para reiniciar el juego
    function resetGame() {
        cells.forEach(cell => {
            cell.innerHTML = '';
        });
        currentPlayer = 1;
        gameOver = false;
    }
});
