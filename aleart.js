window.addEventListener("load", function() {
  setTimeout(function open(event) {
      document.querySelector(".popup").style.display = "block";
      document.querySelector("body").style.backdropFilter = "blur(100px)";
  }, 1000);
});

document.querySelector("#close").addEventListener("click", function() {
  document.querySelector(".popup").style.display = "none";
  document.querySelector("body").style.backdropFilter = "blur(0)";
});

document.querySelector("#closeClick").addEventListener("click", function() {
  document.querySelector(".popup").style.display = "none";
  document.querySelector("body").style.backdropFilter = "blur(0)";
});

const strings = ["Har tap => profit", "Share Karo - Paisa komao", "Har click se dhanbadh"];
let index = 0;
let text = "";
let isErasing = false;

function type() {
  const currentString = strings[index];
  if (isErasing) {
      text = currentString.substring(0, text.length - 1);
  } else {
      text = currentString.substring(0, text.length + 1);
  }
  
  document.getElementById("typed-text").textContent = text;
  
  if (!isErasing && text === currentString) {
      setTimeout(() => isErasing = true, 1000);
  } else if (isErasing && text === "") {
      isErasing = false;
      index = (index + 1) % strings.length;
  }

  setTimeout(type, isErasing ? 75 : 150);
}

type();


document.addEventListener('DOMContentLoaded', () => {
  const textElement = document.getElementById('animated-text');
  const text = textElement.textContent;
  textElement.innerHTML = '';

  const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

  let colorIndex = 0;

  function createSpans() {
      text.split('').forEach(char => {
          const span = document.createElement('span');
          span.textContent = char;
          textElement.appendChild(span);
      });
  }

  function applyColor() {
      const spans = textElement.querySelectorAll('span');
      spans.forEach((span, index) => {
          setTimeout(() => {
              span.style.color = colors[colorIndex];
          }, index * 100); // delay between each letter
      });

      colorIndex = (colorIndex + 1) % colors.length;
      setTimeout(applyColor, spans.length * 100 + 1000); // delay before the next color
  }

  createSpans();
  applyColor();
});
