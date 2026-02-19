const inputEmail = document.querySelector("#gmail_input");
const buttonCheck = document.querySelector("#gmail_button");
const outputResult = document.querySelector("#gmail_result");
const emailPattern = /^[^\s@]+@[^\s@]+\.[a-z]{2,4}$/i;

buttonCheck.addEventListener("click", () => {
    const emailValue = inputEmail.value.trim();
    if (emailPattern.test(emailValue)) {
        outputResult.textContent = " Email is valid";
        outputResult.style.color = "green";
    } else {
        outputResult.textContent = " Email is not valid";
        outputResult.style.color = "red";
    }
});

const containerParent = document.querySelector(".parent_block");
const movingChild = document.querySelector(".child_block");
let posX = 0,
    posY = 0,
    moveSpeed = 3,
    moveDirection = 0;

const animateSquare = () => {
    const maxX = containerParent.clientWidth - movingChild.offsetWidth;
    const maxY = containerParent.clientHeight - movingChild.offsetHeight;
    if (moveDirection === 0) {
        posX += moveSpeed;
        if (posX >= maxX) moveDirection = 1;
    } else if (moveDirection === 1) {
        posY += moveSpeed;
        if (posY >= maxY) moveDirection = 2;
    } else if (moveDirection === 2) {
        posX -= moveSpeed;
        if (posX <= 0) moveDirection = 3;
    } else if (moveDirection === 3) {
        posY -= moveSpeed;
        if (posY <= 0) moveDirection = 0;
    }
    movingChild.style.left = `${posX}px`;
    movingChild.style.top = `${posY}px`;
    requestAnimationFrame(animateSquare);
};

animateSquare();

const displaySeconds = document.getElementById("seconds");
const buttonStart = document.getElementById("start");
const buttonStop = document.getElementById("stop");
const buttonReset = document.getElementById("reset");
let totalSeconds = 0,
    timerInterval = null;

buttonStart.addEventListener("click", () => {
    if (timerInterval !== null) return;
    timerInterval = setInterval(() => {
        totalSeconds++;
        displaySeconds.textContent = totalSeconds;
    }, 1000);
});
buttonStop.addEventListener("click", () => {
    clearInterval(timerInterval);
    timerInterval = null;
});
buttonReset.addEventListener("click", () => {
    clearInterval(timerInterval);
    timerInterval = null;
    totalSeconds = 0;
    displaySeconds.textContent = totalSeconds;
});

const sliderContainer = document.querySelector(".characters-list");
let currentSlide = 0;
const slidesArray = sliderContainer ? sliderContainer.children : [];

const showCurrentSlide = () => {
    if (!slidesArray.length) return;
    Array.from(slidesArray).forEach((slide) => (slide.style.display = "none"));
    slidesArray[currentSlide].style.display = "block";
    currentSlide = (currentSlide + 1) % slidesArray.length;
};

setInterval(showCurrentSlide, 5000);
showCurrentSlide();

const modalWindow = document.querySelector(".modal");
const modalBtnClose = modalWindow.querySelector(".modal_close");
let modalShownByScroll = false;
let modalShownByTimer = false;

const openModal = () => {
    modalWindow.style.display = "block";
};
const closeModal = () => {
    modalWindow.style.display = "none";
};

modalBtnClose.addEventListener("click", closeModal);

const checkPageEnd = () => {
    if (modalShownByScroll) return;
    const scrollPos = window.scrollY || window.pageYOffset;
    const windowH = window.innerHeight;
    const pageH = document.documentElement.scrollHeight;
    if (scrollPos + windowH >= pageH) {
        openModal();
        modalShownByScroll = true;
        window.removeEventListener("scroll", checkPageEnd);
    }
};

window.addEventListener("scroll", checkPageEnd);

setTimeout(() => {
    if (!modalShownByTimer) {
        openModal();
        modalShownByTimer = true;
    }
}, 10000);

