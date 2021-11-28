const colors = {
  white: "#ffffff",
  black: "#000000",
  red: "#ff0000",
  green: "#00ff00",
  blue: "#0000ff",
  yellow: "#ffff00",
};

let config = {
  height: 40,
  width: 40,
  color: "#fff",
  backgroundColor: "#101532",
};

let events = {
  mousedown: false,
  erase: false,
};

// Set pad size
const pad = document.getElementById("pad");
const tools = document.querySelector(".tools");

const width = `calc(${1 * config.height}rem + ${config.width * 2}px)`;

pad.style.height = `calc(${1 * config.width}rem + ${config.height * 2}px)`;
pad.style.width = width;
tools.style.width = width;

pad.addEventListener("mouseup", () => {
  events.mousedown = false;
});

// Build pad
for (let i = 0; i < config.width; i++) {
  for (let j = 0; j < config.height; j++) {
    let pixel = document.createElement("div");
    pixel.classList.add("pixel");
    pixel.setAttribute("data-x", j);
    pixel.setAttribute("data-y", i);

    pixel.addEventListener("mousedown", (e) => {
      events.mousedown = true;
      draw(e);
    });

    pixel.addEventListener("mousemove", (e) => {
      if (events.mousedown) {
        draw(e);
      }
    });

    pixel.addEventListener("mouseup", () => {
      events.mousedown = false;
    });

    pad.appendChild(pixel);
  }
}

// Render
function draw(e) {
  let color = events.erase ? config.backgroundColor : config.color;

  e.target.style.backgroundColor = color;

  e.target.setAttribute("data-color", color);
}

// Build colors
const colorContainer = document.querySelector(".tools__color");

for (let color in colors) {
  let div = document.createElement("div");
  div.classList.add("tools__color__item");
  div.style.backgroundColor = colors[color];

  div.addEventListener("click", () => {
    config.color = colors[color];
  });
  colorContainer.appendChild(div);
}

// Event listeners:
// Reset
document.getElementById("reset").addEventListener("click", () => {
  let pixels = document.querySelectorAll(".pixel");

  pixels.forEach((pixel) => {
    pixel.style.backgroundColor = config.backgroundColor;
  });
});

// Erase
const erase = document.getElementById("erase");
erase.addEventListener("click", () => {
  events.erase = !events.erase;

  erase.classList.toggle("active");
});

// Color picker
document.getElementById("color").addEventListener("input", (e) => {
  config.color = e.target.value;
});

// Download
document.getElementById("download").addEventListener("click", () => {
  let boxShadow = `.pixelart {
    width: 1px;
    height: 1px;
    transform: scale(20);
    background: transparent;;
    box-shadow: `;

  document.querySelectorAll(".pixel").forEach((pixel) => {
    if (
      pixel.getAttribute("data-color") !== null &&
      pixel.getAttribute("data-color") !== "null"
    ) {
      let x = pixel.getAttribute("data-x");
      let y = pixel.getAttribute("data-y");
      let color = pixel.getAttribute("data-color");

      boxShadow += `${x}px ${y}px ${color}, `;
    }
  });

  boxShadow = boxShadow.slice(0, -2);
  boxShadow = `${boxShadow};}`;

  navigator.clipboard.writeText(boxShadow);
});
