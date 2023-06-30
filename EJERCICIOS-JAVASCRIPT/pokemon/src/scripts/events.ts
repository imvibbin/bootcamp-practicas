import * as Calls from "./calls.js";

const pageIndicator = document.getElementById(
  "page-indicator-number"
) as HTMLElement;
const nextPageBtn = document.getElementById("next-btn") as HTMLElement;
const backPageBtn = document.getElementById("back-btn") as HTMLElement;
let pageNumber = Number(pageIndicator.textContent);

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
  await Calls.displayPokemons(pageNumber, "all");
  pageIndicator.innerHTML = pageNumber.toString();
});

backPageBtn.addEventListener("click", async () => {
  pageNumber--;
  await Calls.displayPokemons(pageNumber, "all");
  pageIndicator.innerHTML = pageNumber.toString();
});
