class TicTacToe {
    constructor() {
        //this.current = 'x';
        this.player1 = {};
        this.player2 = {};
        this.currentPlayerSymbol = 'x';
        this.matrix = [
            [null , null, null],
            [null , null, null],
            [null , null, null]
        ];
    }

    getCurrentPlayerSymbol() {
        return this.currentPlayerSymbol;
    }

    nextTurn(rowIndex, columnIndex) {
        if (!this.matrix[rowIndex][columnIndex]) {
            this.matrix[rowIndex][columnIndex] = this.currentPlayerSymbol;
            this.currentPlayerSymbol = this.currentPlayerSymbol === 'x' ? 'o' : 'x';
        }
    }

    isFinished() {
        let res = false;
        if (this.getWinner() || this.isDraw()) {
            res = true;
        }
        return res;
    }

    rowWinner(row, player){
        let res = false;
        if (row[0] === player && row[1] === player && row[2] === player) {
            res = true;
        }
        return res;
    }

    getWinner() {
        let winnersStrategy = [
            [[0,0],[1,0],[2,0]],
            [[0,1],[1,1],[2,1]],
            [[0,2],[1,2],[2,2]],
            [[0,0],[1,1],[2,2]],
            [[0,2],[1,1],[2,0]],
        ];

        let res = null;

        this.matrix.forEach(rows => {
            if (this.rowWinner(rows, 'x')) {
                res = 'x';
            } else if (this.rowWinner(rows, 'o')){
                res = 'o';
            }
        });

        if (!res) {
            winnersStrategy.forEach(rows => {
                if(this.matrix[rows[0][0]][rows[0][1]] === 'x' && this.matrix[rows[1][0]][rows[1][1]] === 'x' && this.matrix[rows[2][0]][rows[2][1]] === 'x'){
                    res = 'x';
                }else if(this.matrix[rows[0][0]][rows[0][1]] === 'o' && this.matrix[rows[1][0]][rows[1][1]] === 'o' && this.matrix[rows[2][0]][rows[2][1]] === 'o'){
                    res = 'o';
                }
            });
        }

        return res;
    }

    noMoreTurns() {
        let res = true;
        this.matrix.forEach(rows => {
            rows.forEach(column => {
                if(!column) {
                    res = false;
                }
            })
        });
        return res;
    }

    isDraw() {
        let res = false;
        if (this.noMoreTurns() && !this.getWinner()) {
            res = true;
        }
        return res;
    }

    getFieldValue(rowIndex, colIndex) {
        if (!this.matrix[rowIndex][colIndex]) {
            return null;
        } else {
            return this.matrix[rowIndex][colIndex];
        }
    }
}

module.exports = TicTacToe;
