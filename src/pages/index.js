/* 

testing a change........
const movies = [
  {
    title: "A Nightmare on Elm Street",
    releaseYear: 1984,
    genre: "Horror",
    posterUrl: "https://m.media-amazon.com/images/I/91s-R6LXyXL._AC_SY679_.jpg",
  },
  {
    title: "Tucker and Dale vs Evil",
    releaseYear: 2010,
    genre: "Horror/Comedy",
    posterUrl: "https://m.media-amazon.com/images/I/81G7tNeA1uL._AC_SY679_.jpg",
  },
  {
    title: "The Cabin in the Woods",
    releaseYear: 2012,
    genre: "Horror",
    posterUrl: "https://m.media-amazon.com/images/I/51I94vAv4OL._AC_.jpg",
  },
  {
    title: "Madman",
    releaseYear: 1981,
    genre: "Horror",
    posterUrl: "https://m.media-amazon.com/images/I/61xON9JD8QL._AC_SY679_.jpg",
  },
  {
    title: "The Exorcist",
    releaseYear: 1973,
    genre: "Horror",
    posterUrl:
      "https://m.media-amazon.com/images/I/91qJhHlCJOL._AC_SL1500_.jpg",
  },
  {
    title: "Hereditary",
    releaseYear: 2018,
    genre: "Horror",
    posterUrl: "https://m.media-amazon.com/images/I/71rNJQ2g-EL._AC_SY679_.jpg",
  },
  {
    title: "The Conjuring",
    releaseYear: 2013,
    genre: "Horror",
    posterUrl: "https://m.media-amazon.com/images/I/71dfjCSnRZL._AC_SY679_.jpg",
  },
  {
    title: "It Follows",
    releaseYear: 2014,
    genre: "Horror",
    posterUrl: "https://m.media-amazon.com/images/I/81K9oUeTf5L._AC_SY679_.jpg",
  },
  {
    title: "Get Out",
    releaseYear: 2017,
    genre: "Horror/Thriller",
    posterUrl: "https://m.media-amazon.com/images/I/71c05lTE03L._AC_SY679_.jpg",
  },
  {
    title: "Midsommar",
    releaseYear: 2019,
    genre: "Horror",
    posterUrl: "https://m.media-amazon.com/images/I/81S1bER4uML._AC_SY679_.jpg",
  },
  {
    title: "The Babadook",
    releaseYear: 2014,
    genre: "Horror",
    posterUrl: "https://m.media-amazon.com/images/I/81R8-UzAfkL._AC_SY679_.jpg",
  },
  {
    title: "The Witch",
    releaseYear: 2015,
    genre: "Horror",
    posterUrl: "https://m.media-amazon.com/images/I/81BqnJ-R7kL._AC_SY679_.jpg",
  },
]; */

//consts
const apiKey = "18a0a90996ac6ebc36e2bff53773c810";
const baseUrl = "https://api.themoviedb.org/3";
const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

//Elements
const movieChoiceEl = document.querySelector(".movie__choice");

document.addEventListener("DOMContentLoaded", () => {
  const randomizedButton = document.getElementById("randomize-button");

  //eventListeners
  randomizedButton.addEventListener("click", () => {
    fetchHorrorMovies();
  });

  //Functions
  async function fetchHorrorMovies() {
    const url = `${baseUrl}/discover/movie?api_key=${apiKey}&with_genres=27`;
    const response = await fetch(url);
    const data = await response.json();
    displayRandomMovie(data.results);
  }

  fetchHorrorMovies();

  function displayRandomMovie(movies) {
    const randomMovie = getRandomMovie(movies);
    movieChoiceEl.innerHTML = "";
    const movieElement = getMovieElement(randomMovie);
    movieChoiceEl.prepend(movieElement);
    resizeTitleText();
  }

  function getRandomMovie(movies) {
    const randomIndex = Math.floor(Math.random() * movies.length);
    return movies[randomIndex];
  }
});

function getMovieElement(movie) {
  const movieList = document.createElement("li");

  const details = document.createElement("p");
  details.classList.add('movie__title');
  const releaseYear = movie.release_date
    ? movie.release_date.split("-")[0]
    : "Unknown Year";
  details.textContent = `${movie.title} (${releaseYear})`;
  movieList.appendChild(details);

  //Get the Movie Poster
  if (movie.poster_path) {
    const img = document.createElement("img");
    img.src = `${imageBaseUrl}${movie.poster_path}`;
    img.alt = `${movie.title} poster`;
    img.style.width = "150px";
    movieList.appendChild(img);
  } else {
    const placeholder = document.createElement("p");
    placeholder.textContent = "Poster not available";
    movieList.appendChild(placeholder);
  }
  return movieList;
}

function resizeTitleText() {
  const titleElements = document.querySelectorAll('.movie__title');
  titleElements.forEach(title => {
    const poster = title.nextElementSibling; // Assuming the poster image is the next sibling element
    const posterWidth = poster ? poster.clientWidth : 150; // Get the width of the poster or use 150px as fallback
    let fontSize = parseInt(window.getComputedStyle(title).fontSize, 10);
    const minFontSize = 12; // Set the minimum allowed font size

    // Reduce font size if the text overflows the poster width, down to a minimum size of 12px
    while (title.scrollWidth > posterWidth && fontSize > minFontSize) {
      fontSize--;
      title.style.fontSize = `${fontSize}px`;
    }
  });
}




/* function displayMovieInAllCells(movie) {
  for (let i = 0; i < 3; i++) { // Loop for 3 grid cells
    const movieElement = getMovieElement(movie);
    movieChoiceEl.appendChild(movieElement); // Append to the movieChoice element
  }
}

fetchHorrorMovies().then(() => {
  // Call the function after fetching movies
  const randomMovie = getRandomMovie(movies);
  displayMovieInAllCells(randomMovie);
});
 */


// COLES CODE 
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

