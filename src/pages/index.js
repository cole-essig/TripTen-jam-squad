
const firstSlot = document.querySelector(".slots__first");
const secondSlot = document.querySelector(".slots__second");
const thirdSlot = document.querySelector(".slots__third");

const slotsButton = document.querySelector(".slots__button");
const slotsButtonPopup = document.querySelector(".slots__button_popup");
const slotsButtonPopupAnimation = document.querySelector(".slots__button_popup_animation");


// FUNCTIONS

function runReel() {
    firstSlot.classList.add(`slots__first_animation`);
    secondSlot.classList.add(`slots__second_animation`);
    thirdSlot.classList.add(`slots__third_animation`);
};

function pauseReel(div) {
  div.classList.add(`slots__paused`);
}

function resetReel() {
    firstSlot.classList.remove(`slots__first_animation`);
    secondSlot.classList.remove(`slots__second_animation`);
    thirdSlot.classList.remove(`slots__third_animation`);

    firstSlot.classList.remove(`slots__paused`);
    secondSlot.classList.remove(`slots__paused`);
    thirdSlot.classList.remove(`slots__paused`);

    slotsButtonPopup.classList.remove('slots__button_popup-visible');
    slotsButtonPopupAnimation.classList.remove('slots__button_popup-visible');

    resetSpan(firstSlot);
    resetSpan(secondSlot);
    resetSpan(thirdSlot);
}

function resetSpan(div) {
  div.classList.remove("slots__finished");
  const childSpans = div.querySelectorAll('*');
  
  childSpans.forEach(span => {
    span.classList.remove("slots__hidden_numbers")
  })
}

function highlightResultsButton() {
  slotsButtonPopup.classList.add('slots__button_popup-visible')
  slotsButtonPopupAnimation.classList.add('slots__button_popup-visible')
}

function finishReelAnimation(div) {
  pauseReel(div);
  div.classList.add("slots__finished");
  const childSpans = div.querySelectorAll('*');
  
  childSpans.forEach(span => {
    span.classList.add("slots__hidden_numbers")
  })
}

function getCoinReward(first, second, third) {
  finishReelAnimation(first);
  finishReelAnimation(second);
  finishReelAnimation(third);
}

function getRandomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// HANDLERS

function handleDaddyButtonClick() {
  runReel();
  setTimeout(() => {
    highlightResultsButton();
    getCoinReward(firstSlot, secondSlot, thirdSlot);
  }, getRandomNumberBetween(3000, 7000))
}

// EVENTLISTENERS

slotsButton.addEventListener("click", () => {
  handleDaddyButtonClick();
})

slotsButtonPopup.addEventListener("click", () => {
  resetReel();
})

