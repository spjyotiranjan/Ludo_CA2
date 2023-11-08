function nextPage() {
    setTimeout(()=>{window.open("../HTML/game.html","_self")},10000)
}

var loadingMusic = new Audio("../Assets/loading.mp3")
loadingMusic.play()
nextPage()