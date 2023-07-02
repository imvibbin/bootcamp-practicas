// SECTION: >> Imports
import PokemonDisplay from "./display.ts";

class Events {
  // SECTION: >> Instances
  private pokemonDisplay = new PokemonDisplay();

  private clickedId: string[] = [];
  private clickedType: string = "";
  private firstPageLoad: boolean = false;
  private searchPokemonName: string = "";

  private inputSearch = document.querySelector(
    "#input-search-bar"
  ) as HTMLInputElement;
  private buttonSearch = document.querySelector(
    "#button-search"
  ) as HTMLButtonElement;

  private pageIndicator = document.getElementById(
    "page-indicator-number"
  ) as HTMLElement;
  private nextPageBtn = document.getElementById("next-btn") as HTMLElement;
  private backPageBtn = document.getElementById("back-btn") as HTMLElement;
  private pageNumber = Number(this.pageIndicator.textContent);

  constructor() {
    // SECTION: >> EventListener
    // NOTE: when click on tag type execute clickOnTypeTag()
    document.body.addEventListener("click", (event) =>
      this.clickOnTypeTag(event)
    );

    // NOTE: show next 20 pokemons
    this.nextPageBtn.addEventListener("click", async () => {
      this.pageNumber++;
      await this.updatePokemonDOM(this.pageNumber, this.firstPageLoad, "type");
    });

    // NOTE: show previous 20 pokemons
    this.backPageBtn.addEventListener("click", async () => {
      this.pageNumber--;
      await this.updatePokemonDOM(this.pageNumber, this.firstPageLoad, "type");
    });

    // NOTE: search pokemon by name
    // FIX: fix pagination
    this.buttonSearch.addEventListener("click", async () => {
      this.searchPokemonName = this.inputSearch.value;
      await this.updatePokemonDOM(1, this.firstPageLoad, "name");
    });
  }

  // SECTION: >> Methods
  // NOTE: search pokemon by clicked type tag
  async clickOnTypeTag(event: MouseEvent) {
    this.clickedId = (event.target as Element).id.split("-");
    if (this.clickedId.includes("pokemon") && this.clickedId.includes("type")) {
      this.pageNumber = 1;
      this.clickedType = this.clickedId[this.clickedId.length - 1];
      await this.updatePokemonDOM(1, this.firstPageLoad, "type");
    }
  }

  // NOTE: check if there are more pokemons to show, it's a page number controller
  async checkPageNumber(pageNum: number, maxReached: boolean) {
    if (pageNum > 1) this.backPageBtn.classList.remove("hidden");
    else this.backPageBtn.classList.add("hidden");
    if (maxReached) this.nextPageBtn.classList.add("hidden");
    else this.nextPageBtn.classList.remove("hidden");
  }

  // NOTE: updates de pokemon cards depending of the type of filter (NAME or TYPE)
  async updatePokemonDOM(
    pageNumber: number,
    firstPageLoad: boolean,
    filterType: string
  ) {
    if (filterType === "name") {
      const pokemonsJson = await this.pokemonDisplay.filterPokemonByName(
        firstPageLoad,
        pageNumber,
        this.searchPokemonName
      );
      console.log(pokemonsJson);
      this.pageIndicator.innerHTML = this.pageNumber.toString();
      await this.checkPageNumber(this.pageNumber, true);
    }
    if (filterType === "type") {
      const pokemonsJson = await this.pokemonDisplay.filterPokemonByType(
        firstPageLoad,
        pageNumber,
        this.clickedType == "" ? "all" : this.clickedType
      );
      this.pageIndicator.innerHTML = this.pageNumber.toString();
      await this.checkPageNumber(this.pageNumber, pokemonsJson.max_reached);
    }
  }
}

export default Events;
