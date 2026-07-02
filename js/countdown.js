/*=========================================
            CUENTA REGRESIVA
=========================================*/

const eventDate = new Date("August 1, 2026 14:00:00").getTime();

const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");

const numbers = document.querySelectorAll(".countdown-item span");

function animateNumbers(){

    numbers.forEach(number => {
        number.style.opacity = ".65";
        number.style.transform = "translateY(2px)";
    });

    setTimeout(() => {
        numbers.forEach(number => {
            number.style.opacity = "1";
            number.style.transform = "translateY(0)";
        });
    }, 80);

}

function updateCountdown(){

    const now = new Date().getTime();
    const distance = eventDate - now;

    animateNumbers();

    if(distance <= 0){

        daysElement.textContent = "00";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";

        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    daysElement.textContent = String(days).padStart(2, "0");
    hoursElement.textContent = String(hours).padStart(2, "0");
    minutesElement.textContent = String(minutes).padStart(2, "0");
    secondsElement.textContent = String(seconds).padStart(2, "0");

}

updateCountdown();

setInterval(updateCountdown, 1000);