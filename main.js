let password = document.getElementById("password");
let number = document.getElementById("number");
let character = document.getElementById("character");
let lenght = document.getElementById("lenght");

let values = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

let characteres = [
  "!",
  "%",
  "#",
  '"',
  ")",
  "(",
  "*",
  "+",
  ",",
  "-",
  ".",
  "/",
  ":",
  ";",
  "<",
  "=",
  ">",
  "?",
  "@",
  "[",
  "\\",
  "]",
  "^",
  "_",
  "`",
  "{",
  "|",
  "}",
  "~",
];

// Cambia icono de checkbox
function checkboxChange(name) {
  if (name.classList.contains("ri-checkbox-blank-circle-line")) {
    name.classList.remove("ri-checkbox-blank-circle-line");
    name.classList.add("ri-checkbox-circle-line");
  } else {
    name.classList.remove("ri-checkbox-circle-line");
    name.classList.add("ri-checkbox-blank-circle-line");
  }
}

// Listeners para los checks
number.addEventListener("click", () => {
  checkboxChange(number);
});

character.addEventListener("click", () => {
  checkboxChange(character);
});

// Generador de contraseña
function generatePassword() {
  let passwordE = [];
  password.value = null;
  password.innerText = "";
  password.classList.remove("active");

  if (!lenght.value) {
    showToast("⚠️ Debes ingresar una longitud");
    return;
  }

  let lengthF = parseInt(lenght.value);

  if (lengthF > 20) {
    showToast("🚫 Máximo 20 caracteres.");
    return;
  } else if (lengthF === 0) {
    showToast("😂 Que gracioso eres ja-ja");
    return;
  }

  let passwordValues = [...values];

  if (number.classList.contains("ri-checkbox-circle-line")) {
    passwordValues = passwordValues.concat(numbers.map(String));
  }

  if (character.classList.contains("ri-checkbox-circle-line")) {
    passwordValues = passwordValues.concat(characteres);
  }

  for (let i = 0; i < lengthF; i++) {
    let randomIndex = Math.floor(Math.random() * passwordValues.length);
    passwordE[i] = passwordValues[randomIndex];
  }

  password.value = passwordE.join("");
  password.classList.add("active");
  password.append(passwordE.join(""));
}

// Copiar contraseña al portapapeles
password.addEventListener("click", () => {
  copyPassword();
});

function copyPassword() {
  let passwordValue = password.value;

  if (passwordValue) {
    navigator.clipboard
      .writeText(passwordValue)
      .then(() => {
        showToast("✅ ¡Contraseña copiada!");
      })
      .catch((error) => {
        showToast("❌ Error al copiar la contraseña");
      });
  } else {
    showToast("🧐 No hay contraseña para copiar.");
  }
}

// Cambiar entre modo claro/oscuro
document.getElementById("toggleTheme").addEventListener("click", function () {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    this.classList.remove("ri-sun-line");
    this.classList.add("ri-moon-line");
    localStorage.setItem("theme", "dark");
  } else {
    this.classList.remove("ri-moon-line");
    this.classList.add("ri-sun-line");
    localStorage.setItem("theme", "light");
  }
});

// Detectar tema guardado al cargar
window.addEventListener("load", () => {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    document.getElementById("toggleTheme").classList.remove("ri-sun-line");
    document.getElementById("toggleTheme").classList.add("ri-moon-line");
  } else {
    document.body.classList.remove("dark");
    document.getElementById("toggleTheme").classList.remove("ri-moon-line");
    document.getElementById("toggleTheme").classList.add("ri-sun-line");
  }
});

// Mostrar mensaje tipo toast
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}
