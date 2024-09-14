
const firstSlot = document.querySelector(".slots__first");
const secondSlot = document.querySelector(".slots__second");
const thirdSlot = document.querySelector(".slots__third");

const slotsButton = document.querySelector(".slots__button");
const slotsButtonPopup = document.querySelector(".slots__button_popup");

// FUNCTIONS


function runReel() {
    firstSlot.classList.add(`slots__first_animation`);
    secondSlot.classList.add(`slots__second_animation`);
    thirdSlot.classList.add(`slots__third_animation`);
};

function pauseReel() {
    firstSlot.classList.add(`slots__paused`);
    secondSlot.classList.add(`slots__paused`);
    thirdSlot.classList.add(`slots__paused`)
}

function resetReel() {
  firstSlot.classList.remove(`slots__first_animation`);
    secondSlot.classList.remove(`slots__second_animation`);
    thirdSlot.classList.remove(`slots__third_animation`);

    firstSlot.classList.remove(`slots__paused`);
    secondSlot.classList.remove(`slots__paused`);
    thirdSlot.classList.remove(`slots__paused`);

    slotsButtonPopup.classList.remove('slots__button_popup-visible');
}

function highlightResultsButton() {
  slotsButtonPopup.classList.add('slots__button_popup-visible')
}

function findClosestReelSpan(div) {
  const spans = div.querySelectorAll("span")
  
  let resultArray = [];

  spans.forEach(span => {
    const spanRect = span.getBoundingClientRect();
    const divRect = div.getBoundingClientRect();

    const distanceToTop = divRect.top - spanRect.top;
    const distanceToBottom = divRect.bottom - spanRect.bottom;

    const distance = Math.min(distanceToTop, distanceToBottom);
    resultArray.push(distance);
  });
  closestToZero(resultArray);
  console.log(closestToZero(resultArray));
}

function closestToZero(numbers) {
  let closest = 0;
  let index;
    
    for (let i = 0; i < numbers.length ; i++) {
        if (closest === 0) {
            closest = numbers[i];
            index = [i];
        } else if (numbers[i] > 0 && numbers[i] <= Math.abs(closest)) {
            closest = numbers[i];
            index = [i];
        } else if (numbers[i] < 0 && - numbers[i] < Math.abs(closest)) {
            closest = numbers[i];
            index = [i];
        }
    }
    
    return [closest, index];
}

function centerReelAnimation(div) {
  
}

function getRandomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// HANDLERS

function handleDaddyButtonClick() {
  runReel();
  setTimeout(() => {
    pauseReel();
    highlightResultsButton();
  }, getRandomNumberBetween(2000, 6000))
}

// EVENTLISTENERS

slotsButton.addEventListener("click", () => {
  handleDaddyButtonClick();
})

slotsButtonPopup.addEventListener("click", () => {
  // resetReel();
  findClosestReelSpan(firstSlot);
})

