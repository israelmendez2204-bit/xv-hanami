const container = document.getElementById("petals-container");

const PETAL_IMAGE = "assets/flowers/Petalo.png";

function createPetal(){

    const petal = document.createElement("img");

    petal.src = PETAL_IMAGE;

    petal.className = "petal";

const animations = [

    "petalFall",

    "petalFallLeft",

    "petalFallRight"

];

petal.style.animationName = animations[
    Math.floor(Math.random()*animations.length)
];
    const size = Math.random() * 20 + 18;

    const startX = Math.random()*window.innerWidth;

    petal.style.width = size + "px";

    petal.style.filter =
    `blur(${Math.random()*0.8}px)`;

    petal.style.zIndex = Math.random() > 0.7 ? 8 : 4;

   petal.style.left = startX + "px";

const duration = Math.random() * 5 + 8;

petal.style.animationDuration = duration + "s";

petal.style.setProperty(
    "--rotation",
    (Math.random() * 540 + 180) + "deg"
);

petal.style.opacity = Math.random()*0.4 + 0.6;

container.appendChild(petal);

setTimeout(() => {

    petal.remove();

}, duration * 1000);
}

setInterval(createPetal,500);