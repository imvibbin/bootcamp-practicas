import * as API from "./calls.js";

const pokemonSearcher = document.getElementById("pokemon-searcher");
document.addEventListener("click", (event) => {
  const clickedElement = event.target;
  const clickedElementId = clickedElement.id;
});

const pageIndicatorContainer = document.getElementById("page-indicator");
const pageIndicator = document.getElementById("page-indicator-number");
const nextPageBtn = document.getElementById("next-btn");
const backPageBtn = document.getElementById("back-btn");
var pageNumber = Number(pageIndicator.textContent);

// Page Indicator
const observer = new MutationObserver(() => {
  if (pageNumber > 1) {
    backPageBtn.classList.remove("hidden");
  } else {
    backPageBtn.classList.add("hidden");
  }
});
observer.observe(pageIndicator, { childList: true });

nextPageBtn.addEventListener("click", async () => {
  pageNumber++;
  await API.displayPokemons(pageNumber, "all");
  pageIndicator.innerHTML = pageNumber;
});

backPageBtn.addEventListener("click", async () => {
  pageNumber--;
  await API.displayPokemons(pageNumber, "all");
  pageIndicator.innerHTML = pageNumber;
});
