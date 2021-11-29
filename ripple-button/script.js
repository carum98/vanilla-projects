const button = document.querySelector(".button-ripple");

button.addEventListener("click", (e) => {
  const x = e.clientX - e.target.offsetLeft;
  const y = e.clientY - e.target.offsetTop;

  const ripple = document.createElement("span");
  ripple.classList.add("ripple");
  ripple.style.left = x + "px";
  ripple.style.top = y + "px";

  button.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 500);
});
