//======================================
// XV HANAMI
// Control principal
//======================================

const hero = document.querySelector(".hero");
const startButton = document.getElementById("startButton");
const envelopeScene = document.getElementById("envelopeScene");
const envelope = document.querySelector(".envelope");
const developerSignature = document.querySelector(".developer-signature");
const nightLayer = document.querySelector(".night-layer");
const letterContent = document.querySelector(".letter-content");
const backgroundMusic = document.getElementById("backgroundMusic");

let musicFadeInterval = null;

if(startButton){

    startButton.addEventListener("click", startExperience);
    console.log("Botón abrir conectado");

}else{

    console.log("No se encontró startButton");

}

function startExperience(){

    console.log("Click en abrir invitación");

fadeInMusic();

    hero.style.transition = "opacity .8s ease";
    hero.style.opacity = "0";

    setTimeout(() => {

        envelopeScene.style.opacity = "1";
        envelopeScene.style.pointerEvents = "auto";
        envelope.style.transform = "translateY(0)";

        setTimeout(() => {

            envelope.classList.add("open");

        }, 1200);

        setTimeout(() => {

            envelope.classList.add("letter-out");

        }, 1900);

        setTimeout(() => {

            envelope.classList.add("letter-open");

        }, 3300);

    }, 800);

}

function fadeInMusic(){

    if(!backgroundMusic) return;

    clearInterval(musicFadeInterval);

    backgroundMusic.volume = 0;
    backgroundMusic.play();

    let volume = 0;

    musicFadeInterval = setInterval(() => {

        volume += 0.02;

        if(volume >= 0.35){

            volume = 0.35;

            clearInterval(musicFadeInterval);
            musicFadeInterval = null;

        }

        backgroundMusic.volume = volume;

    }, 120);

}

function fadeOutMusic(){

    if(!backgroundMusic) return;

    clearInterval(musicFadeInterval);

    let volume = backgroundMusic.volume;

    musicFadeInterval = setInterval(() => {

        volume -= 0.02;

        if(volume <= 0){

            volume = 0;

            backgroundMusic.volume = 0;
            backgroundMusic.pause();
            backgroundMusic.currentTime = 0;

            clearInterval(musicFadeInterval);
            musicFadeInterval = null;

            return;

        }

        backgroundMusic.volume = volume;

    }, 120);

}

/*=========================================
            TARJETAS SOBRE MÍ
=========================================*/

const aboutCards = document.querySelectorAll('.about-card');

aboutCards.forEach(card => {

    card.addEventListener('click', () => {

        const isOpen = card.classList.contains('is-flipped');

        aboutCards.forEach(item => {

            item.classList.remove('is-flipped');

        });

        if(!isOpen){

            card.classList.add('is-flipped');

        }

    });

});

/*=========================================
        APARICIÓN DE TARJETAS
=========================================*/

const aboutSection = document.querySelector('.about-block');

const aboutObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(!entry.isIntersecting) return;

        aboutCards.forEach((card,index)=>{

            setTimeout(()=>{

                card.classList.add('show');

            },index*120);

        });

        aboutObserver.unobserve(entry.target);

    });

},{
    threshold:.25
});

aboutObserver.observe(aboutSection);

/*=========================================
        CERRAR CARTA - INICIO
=========================================*/

const closeLetterButton = document.getElementById("closeLetterButton");

if(closeLetterButton){

    closeLetterButton.addEventListener("click", () => {

fadeOutMusic();

        if(letterContent){

            letterContent.classList.add("lock-scroll");
            letterContent.style.overflowY = "hidden";
            letterContent.style.touchAction = "none";

        }

        envelopeScene.classList.add("closing-letter");

        if(nightLayer){

            nightLayer.classList.add("is-night");

        }

        envelope.classList.add("closing-return");

        console.log("Carta bajando");

        setTimeout(() => {

            envelope.classList.remove("open");
            envelope.classList.add("closing-envelope");

            console.log("Sobre cerrando");

        }, 2300);

        setTimeout(() => {

            envelope.classList.add("seal-return");

            const lanterns = document.querySelectorAll(".lantern");

            lanterns.forEach(lantern => {

                lantern.classList.add("lantern-on");

            });

            const lanternGlows = document.querySelectorAll(".lantern-glow");

            lanternGlows.forEach(glow => {

                glow.classList.add("is-visible");

            });

            startPetalSparkles();

            console.log("Sello regresando");

        }, 3300);

        setTimeout(() => {

            envelope.classList.add("hide-letter");

            console.log("Carta oculta");

        }, 3900);

        setTimeout(() => {

            if(developerSignature){

                developerSignature.classList.remove("hide");
                developerSignature.classList.add("show");

            }

            console.log("Firma final aparece");

        }, 5200);

    });

}

/*=========================================
        DESTELLO ALEATORIO EN PÉTALOS
=========================================*/

function startPetalSparkles(){

    setInterval(() => {

        const petals = document.querySelectorAll(".petal");

        if(!petals.length) return;

        const randomPetal = petals[
            Math.floor(Math.random() * petals.length)
        ];

        const rect = randomPetal.getBoundingClientRect();

        const spark = document.createElement("div");

        spark.classList.add("petal-spark");

        spark.style.left = `${rect.left + rect.width / 2 - 9}px`;
        spark.style.top = `${rect.top + rect.height / 2 - 9}px`;

        document.body.appendChild(spark);

        setTimeout(() => {

            spark.remove();

        }, 900);

    }, 3000);

}

/*=========================================
        DETECTOR DE CLICS
=========================================*/

document.addEventListener("click", (event) => {

    console.log("Click real en:", event.target);

}, true);

/*=========================================
        REINICIAR INVITACIÓN
=========================================*/

const restartButton = document.getElementById("restartInvitation");

if(restartButton){

    restartButton.addEventListener("click", () => {

fadeInMusic();

        if(developerSignature){

            developerSignature.classList.remove("show");
            developerSignature.classList.remove("hide");

        }

        const lanterns = document.querySelectorAll(".lantern");

        lanterns.forEach(lantern => {

            lantern.classList.remove("lantern-on");

        });

        const lanternGlows = document.querySelectorAll(".lantern-glow");

        lanternGlows.forEach(glow => {

            glow.classList.remove("is-visible");

        });

        if(nightLayer){

            nightLayer.classList.remove("is-night");

        }

        envelope.classList.remove("hide-letter");
        envelope.classList.remove("closing-envelope");
        envelope.classList.remove("seal-return");
        envelope.classList.add("open");

        envelope.classList.remove("closing-return");
        envelopeScene.classList.remove("closing-letter");

        if(letterContent){

            letterContent.classList.remove("lock-scroll");
            letterContent.style.overflowY = "auto";
            letterContent.style.touchAction = "auto";

        }

        console.log("Reinicio completo: carta restaurada");

    });

}