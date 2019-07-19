//attempt at making pong in javascript canvas
var gameCanvas = document.getElementById('gameCanvas')
var ctx = gameCanvas.getContext('2d')
document.addEventListener("keydown", keyHandler, false)
document.addEventListener("keyup", keyupHandler, false)

var pause = 0
var boxEdge = 10
var padEdge = boxEdge+10
var padSpd = 2
var myPadX = 0+padEdge
var myPadY = gameCanvas.height/2-boxEdge*4
var bouncerX = gameCanvas.width/2
var bouncerY = gameCanvas.height/2-boxEdge*4
var bouncerSize = 20
var padLen = 15
var scorelineL = 0+padLen*5
var scorelineR = gameCanvas.width-padLen*5
var padHeight = 75
var otherPadX = gameCanvas.width-padLen-padEdge
var otherPadY = gameCanvas.height/2-boxEdge*4
var bgColor = "black"
var fgColor = "white"
var myScore = 0
var otherScore = 0
var dashLen = 8 //line dash length in pixels
var spaceLen = 8 //Line space length in pixels

var vector = 3
var angle = Math.floor(Math.random() * 360)
var xVec = vector*Math.sin(angle*(Math.PI/180))
var yVec = vector*Math.cos(angle*(Math.PI/180))

//Keypresses and handlers
var upArrow = false
var downArrow = false
var wKey = false
var sKey = false

function keyHandler(e) {
  // Right arrow keycode
  if (e.keyCode == 87) {
    wKey = true;
    sKey = false;
  }
  //Left arrow keycode
  else if (e.keyCode == 83) {
    sKey = true
    wKey = false;

  }
  else if (e.keyCode == 38) {
    downArrow = false;
    upArrow = true;
  }
  else if (e.keyCode == 40) {
    upArrow = false;
    downArrow = true;
  }
  else if (e.keyCode == 0) {
    upArrow = false;
    downArrow = false;
    wKey = false;
    sKey = false;
  }
  if (e.keyCode == 82) {
    resetGame()
  }
  if (e.keyCode == 80) {
    if (pause == 0) {
      pause = 1
    } else {
      pause = 0
    }
  }
}

function keyupHandler(e) {
  // Right arrow keycode
  if (e.keyCode == 87) {
    wKey = false;
  }
  //Left arrow keycode
  else if (e.keyCode == 83) {
    sKey = false;
  }
  else if (e.keyCode == 38) {
    upArrow = false;
  }
  else if (e.keyCode == 40) {
    downArrow = false;
  }
}

function drawBG() {
  ctx.beginPath()
  ctx.rect(0, 0, gameCanvas.width, gameCanvas.height)
  ctx.fillStyle = fgColor
  ctx.fill()
  ctx.closePath()
  ctx.beginPath()
  ctx.rect(0+boxEdge, 0+boxEdge, gameCanvas.width-boxEdge*2, gameCanvas.height-boxEdge*2)
  ctx.fillStyle = bgColor
  ctx.fill()
  ctx.closePath()

  ctx.beginPath()
  ctx.fillStyle = fgColor
  ctx.strokeStyle = fgColor

  ctx.setLineDash([dashLen, spaceLen])
  ctx.moveTo(scorelineL, 0)
  ctx.lineTo(scorelineL, gameCanvas.height)
  ctx.stroke()

  ctx.moveTo(scorelineR, 0)
  ctx.lineTo(scorelineR, gameCanvas.height)
  ctx.stroke()

  ctx.moveTo(gameCanvas.width, 50)
  ctx.lineTo(0, 50)
  ctx.stroke()

  ctx.font = "15px Arial"
  ctx.fillText("P o n g", gameCanvas.width/2-padEdge*1.5, 0+padEdge*2)
  ctx.fillText(myScore, 0+padEdge*2-4, 0+padEdge*2)
  ctx.fillText(otherScore, gameCanvas.width-padEdge*2-5, 0+padEdge*2)
  if (pause == 1) {
    ctx.font = "30px Arial"
    ctx.fillText("Paused", gameCanvas.width/2-55, gameCanvas.height/2-boxEdge)
  }

  //ctx.fill()
  ctx.closePath()
}

function drawPaddles() {
  ctx.beginPath()
  ctx.rect(myPadX, myPadY, padLen, padHeight)
  ctx.rect(otherPadX, otherPadY, padLen, padHeight)
  ctx.fillStyle = fgColor
  ctx.fill()
  ctx.closePath()
}

function drawBouncer() {
  ctx.beginPath()
  ctx.rect(bouncerX, bouncerY, bouncerSize, bouncerSize)
  ctx.fillStyle = fgColor
  ctx.fill()
  ctx.closePath()
}

function resetBouncer() {
  bouncerX = gameCanvas.width/2
  bouncerY = gameCanvas.height/2-boxEdge*4
  angle = Math.floor(Math.random() * 360)
  xVec = vector*Math.sin(angle*(Math.PI/180))
  yVec = vector*Math.cos(angle*(Math.PI/180))
}

function resetGame() {
  myPadX = 0+padEdge
  myPadY = gameCanvas.height/2-boxEdge*4
  otherPadY = gameCanvas.height/2-boxEdge*4
  otherScore = 0
  myScore = 0
  resetBouncer()
}

function draw() {
  ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height)
  drawBG()
  drawPaddles()
  drawBouncer()
  if (pause == 0) {
    if (sKey == true) {
      otherPadY += padSpd;
    }
    else if (wKey == true) {
      otherPadY -= padSpd;
    }

    if (upArrow == true) {
      myPadY -= padSpd;
    }
    else if (downArrow == true) {
      myPadY += padSpd;
    }

    //Paddle height limits
    if (myPadY > 400) {
      myPadY = 400
    }
    if (myPadY < 50) {
      myPadY = 50
    }
    if (otherPadY > 400) {
      otherPadY = 400
    }
    if (otherPadY < 50) {
      otherPadY = 50
    }

    //Score adding
    if (bouncerX < myPadX) {
      otherScore += 1
      resetBouncer()
    }
    if (bouncerX > otherPadX+bouncerSize) {
      myScore += 1
      resetBouncer()
    }
    //Bouncing on edges
    if (bouncerY+bouncerSize >= gameCanvas.height-boxEdge) {
      yVec = yVec *-1
    }
    if (bouncerY <= 50) {
      yVec = yVec * -1
    }
    if (bouncerX >= myPadX) {
      if (bouncerX <= myPadX+padLen) {
        if (bouncerY <= myPadY+padHeight+bouncerSize) {
          if (bouncerY >= myPadY-bouncerSize) {
            xVec = xVec * -1
          }
        }
      }
    }

    if (bouncerX+bouncerSize >= otherPadX) {
      if (bouncerX+bouncerSize <= otherPadX+padLen) {
        if (bouncerY <= otherPadY+padHeight+bouncerSize) {
          if (bouncerY >= otherPadY-bouncerSize) {
            xVec = xVec * -1
          }
        }
      }
    }

    bouncerX += xVec
    bouncerY += yVec
  }
}

var milliseconds = 2;
setInterval(draw, milliseconds);
