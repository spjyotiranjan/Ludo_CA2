
var instruction = document.getElementById("body")
var cancel = document.querySelector(".cancel-img")
var instructionBtn = document.querySelector(".instruction-img")
var logo = document.querySelector(".logo")


instructionBtn.addEventListener("click",()=>{
    instruction.style.display = "flex"
    instructionBtn.style.display = "none"
})
cancel.addEventListener("click",()=>{
    instructionBtn.style.display = "block"
    instruction.style.display = "none"
})

logo.addEventListener("click",()=>{
    window.open("./index.html","_self")
})

const Coordinates = {
    0: [6,13],
    1: [6,12],
    2: [6,11],
    3: [6,10],
    4: [6,9],
    5: [5,8],
    6: [4,8],
    7: [3,8],
    8: [2,8],
    9: [1,8],
    10: [0,8],
    11: [0,7],
    12: [0,6],
    13: [1,6],
    14: [2,6],
    15: [3,6],
    16: [4,6],
    17: [5,6],
    18: [6,5],
    19: [6,4],
    20: [6,3],
    21: [6,2],
    22: [6,1],
    23: [6,0],
    24: [7,0],
    25: [8,0],
    26: [8,1],
    27: [8,2],
    28: [8,3],
    29: [8,4],
    30: [8,5],
    31: [9,6],
    32: [10,6],
    33: [11,6],
    34: [12,6],
    35: [13,6],
    36: [14,6],
    37: [14,7],
    38: [14,8],
    39: [13,8],
    40: [12,8],
    41: [11,8],
    42: [10,8],
    43: [9,8],
    44: [8,9],
    45: [8,10],
    46: [8,11],
    47: [8,12],
    48: [8,13],
    49: [8,14],
    50: [7,14],
    51: [6,14],

// Final Steps Position 
// Player 1
    100: [7,13],
    101: [7,12],
    102: [7,11],
    103: [7,10],
    104: [7,9],
    105: [7,8],
    
    
// Player 2
    200: [7,1],
    200: [7,2],
    200: [7,3],
    200: [7,4],
    200: [7,5],
    200: [7,6],


// Home Position
// Player 1
    500: [1.5,10.58],
    501: [3.57,10.58],
    502: [1.5,12.43],
    503: [3.57,12.43],

// Player 2
    600: [10.5,1.58],
    601: [12.54,1.58],
    602: [10.5,3.45],
    603: [12.54,3.45],
};

const StepLength = 6.66;
const Players = ['p1','p2'];
const StartPosition = {
    p1: 0,
    p2: 26,
}

const HomePosition = {
    p1: [500,501,502,503],
    p2: [600,601,602,603],
}

const FinalStepPosition = {
    p1: [100,101,102,103,104],
    p2: [200,201,202,203,204],
}

const WinningPosition = {
    p1: 105,
    p2: 205,
}

const FinalTurnPosition = {
    p1: 50,
    p2: 24,
}

const Star = [0,8,13,21,26,34,39,47];
const State = {
    Dice_Not_Rolled: "Dice_Not_Rolled",
    Dice_Rolled: "Dice_Rolled",
}



var dice = document.querySelector("#dice")
var diceBtn = document.querySelector("#dice-btn")
var playerPieces = {
    p1: document.querySelectorAll('[player-no="p1"].player-piece'),
    p2: document.querySelectorAll('[player-no="p2"].player-piece')
}
console.log(playerPieces);

// DOM Functions

class DOM  {
    static diceOnClick(funct) {
        diceBtn.addEventListener("click", funct)
    }
    static pieceOnClick(funct) {
        document.querySelector(".playerPieces").addEventListener("click", funct)
    }
    static resetOnClick(funct) {
        
    }
    
    
    
    static setPiecePosition(player,pieceIndex,newPosition) {
        const [x,y] = Coordinates[newPosition]
    
        const pieceElement = playerPieces[player][pieceIndex]
        pieceElement.style.top = y*StepLength+2+"%"
        pieceElement.style.left = x*StepLength+1+"%"
    }
    
    // setPiecePosition('p1',3,50)
    
    static setTurn(index) {
        const player = Players[index]
        var playerBtn = document.getElementsByClassName("playerbtn")
        console.log(playerBtn);
        
        if (index==0) {
            playerBtn[1].classList.remove("highlight-btn")
            playerBtn[0].classList.add("highlight-btn")
        } else {
            playerBtn[0].classList.remove("highlight-btn")
            playerBtn[1].classList.add("highlight-btn")
        }
    }
    
    // setTurn(0)
    // setTurn(1)
    
    
    static enableDice() {
        diceBtn.removeAttribute('disabled')
    }
    static disableDice() {
        diceBtn.setAttribute('disabled','')
    }
    // enableDice()
    // disableDice()
    
    static pieceHighlight(player,pieces) {
        pieces.forEach(piece => {
            const pieceElement = playerPieces[player][piece]
            pieceElement.classList.add("highlight")
        });
    }
    
    static pieceUnHighlight() {
        var allPiece = document.querySelectorAll(".player-piece.highlight")
        allPiece.forEach(element =>{
            element.classList.remove("highlight")
        })
    }
    // pieceHighlight("p1",[0])
    
    
    // setPiecePosition("p1", 0, 0)
    // setPiecePosition("p1", 1, 4)
    // setPiecePosition("p2", 1, 5)
    
    
    static setDiceValue(value) {
        dice.innerHTML = `<img class= "dice-content" src="./Assets/Dice Option/${value}.png" alt="">`
    }
}

// DOM.setDiceValue(5)
// DOM.setPiecePosition("p1",1,51)

// class Logic extends DOM {

// }

// var x = new Logic()
// console.log(x)

// x.Dice_Rolled

class Ludo {
    currentPositions = {
        p1: [],
        p2: []
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

        if(value === State.Dice_Not_Rolled) {
            DOM.enableDice();
            DOM.pieceHighlight();
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
        // this.listenResetClick();
        this.listenPieceClick();

        this.resetGame();
        // this.setPiecePosition('P1', 0, 0);
        // this.setPiecePosition('P2', 0, 1);
        // this.diceValue = 6;
        // console.log(this.getEligiblePieces('P1'))
        
    }

    listenDiceClick() {
        DOM.diceOnClick(this.onDiceClick.bind(this))
    }

    onDiceClick() {
        console.log('dice clicked!');
        this.diceValue = 1 + Math.floor(Math.random() * 6);
        this.state = State.Dice_Rolled;
        
        this.checkForEligiblePieces();
    }

    checkForEligiblePieces() {
        const player = Players[this.turn];
        // eligible pieces of given player
        const eligiblePieces = this.getEligiblePieces(player);
        console.log(this.getEligiblePieces(player));
        if(eligiblePieces.length) {
            // highlight the pieces
            DOM.pieceHighlight(player, eligiblePieces);
        } else {
            this.incrementTurn();
        }
    }

    incrementTurn() {
        this.turn = this.turn === 0 ? 1 : 0;
        this.state = State.Dice_Not_Rolled;
    }

    getEligiblePieces(player) {
        return [0, 1, 2, 3].filter(piece => {
            const currentPosition = this.currentPositions[player][piece];

            if(currentPosition === WinningPosition[player]) {
                return false;
            }

            if(
                HomePosition[player].includes(currentPosition)
                && this.diceValue !== 6
            ){
                return false;
            }

            if(
                FinalStepPosition[player].includes(currentPosition)
                && this.diceValue > WinningPosition[player] - currentPosition
                ) {
                return false;
            }

            return true;
        });
    }

    // listenResetClick() {
    //     DOM.listenResetClick(this.resetGame.bind(this))
    // }

    resetGame() {
        console.log('reset game');
        this.currentPositions = structuredClone(HomePosition);

        Players.forEach(player => {
            [0, 1, 2, 3].forEach(piece => {
                this.setPiecePosition(player, piece, this.currentPositions[player][piece])
            })
        });

        this.turn = 0;
        this.state = State.Dice_Not_Rolled;
    }

    listenPieceClick() {
        DOM.pieceOnClick(this.onPieceClick.bind(this));
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
        
        if(HomePosition[player].includes(currentPosition)) {
            this.setPiecePosition(player, piece, StartPosition[player]);
            this.state = State.Dice_Not_Rolled;
            return;
        }

        DOM.pieceUnHighlight();
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
            moveBy--;

            if(moveBy === 0) {
                clearInterval(interval);

                // check if player won
                if(this.hasPlayerWon(player)) {
                    alert(`Player: ${player} has won!`);
                    this.resetGame();
                    return;
                }

                const isKill = this.checkForKill(player, piece);

                if(isKill || this.diceValue === 6) {
                    this.state = State.Dice_Not_Rolled;
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

            if(currentPosition === opponentPosition && !Star.includes(currentPosition)) {
                this.setPiecePosition(opponent, piece, HomePosition[opponent][piece]);
                kill = true
            }
        });

        return kill
    }

    hasPlayerWon(player) {
        return [0, 1, 2, 3].every(piece => this.currentPositions[player][piece] === WinningPosition[player])
    }

    incrementPiecePosition(player, piece) {
        this.setPiecePosition(player, piece, this.getIncrementedPosition(player, piece));
    }
    
    getIncrementedPosition(player, piece) {
        const currentPosition = this.currentPositions[player][piece];

        if(currentPosition === FinalTurnPosition[player]) {
            return FinalStepPosition[player][0];
        }
        else if(currentPosition === 51) {
            return 0;
        }
        return currentPosition + 1;
    }
}

var ludo = new Ludo()