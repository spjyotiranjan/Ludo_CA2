var logo = document.querySelector(".logo")
var playAgnBtn = document.querySelector(".playAgain-btn")
var onclickSound = new Audio("./Assets/Play_btn_Onclick.mp3")

logo.addEventListener("click",()=>{
    window.open("./index.html","_self")
})

playAgnBtn.addEventListener("click",()=>{
    onclickSound.play()
    setTimeout(()=>{
        window.open("./instruction.html","_self")
    },1000)
})
