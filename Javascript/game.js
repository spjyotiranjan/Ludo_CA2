
var instruction = document.querySelector("#body")
var cancel2 = document.querySelector(".cancel-img2")
var settingBtn = document.querySelector(".setting-img")
var settingPage = document.querySelector("#settings")
var instructionBtn = document.querySelector(".instruction-img")
var moveSound = new Audio("../Assets/pawnMove.mp3")
var rollSound = new Audio("../Assets/diceClick.mp3")
var UserDataPage = document.querySelector("#userData")
var player1 = document.querySelector("#username1")
var player2 = document.querySelector("#username2")
moveSound.volume = 0.1
const COORDINATES_MAP = {
    0: [6, 13],
    1: [6, 12],
    2: [6, 11],
    3: [6, 10],
    4: [6, 9],
    5: [5, 8],
    6: [4, 8],
    7: [3, 8],
    8: [2, 8],
    9: [1, 8],
    10: [0, 8],
    11: [0, 7],
    12: [0, 6],
    13: [1, 6],
    14: [2, 6],
    15: [3, 6],
    16: [4, 6],
    17: [5, 6],
    18: [6, 5],
    19: [6, 4],
    20: [6, 3],
    21: [6, 2],
    22: [6, 1],
    23: [6, 0],
    24: [7, 0],
    25: [8, 0],
    26: [8, 1],
    27: [8, 2],
    28: [8, 3],
    29: [8, 4],
    30: [8, 5],
    31: [9, 6],
    32: [10, 6],
    33: [11, 6],
    34: [12, 6],
    35: [13, 6],
    36: [14, 6],
    37: [14, 7],
    38: [14, 8],
    39: [13, 8],
    40: [12, 8],
    41: [11, 8],
    42: [10, 8],
    43: [9, 8],
    44: [8, 9],
    45: [8, 10],
    46: [8, 11],
    47: [8, 12],
    48: [8, 13],
    49: [8, 14],
    50: [7, 14],
    51: [6, 14],

    // HOME ENTRANCE

    // P1
    100: [7, 13],
    101: [7, 12],
    102: [7, 11],
    103: [7, 10],
    104: [7, 9],
    105: [7, 8],

    // P2
    200: [7, 1],
    201: [7, 2],
    202: [7, 3],
    203: [7, 4],
    204: [7, 5],
    205: [7, 6],

    // BASE POSITIONS

    // P1
    500: [1.5, 10.58],
    501: [3.57, 10.58],
    502: [1.5, 12.8],
    503: [3.57, 12.8],

    // P2
    600: [10.5, 1.58],
    601: [12.54, 1.58],
    602: [10.5, 3.8],
    603: [12.54, 3.8],
};

const STEP_LENGTH = 6.66;

const PLAYERS = ['P1', 'P2'];

const BASE_POSITIONS = {
    P1: [500, 501, 502, 503],
    P2: [600, 601, 602, 603],
}

const START_POSITIONS = {
    P1: 0,
    P2: 26
}

const HOME_ENTRANCE = {
    P1: [100, 101, 102, 103, 104],
    P2: [200, 201, 202, 203, 204]
}

const HOME_POSITIONS = {
    P1: 105,
    P2: 205
}

const TURNING_POINTS = {
    P1: 50,
    P2: 24
}

const SAFE_POSITIONS = [0, 8, 13, 21, 26, 34, 39, 47];

const STATE = {
    DICE_NOT_ROLLED: 'DICE_NOT_ROLLED',
    DICE_ROLLED: 'DICE_ROLLED',
}
var dice = document.querySelector("#dice")
const diceButtonElement = document.querySelector('#dice-btn');
const playerPiecesElements = {
    P1: document.querySelectorAll('[player-no="P1"].player-piece'),
    P2: document.querySelectorAll('[player-no="P2"].player-piece'),
}


class DOM {
    
    static listenDiceClick(callback) {
        diceButtonElement.addEventListener('click', callback);
    }

    static listenResetClick(callback) {
        document.querySelector('#settingbtn-restart').addEventListener('click', callback)
        
    }

    static listenPieceClick(callback) {
        document.querySelector('.playerPieces').addEventListener('click', callback)
    }

    /**
     * 
     * @param {string} player 
     * @param {Number} piece 
     * @param {Number} newPosition 
     */
    static setPiecePosition(player, piece, newPosition) {
        if(!playerPiecesElements[player] || !playerPiecesElements[player][piece]) {
            console.error(`Player element of given player: ${player} and piece: ${piece} not found`)
            return;
        }

        const [x, y] = COORDINATES_MAP[newPosition];

        const pieceElement = playerPiecesElements[player][piece];
        pieceElement.style.top = y * STEP_LENGTH + 1 + '%';
        pieceElement.style.left = x * STEP_LENGTH + 1 + '%';
    }

    static setTurn(index) {
        if(index < 0 || index >= PLAYERS.length) {
            console.error('index out of bound!');
            return;
        }
        
        const player = PLAYERS[index];

        // Display player ID
        var playerBtn = document.getElementsByClassName("playerbtn")
        if (index==0) {
            playerBtn[1].classList.remove("highlight-btn")
            playerBtn[0].classList.add("highlight-btn")
            diceButtonElement.style.backgroundColor = "rgba(2, 165, 246, 0.6)"
            // diceButtonElement.style.backgroundImage = "linear-gradient(to bottom right,rgba(2, 165, 246, 0.5),rgba(255, 255, 255, 0.2))"
        } else {
            playerBtn[0].classList.remove("highlight-btn")
            playerBtn[1].classList.add("highlight-btn")
            diceButtonElement.style.backgroundColor = "rgba(2, 147, 41, 0.6)"
            // diceButtonElement.style.backgroundImage = "linear-gradient(to bottom right,rgba(2, 147, 41, 0.5),rgba(255, 255, 255, 0.2))"
        }
        
    }

    static enableDice() {
        diceButtonElement.removeAttribute('disabled');
    }

    static disableDice() {
        diceButtonElement.setAttribute('disabled', '');
    }

    static highlightPieces(player, pieces) {
        pieces.forEach(piece => {
            const pieceElement = playerPiecesElements[player][piece];
            pieceElement.classList.add('highlight');
        })
    }

    static unhighlightPieces() {
        document.querySelectorAll('.player-piece.highlight').forEach(ele => {
            ele.classList.remove('highlight');
        })
    }

    static setDiceValue(value) {
        document.querySelector('#dice').innerHTML = `<img class="dice-content" src="../Assets/Dice Option/${value}.png" alt="">`;
    }
}




// Ludo Class starts here 

class Ludo {
    currentPositions = {
        P1: [],
        P2: []
    }

    _diceValue;
    get diceValue() {
        return this._diceValue;
    }
    set diceValue(value) {
        this._diceValue = value;

        DOM.setDiceValue(value);
    }

    _turn;
    get turn() {
        return this._turn;
    }
    set turn(value) {
        this._turn = value;
        DOM.setTurn(value);
    }

    _state;
    get state() {
        return this._state;
    }
    set state(value) {
        this._state = value;

        if(value === STATE.DICE_NOT_ROLLED) {
            DOM.enableDice();
            DOM.unhighlightPieces();
        } else {
            DOM.disableDice();
        }
    }

    constructor() {
        console.log('Hello World! Lets play Ludo!');

        // this.diceValue = 4;
        // this.turn = 0;
        // this.state = STATE.DICE_ROLLED;
        this.listenDiceClick();
        this.listenResetClick();
        this.listenPieceClick();

        this.resetGame();
        // this.setPiecePosition('P1', 0, 0);
        // this.setPiecePosition('P2', 0, 1);
        // this.diceValue = 6;
        // console.log(this.getEligiblePieces('P1'))
        
    }

    listenDiceClick() {
        DOM.listenDiceClick(this.onDiceClick.bind(this))
    }

    onDiceClick() {
        console.log('dice clicked!');
        rollSound.play()
        this.diceValue = 1 + Math.floor(Math.random() * 6);
        this.state = STATE.DICE_ROLLED;
        
        this.checkForEligiblePieces();
    }

    checkForEligiblePieces() {
        const player = PLAYERS[this.turn];
        // eligible pieces of given player
        const eligiblePieces = this.getEligiblePieces(player);
        if(eligiblePieces.length) {
            // highlight the pieces
            DOM.highlightPieces(player, eligiblePieces);
        } else {
            this.incrementTurn();
        }
    }

    incrementTurn() {
        this.turn = this.turn === 0 ? 1 : 0;
        this.state = STATE.DICE_NOT_ROLLED;
    }

    getEligiblePieces(player) {
        return [0, 1, 2, 3].filter(piece => {
            const currentPosition = this.currentPositions[player][piece];

            if(currentPosition === HOME_POSITIONS[player]) {
                return false;
            }

            if(
                BASE_POSITIONS[player].includes(currentPosition)
                && this.diceValue !== 6
            ){
                return false;
            }

            if(
                HOME_ENTRANCE[player].includes(currentPosition)
                && this.diceValue > HOME_POSITIONS[player] - currentPosition
                ) {
                return false;
            }

            return true;
        });
    }

    listenResetClick() {
        DOM.listenResetClick(this.resetGame.bind(this))
        
    }

    resetGame() {
        console.log('reset game');
        this.currentPositions = structuredClone(BASE_POSITIONS);

        PLAYERS.forEach(player => {
            [0, 1, 2, 3].forEach(piece => {
                this.setPiecePosition(player, piece, this.currentPositions[player][piece])
            })
        });

        this.turn = 0;
        this.state = STATE.DICE_NOT_ROLLED;
        this.diceValue = 0
        UserDataPage.style.display = "flex"
        settingPage.style.display = "none"
        player1.innerHTML = ""
        player2.innerHTML = ""

    }

    listenPieceClick() {
        DOM.listenPieceClick(this.onPieceClick.bind(this));
    }

    onPieceClick(event) {
        const target = event.target;

        if(!target.classList.contains('player-piece') || !target.classList.contains('highlight')) {
            return;
        }
        console.log('piece clicked')

        const player = target.getAttribute('player-no');
        const piece = target.getAttribute('piece-index');
        this.handlePieceClick(player, piece);
    }

    handlePieceClick(player, piece) {
        console.log(player, piece);
        const currentPosition = this.currentPositions[player][piece];
        
        if(BASE_POSITIONS[player].includes(currentPosition)) {
            this.setPiecePosition(player, piece, START_POSITIONS[player]);
            this.state = STATE.DICE_NOT_ROLLED;
            return;
        }

        DOM.unhighlightPieces();
        this.movePiece(player, piece, this.diceValue);
    }

    setPiecePosition(player, piece, newPosition) {
        this.currentPositions[player][piece] = newPosition;
        DOM.setPiecePosition(player, piece, newPosition)
    }

   
    movePiece(player, piece, moveBy) {
        // this.setPiecePosition(player, piece, this.currentPositions[player][piece] + moveBy)
        const interval = setInterval(() => {
            this.incrementPiecePosition(player, piece);
            moveSound.pause()
            moveSound.currentTime = 0
            moveSound.play()
            moveBy--;
            if(moveBy === 0) {
                clearInterval(interval);

                // check if player won
                if(this.hasPlayerWon(player)) {
                    if (player=="P1") {
                        localStorage.setItem("Winner",player1.innerHTML)
                        localStorage.setItem("Color","blue")
                    } else {
                        localStorage.setItem("Winner",player2.innerHTML)
                        localStorage.setItem("Color","green")
                    }
                    window.open("../HTML/gameOver.html","_self")
                    return;
                }

                const isKill = this.checkForKill(player, piece);

                if(isKill || this.diceValue === 6) {
                    this.state = STATE.DICE_NOT_ROLLED;
                    return;
                }

                this.incrementTurn();
            }
        }, 200);
    }

    checkForKill(player, piece) {
        const currentPosition = this.currentPositions[player][piece];
        const opponent = player === 'P1' ? 'P2' : 'P1';

        let kill = false;

        [0, 1, 2, 3].forEach(piece => {
            const opponentPosition = this.currentPositions[opponent][piece];

            if(currentPosition === opponentPosition && !SAFE_POSITIONS.includes(currentPosition)) {
                this.setPiecePosition(opponent, piece, BASE_POSITIONS[opponent][piece]);
                kill = true
            }
        });

        return kill
    }

    hasPlayerWon(player) {
        return [0, 1, 2, 3].every(piece => this.currentPositions[player][piece] === HOME_POSITIONS[player])
    }

    incrementPiecePosition(player, piece) {
        this.setPiecePosition(player, piece, this.getIncrementedPosition(player, piece));
    }
    
    getIncrementedPosition(player, piece) {
        const currentPosition = this.currentPositions[player][piece];

        if(currentPosition === TURNING_POINTS[player]) {
            return HOME_ENTRANCE[player][0];
        }
        else if(currentPosition === 51) {
            return 0;
        }
        return currentPosition + 1;
    }
}

const logic = new Ludo()