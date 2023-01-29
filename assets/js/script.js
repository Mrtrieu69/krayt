const blocksMenu = document.querySelectorAll(".toggle-menu");
const locationItems = document.querySelectorAll(".location .item");
const locationName = document.querySelector(".location .name");
const btnNext = document.querySelector(".btn.next");
const btnPrev = document.querySelector(".btn.prev");
const slider = document.querySelector(".slider .body");
const dots = document.querySelectorAll(".slider .dot");
const heartIcons = document.querySelectorAll(".icon-heart");
const colors = document.querySelectorAll(".color .item");
const sizes = document.querySelectorAll(".size .size-item");
const types = document.querySelectorAll(".sale .type");
const layout = document.querySelector(".layout");
const toggleMenuMobile = document.querySelector(".toggle-menu-mobile");
const closeMenuMobile = document.querySelector(".menu-mobile .close");
const menuMobile = document.querySelector(".menu-mobile");

// let isShowBlockMenu = false;
let currentSlide = 0;

// Handle toggle menu for choice
blocksMenu.forEach((blockMenu) => {
    blockMenu.addEventListener("click", () => {
        if (document.querySelector(".toggle-menu.active")) {
            document.querySelector(".toggle-menu.active").classList.remove("active");
        }
        blockMenu.classList.add("active");
    });
});

window.addEventListener("click", handleToggleList);

function handleToggleList(e) {
    if (!e.target.closest(".toggle-menu.active")) {
        if (document.querySelector(".toggle-menu.active")) {
            document.querySelector(".toggle-menu.active").classList.remove("active");
        }
    }
}

// Location
locationItems.forEach((item) => {
    item.addEventListener("click", (e) => {
        const activeItem = document.querySelector(".location .item.active");
        if (activeItem) {
            activeItem.classList.remove("active");
        }
        item.classList.add("active");
        locationName.textContent = item.textContent;
    });
});

// Slider
btnPrev.addEventListener("click", () => {
    currentSlide--;
    renderUiSlider();
});

btnNext.addEventListener("click", () => {
    currentSlide++;
    renderUiSlider();
});

dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
        const dotIndex = Number(dot.dataset.index);
        currentSlide = dotIndex;
        renderUiSlider();
    });
});

function renderUiSlider() {
    if (currentSlide >= 2) {
        btnNext.classList.add("disabled");
    } else {
        btnNext.classList.remove("disabled");
    }

    if (currentSlide <= 0) {
        btnPrev.classList.add("disabled");
    } else {
        btnPrev.classList.remove("disabled");
    }

    const activeDot = document.querySelector(".slider .dot.active");
    if (activeDot) {
        activeDot.classList.remove("active");
    }

    dots[currentSlide].classList.add("active");
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// Handle like items in sale
heartIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
        icon.classList.toggle("active");
    });
});

// change parameters for product
colors.forEach((color) => {
    color.addEventListener("click", () => {
        document.querySelector(".color .item.active").classList.remove("active");
        color.classList.add("active");
    });
});

sizes.forEach((size) => {
    size.addEventListener("click", () => {
        document.querySelector(".size .size-item.active").classList.remove("active");
        size.classList.add("active");
    });
});

types.forEach((type) => {
    type.addEventListener("click", () => {
        document.querySelector(".sale .type.active").classList.remove("active");
        type.classList.add("active");
    });
});

// Countdown
const hourEl = document.querySelector(".time .hour");
const minuteEl = document.querySelector(".time .minute");
const secondEl = document.querySelector(".time .second");

const HOUR = 12;
const MINUTE = 40;
const SECOND = 20;

let time = HOUR * 3600 + MINUTE * 60 + SECOND;

let timerInterval = setInterval(() => {
    time--;
    renderTimer(time);
    if (time <= 0) {
        clearInterval(timerInterval);
    }
}, 1000);

function renderTimer(time) {
    const hour = Math.floor(time / 3600);
    const minute = Math.floor((time - hour * 3600) / 60);
    const second = time - hour * 3600 - minute * 60;

    hourEl.textContent = zeroPad(hour);
    minuteEl.textContent = zeroPad(minute);
    secondEl.textContent = zeroPad(second);
}

function zeroPad(number) {
    let numberString = String(number);
    if (numberString.length < 2) {
        numberString = "0" + numberString;
    }

    return numberString;
}

// Menu on Mobile
function handleShowMenuMobile() {
    menuMobile.classList.add("active");
    layout.classList.add("active");
}

function handleCloseMenuMobile() {
    menuMobile.classList.remove("active");
    layout.classList.remove("active");
}

toggleMenuMobile.addEventListener("click", handleShowMenuMobile);
layout.addEventListener("click", handleCloseMenuMobile);
closeMenuMobile.addEventListener("click", handleCloseMenuMobile);
