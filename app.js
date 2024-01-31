// Add this script in your HTML file or link to an external script

const daysElement = document.querySelector('.timer:nth-child(1) .flip-card');
const hoursElement = document.querySelector('.timer:nth-child(2) .flip-card');
const minutesElement = document.querySelector('.timer:nth-child(3) .flip-card');
const secondsElement = document.querySelector('.timer:nth-child(4) .flip-card');

function updateTimer() {
  let previous;
  setInterval(() => {
    const launchDate = new Date().setHours(new Date().getHours() + 2080);
    const currentDate = new Date();
    const timeDifference = Math.floor((launchDate - currentDate) / 1000);
    if (timeDifference !== previous) {
      flipTheCards(timeDifference);
    }
    previous = timeDifference
  }, 1000); // updates the timedifference every 1000 milliseconds and calls flipTheCards if the time difference has changed since the previous check.
}

updateTimer();


function flipTheCards(time) {
  const days = Math.floor(time / (24 * 3600));
  const hours = Math.floor((time / 3600) % 24);
  const minutes = Math.floor((time / 60) % 60);
  const seconds = Math.floor(time % 60);

  flipCards(daysElement, days);
  flipCards(hoursElement, hours);
  flipCards(minutesElement, minutes);
  flipCards(secondsElement, seconds);
}

function flipCards(flipCards, time) {
  // ensures the time variable is represented as a string with at leasat 2 characters.
  // So if the time is 9, padstart method adds a leading zero to make it 09
  time = String(time).padStart(2, '0');
  const currentValue = flipCards.querySelector('.top').innerText;
  if (time == currentValue) return;

  const flipTop = document.createElement('div');
  flipTop.classList.add('card-flip-top');
  flipTop.innerText = currentValue;

  const flipBottom = document.createElement('div');
  flipBottom.classList.add('card-flip-bottom');
  flipBottom.innerText = time;

  const topHalf = flipCards.querySelector('.top');
  const bottomhalf = flipCards.querySelector('.bottom');

  flipTop.addEventListener('animationstart', () => {
    topHalf.innerText = time;
  });

  flipTop.addEventListener('animationend', () => {
    flipTop.remove();
  });

  flipBottom.addEventListener('animationend', () => {
    bottomhalf.innerText = time;
    flipBottom.remove();
  });
  flipCards.appendChild(flipTop);
  flipCards.appendChild(flipBottom);

}
