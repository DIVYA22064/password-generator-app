const lengthSlider = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");
const passwordDisplay = document.getElementById("passwordDisplay");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const strengthBars = [
  document.getElementById("bar1"),
  document.getElementById("bar2"),
  document.getElementById("bar3"),
  document.getElementById("bar4"),
];

const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lower = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

lengthSlider.addEventListener("input", () => {
  lengthValue.textContent = lengthSlider.value;
});

window.addEventListener("DOMContentLoaded", () => {
  lengthSlider.value = 0;
  lengthValue.textContent = 0;
  passwordDisplay.parentElement.classList.remove("has-password");
});

generateBtn.addEventListener("click", () => {
  const len = parseInt(lengthSlider.value);

  if (len === 0) {
    alert("Please set a character length greater than 0.");
    return;
  }

  let chars = "";
  if (document.getElementById("uppercase").checked) chars += upper;
  if (document.getElementById("lowercase").checked) chars += lower;
  if (document.getElementById("numbers").checked) chars += numbers;
  if (document.getElementById("symbols").checked) chars += symbols;

  if (chars === "") {
    alert("Please select at least one option.");
    return;
  }

  let password = "";
  for (let i = 0; i < len; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }

  passwordDisplay.textContent = password;
  passwordDisplay.parentElement.classList.add("has-password");
  updateStrength();
});

copyBtn.addEventListener("click", () => {
  const text = passwordDisplay.textContent;
  const svg = copyBtn.querySelector("svg");
  svg.style.transition = "stroke 0.3s ease";
  svg.setAttribute("stroke", "#ffffff");

  navigator.clipboard.writeText(text).then(() => {
    setTimeout(() => {
      svg.setAttribute("stroke", "#a4ffaf");
    }, 1000);
  });
});

function updateStrength() {
  const typesSelected = [
    document.getElementById("uppercase").checked,
    document.getElementById("lowercase").checked,
    document.getElementById("numbers").checked,
    document.getElementById("symbols").checked,
  ];

  const selectedCount = typesSelected.filter(Boolean).length;
  const strengthLabel = document.getElementById("strengthLabel");
  const bars = document.querySelectorAll(".bar");

  bars.forEach((bar) => {
    bar.style.backgroundColor = "transparent";
    bar.style.border = "1px solid white";
  });

  if (selectedCount === 0) {
    strengthLabel.textContent = "";
    strengthLabel.style.visibility = "hidden";
    return;
  }

  strengthLabel.style.visibility = "visible";
  const strengthLevels = ["", "Very Low", "Low", "Medium", "Strong"];
  strengthLabel.textContent = strengthLevels[selectedCount];
  for (let i = 0; i < selectedCount; i++) {
    bars[i].style.backgroundColor = "yellow";
    bars[i].style.border = "none";
  }
}
