const pregunta = document.getElementById("pregunta");
const resultado = document.getElementById("resultado");
const opciones = document.getElementById("opciones"); 

let correcta = "";
let contador = 0;
let puntos = 0;

async function nuevaPregunta() {

  if (contador == 5) {

    let mensaje = "";

    if (puntos == 5) mensaje = "🔥 Perfecto, eres un genio";
    else if (puntos >= 3) mensaje = "👏 Muy bien";
    else mensaje = "😅 Puedes mejorar";

    document.querySelector(".card").innerHTML = `
      <h2> Terminaste 👏</h2>
      <p>${mensaje}</p>
      <p>Respuestas correctas: ${puntos} / 5</p>
      <button onclick="location.reload()">Jugar otra vez</button>
    `;

    return;
  }

  resultado.textContent = "";
  contador++;

  let data = await fetch("https://uselessfacts.jsph.pl/random.json?language=en")
    .then(r => r.json());

  pregunta.textContent = "(" + contador + "/5) " + data.text;

  correcta = Math.random() > 0.5 ? "Verdadero" : "Falso";
}

function responder(op) {

  if (contador >= 5) return; 

  if (op === correcta) {
    resultado.textContent = "✅ Correcto";
    resultado.style.color = "lime";
    puntos++;
  } else {
    resultado.textContent = "❌ Incorrecto";
    resultado.style.color = "red";
  }
}

nuevaPregunta();
