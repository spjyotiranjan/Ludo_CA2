// variables

var instructionBtn = document.querySelector(".instruction-img")
var speakerOffBtn = document.querySelector(".speakerOn-img")
var speakerOnBtn = document.querySelector(".speakerOff-img")
var speaker = document.querySelector(".speaker")
// var bgAudio = document.querySelector("#bg-audio")
var playBtn = document.querySelector(".button")
var onclickSound = new Audio("./Assets/Play_btn_Onclick.mp3")
var logoOnclick = new Audio("./Assets/logoOnclick.mp3")
var logo = document.querySelector(".logo")

var instruction = document.getElementById("body")
var cancel = document.querySelector(".cancel-img")

// Audio control 

    let backgroundMusic = document.querySelector("#bg-audio")
    backgroundMusic.play()
    backgroundMusic.loop = true;




let speakerState = true






// scripting buttons

speakerOffBtn.addEventListener("click",()=>{
    backgroundMusic.volume = 0
    onclickSound.volume = 0
    logoOnclick.volume = 0
    speakerOffBtn.style.display = "none"
    speakerOnBtn.style.display = "block"
})
speakerOnBtn.addEventListener("click",()=>{
    backgroundMusic.volume = 1
    onclickSound.volume = 1
    logoOnclick.volume = 1
    speakerOffBtn.style.display = "block"
    speakerOnBtn.style.display = "none"
})
instructionBtn.addEventListener("click",()=>{
    instruction.style.display = "flex"
    instructionBtn.style.display = "none"
    speaker.style.display = "none"
})
cancel.addEventListener("click",()=>{
    instructionBtn.style.display = "block"
    instruction.style.display = "none"
    speaker.style.display = "block"
    // speakerOnBtn.style.display = "none"
    speakerOffBtn.style.display = "block"
})

playBtn.addEventListener("click",()=>{
    onclickSound.play()
    setTimeout(()=>{
        window.open("./HTML/instruction.html","_self")
    },1000)
})
logo.addEventListener("click",()=>{
    logoOnclick.play()
    window.open("./index.html","_self")
})



