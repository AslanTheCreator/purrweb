const buttonPrev = document.querySelector('.slider__button-prev');
const buttonNext = document.querySelector('.slider__button-next');
const slider = document.querySelector('.slider');
const slides = document.querySelector('.slides');
const slideElement = document.querySelectorAll('.slide__element');
const dotsElement = document.getElementsByTagName('li');
const dotsButton = document.querySelectorAll('.dots__button');

const slidesLength = slideElement.length;
const firstSlide = slideElement[0];
const lastSlide = slideElement[slidesLength - 1];
const slideSize = firstSlide.offsetWidth + 20;
const cloneFirst = firstSlide.cloneNode(true);
const cloneLast = lastSlide.cloneNode(true);

slides.appendChild(cloneFirst);
slides.insertBefore(cloneLast, firstSlide);

let count = 0;
let ind = 0;
let posInitial;
let allowShift = true;
let isSlideScroll = false;
let activeDotIndex = 0;

buttonPrev.addEventListener('click', () => {
  if (isSlideScroll === false) {
    slideScroll(0);
    dots(0);
  }
});
buttonNext.addEventListener('click', () => {
  if (isSlideScroll === false) {
    slideScroll(1);
    dots(1);
  }
});

dotsButton.forEach((element, index) =>
  element.addEventListener('click', () => {
    dotsElement[activeDotIndex].classList.remove('li-active');
    activeDotIndex = index;
    dotsElement[activeDotIndex].classList.add('li-active');
  }),
);

dotsButton.forEach((element, index) =>
  element.addEventListener('click', () => {
    if (index > count && isSlideScroll === false) {
      slideScrollToSelectedVal(index, 1);
      console.log(slides.offsetLeft);
    } else if (index < count && isSlideScroll === false) {
      slideScrollToSelectedVal(index, 0);
      console.log(slides.offsetLeft);
    }
  }),
);

function dots(dir) {
  dotsElement[activeDotIndex].classList.remove('li-active');
  activeDotIndex = (dotsElement.length + activeDotIndex + (dir ? +1 : -1)) % dotsElement.length;
  dotsElement[activeDotIndex].classList.add('li-active');
}

function slideScroll(dir) {
  isSlideScroll = true;
  let start = Date.now();
  if (dir) {
    count++;
  } else {
    count--;
  }
  let interval = setInterval(function () {
    posInitial = slides.offsetLeft;
    let timePassed = Date.now() - start;
    if (timePassed >= 200) {
      clearInterval(interval);
      isSlideScroll = false;
      return;
    }
    if (dir) {
      slides.style.left = posInitial - 50 + 'px';
    } else {
      slides.style.left = posInitial + 50 + 'px';
    }
  }, 19);
  setTimeout(scrollToInitialValue, 201);
}

function slideScrollToSelectedVal(index, dir) {
  isSlideScroll = true;
  let interval = setInterval(function () {
    posInitial = slides.offsetLeft;
    let distancePassed = -(index + 1) * slideSize;
    let posCurrent = Number.parseInt(slides.style.left);
    if (
      (dir === 1 && posCurrent <= distancePassed) ||
      (dir === 0 && posCurrent >= distancePassed)
    ) {
      count = -distancePassed / 500 - 1;
      isSlideScroll = false;
      clearInterval(interval);
      return;
    }
    if (dir) {
      slides.style.left = posInitial - 50 + 'px';
    } else {
      slides.style.left = posInitial + 50 + 'px';
    }
  }, 19);
  setTimeout(scrollToInitialValue, 201);
}

function scrollToInitialValue() {
  if (count === slidesLength) {
    slides.style.left = -slideSize + 'px';
    count = 0;
  }
  if (count === -1) {
    slides.style.left = -slidesLength * slideSize + 'px';
    count = slidesLength - 1;
  }
}
