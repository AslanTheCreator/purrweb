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

const FORWARD = true;
const BACK = false;
const scrollTime = 200;

let count = 0;
let activeDotIndex = 0;
let posInitial;
let isSlideScroll = false;

buttonPrev.addEventListener('click', () => {
  slideScrollAndSelect(BACK);
});
buttonNext.addEventListener('click', () => {
  slideScrollAndSelect(FORWARD);
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
      slideScrollToSelectedVal(index, FORWARD);
    } else if (index < count && isSlideScroll === false) {
      slideScrollToSelectedVal(index, BACK);
    }
  }),
);

function slideScrollAndSelect(dir) {
  if (isSlideScroll === false) {
    slideScroll(dir);
    selectDots(dir);
  }
}

function selectDots(dir) {
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
    if (timePassed >= scrollTime) {
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
  setTimeout(scrollToInitialValue, scrollTime);
}

function slideScrollToSelectedVal(index, dir) {
  isSlideScroll = true;
  let interval = setInterval(function () {
    posInitial = slides.offsetLeft;
    let distancePassed = -(index + 1) * slideSize;
    let posCurrent = Number.parseInt(slides.style.left);
    if ((dir && posCurrent <= distancePassed) || (!dir && posCurrent >= distancePassed)) {
      count = -distancePassed / slideSize - 1;
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
  setTimeout(scrollToInitialValue, scrollTime);
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
