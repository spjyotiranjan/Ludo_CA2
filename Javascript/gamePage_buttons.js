var instruction = document.querySelector("#body")
var cancel1 = document.querySelector(".cancel-img1")
var cancel2 = document.querySelector(".cancel-img2")
var settingBtn = document.querySelector(".setting-img")
var settingPage = document.querySelector("#settings")
var instructionBtn = document.querySelector(".instruction-img")
var logo = document.querySelector(".logo")
var playNowBtn = document.querySelector("#playnow")
var input1 = document.querySelector("#player1")
var input2 = document.querySelector("#player2")
var player1 = document.querySelector("#username1")
var player2 = document.querySelector("#username2")
var UserDataPage = document.querySelector("#userData")
var onclickSound = new Audio("../Assets/Play_btn_Onclick.mp3")
var logoOnclick = new Audio("../Assets/logoOnclick.mp3")
var backgroundMusic = new Audio("../Assets/Ludo_BG_Music.mp3")

backgroundMusic.volume = 0.2
backgroundMusic.play()

settingBtn.style.display = "none"
instructionBtn.style.display = "none"
instructionBtn.addEventListener("click",()=>{
    instruction.style.display = "flex"
    instructionBtn.style.display = "none"
    settingBtn.style.display = "none"
})
settingBtn.addEventListener("click",()=>{
    settingPage.style.display = "flex"
    instructionBtn.style.display = "none"
    settingBtn.style.display = "none"
})
cancel1.addEventListener("click",()=>{
    instructionBtn.style.display = "block"
    settingBtn.style.display = "block"
    instruction.style.display = "none"
})
cancel2.addEventListener("click",()=>{
    instructionBtn.style.display = "block"
    settingBtn.style.display = "block"
    settingPage.style.display = "none"
})

logo.addEventListener("click",()=>{
    window.open("../index.html","_self")
})

playNowBtn.addEventListener("click",()=>{
    player1.innerHTML = input1.value
    player2.innerHTML = input2.value
    if (UserDataPage.style.display == "flex") {
        settingBtn.style.display = "block"
        instructionBtn.style.display = "block"
    }
    UserDataPage.style.display = "none"
    onclickSound.play()
})