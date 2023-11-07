// variables

var instructionBtn = document.querySelector(".instruction-img")
var speakerOffBtn = document.querySelector(".speakerOff-img")
var speakerOnBtn = document.querySelector(".speakerOn-img")
var speaker = document.querySelector(".speaker")
var bgAudio = document.querySelector("#bg-audio")
var playBtn = document.querySelector(".button")
var onclickSound = new Audio("./Assets/Play_btn_Onclick.mp3")
var logo = document.querySelector(".logo")

var instruction = document.getElementById("body")
var cancel = document.querySelector(".cancel-img")

// Audio control 
function backgroundAudio() {
    bgAudio.volume = 0.5
    bgAudio.play()
}
backgroundAudio()



let speakerState = true







// scripting buttons

instructionBtn.addEventListener("click",()=>{
    instruction.style.display = "flex"
    instructionBtn.style.display = "none"
    speakerOnBtn.style.display = "none"
})
cancel.addEventListener("click",()=>{
    instructionBtn.style.display = "block"
    instruction.style.display = "none"
    speakerOnBtn.style.display = "block"
})

playBtn.addEventListener("click",()=>{
    onclickSound.play()
    setTimeout(()=>{
        window.open("./instruction.html","_self")
    },1000)
})
logo.addEventListener("click",()=>{
    window.open("./index.html","_self")
})



