var words = [];
var choosenWord;
var hiddenWord = "";
var triedLetters = [];
var correctLetters = [];
var chances = 6;
var errors = 0;
var img = document.getElementById("img")

document.getElementById("content").style.opacity = 0;

function drawWord() {
  choosenWord = words[Math.floor(Math.random() * words.length)]
}

function hideWord() {
  for (let i = 0; i < choosenWord.length; i++) {
    hiddenWord += '*';
  }
}


function verifyAttempt() {
  let tentativa = document.getElementById("tentativa").value;
  var mensagem = document.getElementById("mensagem");

  if (tentativa.length > 1) {
    if (tentativa == choosenWord) {
      mensagem.textContent = "Você acertou! O jogo irá reiniciar em 5 segundos :D";
      document.getElementById("tentar").setAttribute("disabled", "disabled")
      document.getElementById("tentativa").setAttribute("disabled", "disabled")
      setTimeout(() => {
        location.reload();
      }, 5000)
    } else {
      mensagem.textContent = "Você errou! O jogo irá reiniciar em 5 segundos :D";
      document.getElementById("tentar").setAttribute("disabled", "disabled")
      document.getElementById("tentativa").setAttribute("disabled", "disabled")
      setTimeout(() => {
        location.reload();
      }, 5000)
    }
  } else {
    verifyWord(tentativa);
  }
  updateScreen();
  document.getElementById("tentativa").value = "";
}


function updateScreen() {
  var palavraVisivel = "";
  for (let i = 0; i < choosenWord.length; i++) {
    if (correctLetters.includes(choosenWord[i])) {
      palavraVisivel += choosenWord[i];
    } else {
      palavraVisivel += '-';
    }
  }

  if (palavraVisivel == choosenWord) {
    mensagem.textContent = "Ganhou!!! O jogo irá reiniciar em 5 segundos :D";
    document.getElementById("tentar").setAttribute("disabled", "disabled")
    document.getElementById("tentativa").setAttribute("disabled", "disabled")

    setTimeout(() => {
      location.reload();
    }, 5000)
  }
  document.getElementById("palavra-secreta").textContent = palavraVisivel;
}

function drawImage() {
  let button = document.getElementById("tentar")
  switch (errors) {
    case 1:
      img.src = "./sprites/sprites(2).png";
      break;
    case 2:
      img.src = "./sprites/sprites(3).png";
      break;
    case 3:
      img.src = "./sprites/sprites(4).png";
      break;
    case 4:
      img.src = "./sprites/sprites(5).png";
      break;
    case 5:
      img.src = "./sprites/sprites(6).png";
      break;
    case 6:
      img.src = "./sprites/sprites(7).png";
      button.setAttribute("disabled", "disabled")
      document.getElementById("tentativa").setAttribute("disabled", "disabled")
      mensagem.innerText = "Você perdeu!!!  O jogo irá reiniciar em 5 segundos :D";
      setTimeout(() => {
        location.reload();
      }, 5000)
      break
  }
}

function verifyWord(tentativa) {
  if (!triedLetters.includes(tentativa)) {
    triedLetters.push(tentativa);
  } else {
    mensagem.textContent = "Você já tentou essa letra.";
    return;
  }

  for (let i = 0; i < choosenWord.length; i++) {
    if (tentativa == choosenWord[i]) {
      correctLetters.push(tentativa);
      var exists = true;
    }
  }


  if (!exists) {
    errors++;
    drawImage();

  }
}

function start() {
  drawWord();
  hideWord();
  updateScreen();
}

function cadastrar() {
  let input = document.getElementById("input").value

  if (input == "fim") {
    document.getElementById("content").style.opacity = 100;
    document.getElementById("cadastro").style.opacity = 0;
    start();
  } else {
    words.push(input);
    document.getElementById("msg").innerText = `A palavra  "${input}" foi adicionada ao jogo`;
    document.getElementById("input").value = "";
  }
}
