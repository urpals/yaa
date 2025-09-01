const app = document.getElementById("app");
const buttons = document.querySelectorAll(".nav-btn");
const curvePath = document.getElementById("curvePath");

// Warna pastel lembut
const colors = {
  1: "#FFD6A5", // pastel orange
  2: "#A5D8FF", // pastel blue
  3: "#B9FBC0", // pastel green
  4: "#D0A2F7"  // pastel purple
};

const centers = { 1: 50, 2: 150, 3: 250, 4: 350 };

// cekungan setengah lingkaran
function generatePath(cx, r = 40, dip = 40) {
  return `
    M0,0 
    H${cx - r}
    C${cx - r/2},0 ${cx - r/2},${dip} ${cx},${dip}
    C${cx + r/2},${dip} ${cx + r/2},0 ${cx + r},0
    H400 V60 H0 Z
  `;
}

function setMenu(n) {
  app.style.backgroundColor = colors[n];
  buttons.forEach(btn => btn.classList.remove("active"));
  document.querySelector(`.nav-btn[data-menu="${n}"]`).classList.add("active");
  anime({
    targets: curvePath,
    d: [{ value: generatePath(centers[n]) }],
    easing: "easeInOutQuad",
    duration: 500
  });
}

buttons.forEach(btn => {
  btn.addEventListener("click", () => setMenu(parseInt(btn.dataset.menu)));
});

// set awal
curvePath.setAttribute("d", generatePath(centers[1]));
app.style.backgroundColor = colors[1];
