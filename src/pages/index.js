
//consts
const apiKey = "18a0a90996ac6ebc36e2bff53773c810";
const baseUrl = "https://api.themoviedb.org/3";
const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

//Elements
const movieChoiceEl = document.querySelector(".movie__choice");

document.addEventListener("DOMContentLoaded", () => {
  // const randomizedButton = document.getElementById("randomize-button");

  //eventListeners
  slotsButtonPopup.addEventListener("click", () => {
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
    // resizeTitleText();
  }

  function getRandomMovie(movies) {
    const randomIndex = Math.floor(Math.random() * movies.length);
    return movies[randomIndex];
  }
});

function getMovieElement(movie) {
  const movieList = document.createElement("li");

  if (movie.poster_path) {
    const img = document.createElement("img");
    img.classList.add("movie__img")
    img.src = `${imageBaseUrl}${movie.poster_path}`;
    img.alt = `${movie.title} poster`;
    movieList.appendChild(img);
  } else {
    const placeholder = document.createElement("p");
    placeholder.textContent = "Poster not available";
    movieList.appendChild(placeholder);
  }
  // GET MOVIE TITLE

  const details = document.createElement("p");
  details.classList.add('movie__title');
  const releaseYear = movie.release_date
    ? movie.release_date.split("-")[0]
    : "Unknown Year";
  details.textContent = `${movie.title} (${releaseYear})`;
  movieList.appendChild(details);

  return movieList;
}

// function resizeTitleText() {
//   const titleElements = document.querySelectorAll('.movie__title');
//   titleElements.forEach(title => {
//     const poster = title.nextElementSibling; // Assuming the poster image is the next sibling element
//     const posterWidth = poster ? poster.clientWidth : 150; // Get the width of the poster or use 150px as fallback
//     let fontSize = parseInt(window.getComputedStyle(title).fontSize, 10);
//     const minFontSize = 12; // Set the minimum allowed font size

//     // Reduce font size if the text overflows the poster width, down to a minimum size of 12px
//     while (title.scrollWidth > posterWidth && fontSize > minFontSize) {
//       fontSize--;
//       title.style.fontSize = `${fontSize}px`;
//     }
//   });
// }

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
const cards = document.querySelector(".cards");
const recipeImg = document.querySelector(".recipe__image");
const drinksImg = document.querySelector(".drink__image");
const recipeTitle = document.querySelector(".recipe__title");
const drinkTitle = document.querySelector(".recipe__title");

const slotsButton = document.querySelector(".slots__button");
const slotsButtonPopup = document.querySelector(".slots__button_popup");
const slotsButtonPopupAnimation = document.querySelector(".slots__button_popup_animation");

let drinkData = {};
let recipeData = {};

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

function randomPicker(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  const data = arr[randomIndex];
  return data;
}

function updateCards(element, cardTitle, cardImage) {
  cardTitle.textContent = element.title;
  cardImage.src = element.posterUrl;
  cardImage.alt = element.title;
}

// HANDLERS

function handleDaddyButtonClick() {
  runReel();
  cards.classList.remove("cards_opened");
  setTimeout(() => {
    highlightResultsButton();
    getCoinReward(firstSlot, secondSlot, thirdSlot);
  }, getRandomNumberBetween(3000, 7000))
}

function overlayActive() {
    const pageOverlay = document.querySelector(".main__content");
    pageOverlay.classList.add(".main__content_active");
}

// EVENTLISTENERS

slotsButton.addEventListener("click", () => {
  handleDaddyButtonClick();
  overlayActive();
})

slotsButtonPopup.addEventListener("click", () => {
  resetReel();
  drinkData = randomPicker(drinks);
  recipeData = randomPicker(recipes);
  updateCards(drinkData, drinkTitle, drinksImg);
  updateCards(recipeData, recipeTitle, recipeImg);
  cards.classList.add("cards_opened");
})

//  Recipes and Drinks
const recipes = [
  {
    title: “Maple Crunch Popcorn”,
    imageUrl: “https://www.tasteofhome.com/wp-content/uploads/2018/01/Maple-Crunch-Popcorn_exps49262_CX2376979A09_14_6b_RMSpg-2.jpg?fit=700,700”,
    description: “This medley of popcorn and pecans covered in a sweet and buttery coating is the perfect sweet and crispy indulgence!”,
    link: “https://www.tasteofhome.com/recipes/maple-crunch-popcorn/”
    },
    {
      title: “Candy Corn & Peanut Popcorn Balls”,
      imageUrl: “https://www.tasteofhome.com/wp-content/uploads/2018/01/Candy-Corn-Peanut-Popcorn-Balls_exps118007_HC143213D10_30_1bC_RMS.jpg?fit=1024,1024”,
      description: “Sweet, salty, and crunchy, these Candy Corn & Peanut Popcorn Balls combine buttery popcorn, creamy peanuts, and festive candy corn for the ultimate fall treat!”,
      link: “https://www.tasteofhome.com/wp-content/uploads/2018/01/Candy-Corn-Peanut-Popcorn-Balls_exps118007_HC143213D10_30_1bC_RMS.jpg?fit=1024,1024”
    },
    {
      title: “Pumpkin Snack Mix”,
      imageUrl: “https://www.tasteofhome.com/wp-content/uploads/2018/01/Pumpkin-Snack-Mix_EXPS_PCBBZ18_38857_C04_27_1b-5.jpg?fit=696,696”,
      description: “Packed with popcorn, crunchy cereal, salted peanuts, and sweet candy pumpkins, this Pumpkin Snack Mix is a perfect blend of sweet and salty fall flavors!”,
      link: “https://www.tasteofhome.com/recipes/pumpkin-snack-mix/”
    },
    {
      title: “Turtle Chips”,
      imageUrl: “https://www.tasteofhome.com/wp-content/uploads/2018/01/Turtle-Chips_EXPS_CMZ18_90756_C10_27_5b-1.jpg?fit=700,700”,
      description: “Salty-sweet, crunchy-chewy—so many sensations in one delectable bite. This is the absolute easiest recipe to make!”,
      link: “https://www.tasteofhome.com/recipes/turtle-chips/”
    },
    {
      title: “Movie Night Snacks | Sweet & Salty Snack Board”,
      imageUrl: “https://pizzazzerie.com/wp-content/uploads/2021/06/Movie-Night-Popcorn-Board43.jpg”,
      description: “Sweet and salty favorites like popcorn, fruit, candy, treats… we’ve got it all in this movie night snack board!”,
      link: “https://pizzazzerie.com/recipes/movie-night-snacks/”
    },
    {
      title: “Pumpkin Chocolate Chip Cookies”,
      imageUrl: “https://www.chelseasmessyapron.com/wp-content/uploads/2015/10/Pumpkin-Chocolate-Chip-Cookies-1.jpg”,
      description: “The best ever Pumpkin Chocolate Chip Cookies! These cookies are soft and chewy with crisp edges instead of typical cake-like pumpkin cookies.”,
      link: “https://www.chelseasmessyapron.com/non-cakey-pumpkin-spice-chocolate-chip-cookies/”
    },
    {
      title: “Pumpkin Cheesecake Truffles”,
      imageUrl: “https://cashmereandcocktails.com/wp-content/uploads/2020/09/pumpkin-truffles-6.jpg”,
      description: “Indulge in creamy, spiced pumpkin cheesecake wrapped in a smooth white chocolate shell with these irresistible Pumpkin Cheesecake Truffles!”,
      link: “https://cashmereandcocktails.com/2020/09/17/pumpkin-cheesecake-truffles/”
    },
    {
      title: “Simmered to perfection in a cozy crockpot, this Starbucks-inspired apple cider is a warm blend of sweet apples, fragrant spices, and comforting fall flavors!”,
      imageUrl: “https://inspiredbycharm.com/wp-content/uploads/2022/09/bowl-Sweet-and-Salty-Fall-Snack-Mix.jpg”,
      description: “With a perfect blend of sweet, salty, and crunchy, this snack mix combines peanut butter-flavored Chex, cheesy crackers, marshmallows, and festive candy corn for an irresistible fall treat!”,
      link: “https://inspiredbycharm.com/sweet-and-salty-fall-snack-mix/”
    },
    {
      title: “Pumpkin Roll”,
      imageUrl: “https://sallysbakingaddiction.com/wp-content/uploads/2022/10/pumpkin-roll-cream-cheese-frosting.jpg”,
      description: “Soft, spiced pumpkin cake rolled with a creamy, sweet cream cheese filling, this Pumpkin Roll is the ultimate fall dessert that melts in your mouth!”,
      link: “https://sallysbakingaddiction.com/pumpkin-roll/”
    },
    {
      title: “Crack Dip”,
      imageUrl: “https://www.julieseatsandtreats.com/wp-content/uploads/2023/12/DSC05480-1024x1536.jpg”,
      description: “Perfect for a cozy fall movie night, this Crack Dip is a creamy, cheesy, and irresistibly addictive blend of flavors that will have everyone reaching for more!”,
      link: “https://www.julieseatsandtreats.com/crack-dip/”
    },
];

const drinks = [
  {
    title: “Crock Pot Pumpkin Spice White Hot Chocolate”,
    imageUrl: “https://www.anightowlblog.com/wp-content/uploads/2015/09/Pumpkin-Spice-White-Hot-Chocolate-HERO.jpg”,
    description: “Crock Pot Pumpkin Spice White Hot Chocolate is just three ingredients and is so easy to make! Perfect for a chilly fall evening!”,
    link: “https://www.anightowlblog.com/crock-pot-pumpkin-spice-white-hot-chocolate/#_a5y_p=4432296”
  },
  {
    title: “Pumpkin Milkshakes”,
    imageUrl: “https://butterwithasideofbread.com/wp-content/uploads/2021/09/Pumpkin-Milkshakes-3.jpg”,
    description: “Rich, creamy, and bursting with fall spices, these Pumpkin Milkshakes are the ultimate autumn treat in a glass!”,
    link: “https://butterwithasideofbread.com/pumpkin-milkshakes/”
  },
  {
    title: “Starbuck’s Caramel Apple Cider – Copycat Recipe”,
    imageUrl: “https://i.pinimg.com/564x/b0/11/09/b01109ce2658bc7091a60bc117b186a8.jpg”,
    description: “Simmered to perfection in a cozy crockpot, this Starbucks-inspired apple cider is a warm blend of sweet apples, fragrant spices, and comforting fall flavors!”,
    link: “https://www.scatteredthoughtsofacraftymom.com/starbucks-knock-off-caramel-apple/”
  },
  {
    title: “Hocus Pocus Punch”,
    imageUrl: “https://www.howsweeteats.com/wp-content/uploads/2019/10/hocus-pocus-punch-3.jpg”,
    description: “With a magical mix of apple cider, cranberry juice, and a splash of ginger ale, this Hocus Pocus Punch is a fruity, fizzy fall movie night delight that’s as enchanting as it is refreshing!”,
    link: “https://www.howsweeteats.com/2019/10/hocus-pocus-punch-p-s-its-a-mocktail/”
  },
  {
    title: “Harry Potter Butterbeer”,
    imageUrl: “https://www.favfamilyrecipes.com/wp-content/uploads/2019/05/Butterbeer-8.jpg”,
    description: “Warm, creamy, and spiced with a hint of butterscotch, this magical Butterbeer recipe is the perfect cozy treat for a fall night!”,
    link: “https://www.favfamilyrecipes.com/butterbeer/”
  },
  {
    title: “Sparkling Pomegranate Cider Punch”,
    imageUrl: “https://www.howsweeteats.com/wp-content/uploads/2017/09/pomegranate-cider-punch-I-howsweeteats.com-13.jpg”,
    description: “Crisp apple cider, sparkling pomegranate soda, and a dash of ginger fizz blend with autumn spices and fresh fruit for a refreshing and festive punch perfect for a cozy fall movie night!”,
    link: “https://www.howsweeteats.com/2017/10/pomegranate-cider-punch-sparkling/”
  },
  {
    title: “Delicious Apple Cider Float”,
    imageUrl: “https://www.designdazzle.com/wp-content/uploads/2023/08/17.jpg”,
    description: “Sweet, spiced apple cider topped with creamy vanilla ice cream creates the ultimate fall-inspired float, perfect for a cozy movie night treat!”,
    link: “https://www.designdazzle.com/delicious-apple-cider-float/”
  },
  {
    title: “Pumpkin Juice”,
    imageUrl: “https://thetoastykitchen.com/wp-content/uploads/2020/08/pumpkin-juice-toasty-kitchen-4.jpg”,
    description: “Pumpkin juice is a lightly spiced fruit juice made with apple cider, apricot nectar, pumpkin puree, and cozy fall spices. Serve it chilled over ice or warmed up in a mug!”,
    link: “https://thetoastykitchen.com/pumpkin-juice/”
  },
  {
    title: “Caramel Apple Punch”,
    imageUrl: “https://thecarefreekitchen.com/wp-content/uploads/2021/11/Caramel-Apple-Punch-4-768x1152.jpg”,
    description: “This Caramel Apple Cider Punch is the perfect fall drink, made with apple cider, ginger ale, caramel sauce, and fall spices and tastes just as good as it looks.”,
    link: “https://thecarefreekitchen.com/caramel-apple-punch/”
  },
  {
    title: “Caramel Apple Sangria”,
    imageUrl: “https://mommakesdinner.com/wp-content/uploads/2022/09/Caramel-apple-sangria-18-768x1152.jpg”,
    description: “Sweet caramel and crisp apple flavors swirl together with a splash of white wine, creating a luscious, autumn-inspired sangria perfect for sipping during a fall movie night!”,
    link: “https://mommakesdinner.com/caramel-apple-sangria/”
  },

];