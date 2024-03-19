const menuBtn = document.getElementById("menuBtn");
const header = document.querySelector("header");

menuBtn.addEventListener("click", () => {
  header.classList.toggle("flex");
  header.classList.toggle("hidden");
});
