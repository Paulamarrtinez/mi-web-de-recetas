// Recetas a mostrar
const recetas = [
  {
    nombre: "Tortilla de Patatas",
    img: "https://cdn.pixabay.com/photo/2017/06/17/10/06/tortilla-2410132_960_720.jpg",
    ingredientes: [
      "5 huevos", "3 patatas", "1 cebolla", "Aceite de oliva", "Sal"
    ],
    pasos: [
      "Pelar y cortar las patatas.",
      "Freírlas con la cebolla.",
      "Batir los huevos y mezclar todo.",
      "Cuajar en sartén por ambos lados."
    ]
  },
  {
    nombre: "Pasta Carbonara",
    img: "https://cdn.pixabay.com/photo/2015/04/08/13/13/food-712665_960_720.jpg",
    ingredientes: [
      "Espaguetis", "Panceta", "Huevos", "Parmesano", "Sal y pimienta"
    ],
    pasos: [
      "Cocer la pasta.",
      "Freír la panceta.",
      "Mezclar con huevo batido y queso.",
      "Unir todo con la pasta caliente."
    ]
  },
  {
    nombre: "Bizcocho de Yogur",
    img: "https://cdn.pixabay.com/photo/2015/05/07/14/08/cake-756601_960_720.jpg",
    ingredientes: [
      "1 yogur", "3 huevos", "2 de azúcar", "3 de harina", "1 de aceite", "Levadura"
    ],
    pasos: [
      "Mezclar todos los ingredientes.",
      "Verter en un molde.",
      "Hornear a 180°C durante 35 min."
    ]
  },
  {
    nombre: "Hamburguesa Casera",
    img: "https://cdn.pixabay.com/photo/2014/10/23/18/05/burger-500054_960_720.jpg",
    ingredientes: [
      "Carne picada", "Pan de hamburguesa", "Lechuga", "Queso", "Salsa", "Tomate"
    ],
    pasos: [
      "Formar la hamburguesa y cocinarla.",
      "Tostar el pan.",
      "Montar los ingredientes en capas."
    ]
  }
];

// Insertar recetas dinámicamente
const container = document.getElementById("recetas-container");

recetas.forEach(receta => {
  const div = document.createElement("div");
  div.className = "receta";
  div.innerHTML = `
    <img src="${receta.img}" alt="${receta.nombre}">
    <h3>${receta.nombre}</h3>
    <h4>Ingredientes</h4>
    <ul>${receta.ingredientes.map(i => `<li>${i}</li>`).join("")}</ul>
    <h4>Paso a paso</h4>
    <ol>${receta.pasos.map(p => `<li>${p}</li>`).join("")}</ol>
    <button class="boton-chat">💬 Habla con IA</button>
  `;
  container.appendChild(div);
});

// Simular botón de IA
const modal = document.getElementById("chat-modal");
const closeBtn = document.getElementById("close-chat");

document.addEventListener("click", e => {
  if (e.target.classList.contains("boton-chat")) {
    modal.classList.remove("hidden");
  }
});

closeBtn.onclick = () => modal.classList.add("hidden");

// Función que hace la petición al backend con OpenAI
async function preguntarAI(receta) {
  const pregunta = prompt(`¿Qué quieres saber de la receta "${receta}"?`);
  if (!pregunta) return;

  try {
    const resp = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ receta, pregunta })
    });

    const data = await resp.json();
    alert(data.respuesta); // Mostrar la respuesta de la IA
  } catch (err) {
    alert("Error al conectar con la IA. Revisa la consola.");
    console.error(err);
  }
}

document.addEventListener("click", e => {
  if (e.target.classList.contains("boton-chat")) {
    const receta = e.target.closest('.receta, .card')?.querySelector('h3')?.innerText;
    if (receta) preguntarAI(receta);
  }
});

// script.js - Ejemplo de interacción simple (añadir a favoritos)

document.querySelectorAll('.btn-favorite').forEach(button => {
  button.addEventListener('click', () => {
    button.textContent = '✅ Añadido';
    button.disabled = true;
  });
});
