import PokemonDisplay from "./display.ts";
const pokemonDisplay = new PokemonDisplay();

let clickedId: string[];
let clickedType: string;

const pageIndicator = document.getElementById(
  "page-indicator-number"
) as HTMLElement;
const nextPageBtn = document.getElementById("next-btn") as HTMLElement;
const backPageBtn = document.getElementById("back-btn") as HTMLElement;
let pageNumber = Number(pageIndicator.textContent);

async function onClick(event: MouseEvent) {
  clickedId = (event.target as Element).id.split("-");
  if (clickedId.includes("pokemon") && clickedId.includes("type")) {
    pageNumber = 1;
    clickedType = clickedId[clickedId.length - 1];
    await pokemonDisplay.displayPokemons(false, 1, clickedType);
    pageIndicator.innerHTML = pageNumber.toString();
    await checkPageNumber(pageNumber);
  }
}

document.body.addEventListener("click", onClick);

nextPageBtn.addEventListener("click", async () => {
  pageNumber++;
  await pokemonDisplay.displayPokemons(
    false,
    pageNumber,
    clickedType == null ? "all" : clickedType
  );
  pageIndicator.innerHTML = pageNumber.toString();
  await checkPageNumber(pageNumber);
});

backPageBtn.addEventListener("click", async () => {
  pageNumber--;
  await pokemonDisplay.displayPokemons(
    false,
    pageNumber,
    clickedType == null ? "all" : clickedType
  );
  pageIndicator.innerHTML = pageNumber.toString();
  await checkPageNumber(pageNumber);
});

async function checkPageNumber(pageNum: number) {
  console.log(`Page number: ${pageNum}`);
  if (pageNum > 1) {
    console.log("removing");
    backPageBtn.classList.remove("hidden");
  } else {
    console.log("adding");
    backPageBtn.classList.add("hidden");
  }
}
