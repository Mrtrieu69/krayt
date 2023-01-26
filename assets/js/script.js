const blockLocation = document.querySelector(".location");
const locationItems = document.querySelectorAll(".location .item");
const locationName = document.querySelector(".location .name");
const btnNext = document.querySelector(".btn.next");
const btnPrev = document.querySelector(".btn.prev");
const slider = document.querySelector(".slider .body");
const dots = document.querySelectorAll(".slider .dot");

let isShowBlockLocation = false;
let currentSlide = 0;

blockLocation.addEventListener("click", () => {
    blockLocation.classList.add("active");
    isShowBlockLocation = true;
});

window.addEventListener("click", (e) => {
    if (isShowBlockLocation) {
        if (!e.target.closest(".location")) {
            blockLocation.classList.remove("active");
            isShowBlockLocation = false;
        }
    }
});

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
