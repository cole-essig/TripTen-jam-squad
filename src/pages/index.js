
const firstSlot = document.querySelector(".slots__first");
const secondSlot = document.querySelector(".slots__second");
const thirdSlot = document.querySelector(".slots__third");

const slotsButton = document.querySelector(".slots__button");

function runReel() {
    firstSlot.classList.add(`slots__first_animation`);
    secondSlot.classList.add(`slots__second_animation`);
    thirdSlot.classList.add(`slots__third_animation`);
};

function stopReel() {
    firstSlot.classList.add(`slots__paused`);
    secondSlot.classList.add(`slots__paused`);
    thirdSlot.classList.add(`slots__paused`)
}

function handleButtonClick() {
  runReel();
  setTimeout(() => {
    stopReel();
  }, 4000)
}

slotsButton.addEventListener("click", () => {
  handleButtonClick();
})