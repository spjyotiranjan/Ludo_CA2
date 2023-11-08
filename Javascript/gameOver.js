var logo = document.querySelector(".logo")
var playAgnBtn = document.querySelector(".playAgain-btn")
var onclickSound = new Audio("../Assets/Play_btn_Onclick.mp3")
var winnerSpan = document.getElementById("winner")
var winner = localStorage.getItem("Winner") + " "
var color = localStorage.getItem("Color")
var logoOnclick = new Audio("../Assets/logoOnclick.mp3")
var winningSound = new Audio("../Assets/Winning.mp3")
var video = document.getElementById("video")
video.innerHTML = `<source src="../Assets/${color}-background-video.mp4" type="video/mp4">`
console.log(winner);
winnerSpan.innerHTML = winner

winningSound.play()
logo.addEventListener("click",()=>{
    window.open("../index.html","_self")
})

playAgnBtn.addEventListener("click",()=>{
    onclickSound.play()
    setTimeout(()=>{
        window.open("../HTML/instruction.html","_self")
    },1000)
})
