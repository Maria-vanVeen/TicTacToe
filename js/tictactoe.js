let activePlayer = "X";
let selectedSquares = []; 

function placeXOrO(squareNumber) {
  if (!selectedSquares.some(element => element.includes(squareNumber))) {
    if (activePlayer == "X") {
      document.getElementById(squareNumber).style.backgroundImage = "url(images/x_new.png)";
    } else {
      document.getElementById(squareNumber).style.backgroundImage = "url(images/o_new.png)";
    }
    selectedSquares.push(squareNumber + activePlayer)
    checkWinConditions();
    if (activePlayer == "X") {
      activePlayer = "O";
    } else {
      activePlayer = "X";
    }
    audio("./media/place_new.m4a");
    if (activePlayer == "O") {
      disableClick();
      setTimeout(function () {computersTurn();}, 2000);
    }
    return true;
  }

  function computersTurn() {
    let success = false;
    let pickASquare;
    while (!success) {
      pickASquare = String(Math.floor(Math.random() * 9));
      if (placeXOrO(pickASquare)) {
        placeXOrO(pickASquare);
        success = true;
      }
    }
  }
}

function checkWinConditions () {
  if (arrayIncludes("0X", "1X", "2X")) { drawWinLine(50, 100, 558, 100); }
  else if (arrayIncludes("3X", "4X", "5X")) { drawWinLine(50, 304, 558, 304); }
  else if (arrayIncludes("6X", "7X", "8X")) { drawWinLine(50, 508, 558, 508); }
  else if (arrayIncludes("0X", "3X", "6X")) { drawWinLine(100, 50, 100, 558); }
  else if (arrayIncludes("1X", "4X", "7X")) { drawWinLine(304, 50, 304, 558); }
  else if (arrayIncludes("2X", "5X", "8X")) { drawWinLine(508, 50, 508, 558); }
  else if (arrayIncludes("6X", "4X", "2X")) { drawWinLine(100, 508, 510, 90); }
  else if (arrayIncludes("0X", "4X", "8X")) { drawWinLine(100, 100, 520, 520); }
  else if (arrayIncludes("0O", "1O", "2O")) { drawWinLine(50, 100, 558, 100); }
  else if (arrayIncludes("3O", "4O", "5O")) { drawWinLine(50, 304, 558, 304); }
  else if (arrayIncludes("6O", "7O", "8O")) { drawWinLine(50, 508, 558, 508); }
  else if (arrayIncludes("0O", "3O", "6O")) { drawWinLine(100, 50, 100, 558); }
  else if (arrayIncludes("1O", "4O", "7O")) { drawWinLine(304, 50, 304, 558); }
  else if (arrayIncludes("2O", "5O", "8O")) { drawWinLine(508, 50, 508, 558); }
  else if (arrayIncludes("6O", "4O", "2O")) { drawWinLine(100, 508, 510, 90); }
  else if (arrayIncludes("0O", "4O", "8O")) { drawWinLine(100, 100, 520, 520); }
  else if (selectedSquares.length >= 9) {
    audio("./media/tie_new.mp3");
    setTimeout(function () { resetGame(); }, 2000);
  }
}

function arrayIncludes(sqA, sqB, sqC) {
  const a = selectedSquares.includes(sqA);
  const b = selectedSquares.includes(sqB);
  const c = selectedSquares.includes(sqC);
  if (a && b && c) { return true} 
}

function disableClick() {
  body.style.pointerEvents = "none";
  setTimeout(function() {body.style.pointerEvents = "auto";}, 2000);
}

function audio(audioURL) {
  let audio = new Audio(audioURL);
  audio.play();
}

function drawWinLine(coordX1, coordY1, coordX2, coordY2) {
  const canvas = document.getElementById("win-lines");
  const c = canvas.getContext("2d");
  let x1 = coordX1;
  let y1 = coordY1;
  let x2 = coordX2;
  let y2 = coordY2;
  let x = x1;
  let y = y1;

  function animateLineDrawing() {
    const animationLoop  = requestAnimationFrame(animateLineDrawing);
    c.clearRect(0, 0, 608, 608);
    c.beginPath();
    c.moveTo(x1, y1);
    c.lineTo(x, y);
    c.lineWidth = 10;
    c.strokeStyle = "rgba(70, 255, 33, 0.8)";
    c.stroke();

    if(x1 <= x2  &&  y1 <= y2) {
      if ( x < x2) { x += 10;}
      if ( y < y2) { y += 10;}
      if (x >= x2 && y >= y2) { cancelAnimationFrame(animationLoop); }
    }
    if(x1 <= x2  &&  y1 > y2) {
      if ( x < x2) { x += 10;}
      if ( y > y2) { y -= 10;}
      if (x >= x2 && y <= y2) { cancelAnimationFrame(animationLoop); }
    }
  }

  function clear() {
    const animationLoop = requestAnimationFrame(clear);
    c.clearRect(0, 0, 608, 608);
    cancelAnimationFrame(animationLoop);
  }

  disableClick();
  audio("./media/win_new.mp3");
  animateLineDrawing();
  setTimeout(function() { clear(); resetGame(); }, 2000 );
}

function resetGame() {
  for (let i = 0; i < 9; i++) {
    document.getElementById(String(i)).style.backgroundImage = "";
  }
  selectedSquares = [];
}