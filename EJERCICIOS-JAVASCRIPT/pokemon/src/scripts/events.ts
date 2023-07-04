// SECTION: >> Imports
import Dom from "./dom.ts";
import PokemonDisplay from "./display.ts";

class Events {
  // SECTION: >> Instances
  private dom = new Dom();
  private pokemonDisplay = new PokemonDisplay();

  private clickedId: string[] = [];
  private clickedType: string = "";
  private firstPageLoad: boolean = false;
  private searchPokemonName: string = "";
  private timeout: number = 0;

  private inputSearch = document.querySelector(
    "#input-search-bar"
  ) as HTMLInputElement;
  private pokemonFilterIndicator = document.querySelector(
    "#pokemon-filter-indicator"
  ) as HTMLDivElement;

  private pageIndicator = document.getElementById(
    "page-indicator-number"
  ) as HTMLElement;
  private nextPageBtn = document.getElementById("next-btn") as HTMLElement;
  private backPageBtn = document.getElementById("back-btn") as HTMLElement;
  private pageNumber = Number(this.pageIndicator.textContent);

  constructor() {
    // SECTION: >> EventListener
    // NOTE: when click on tag type execute handleTypeTagClick()
    document.body.addEventListener("click", (event) =>
      this.handleTypeTagClick(event)
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

    this.inputSearch.addEventListener("keyup", async () => {
      this.searchPokemonName = this.inputSearch.value;
      this.pageNumber = 1;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(async () => {
        await this.updatePokemonDOM(
          this.pageNumber,
          this.firstPageLoad,
          "name"
        );
      }, 300); // 500ms delay
    });
  }

  // SECTION: >> Methods
  // NOTE: search pokemon by clicked type tag
  async handleTypeTagClick(event: MouseEvent) {
    this.clickedId = (event.target as Element).id.split("-");
    if (this.clickedId.includes("pokemon") && this.clickedId.includes("type")) {
      this.pageNumber = 1;
      this.clickedType = this.clickedId[this.clickedId.length - 1];
      await this.updatePokemonDOM(this.pageNumber, this.firstPageLoad, "name");
    }
  }

  // NOTE: check if there are more pokemons to show, it's a page number controller
  async checkPageButtons(pageNumber: number, maxReached: boolean) {
    if (pageNumber > 1) this.backPageBtn.classList.remove("hidden");
    else this.backPageBtn.classList.add("hidden");
    if (maxReached) this.nextPageBtn.classList.add("hidden");
    else this.nextPageBtn.classList.remove("hidden");
  }

  // NOTE: updates de pokemon cards depending of the type of filter (NAME or TYPE)
  // TODO: when there's no match by name show it on DOM
  async updatePokemonDOM(
    pageNumber: number,
    firstPageLoad: boolean,
    filterType: string
  ) {
    let pokemonList;
    if (filterType === "name") {
      pokemonList = await this.pokemonDisplay.filterPokemonByName(
        firstPageLoad,
        pageNumber,
        this.searchPokemonName,
        this.clickedType == "" ? "all" : this.clickedType
      );
    } else if (filterType === "type") {
      pokemonList = await this.pokemonDisplay.filterPokemonByType(
        firstPageLoad,
        pageNumber,
        this.clickedType == "" ? "all" : this.clickedType,
        false
      );
    }
    await this.showSearchFilters(this.clickedType, this.searchPokemonName);
    await this.updateDOM(pokemonList, pageNumber);
  }

  async updateDOM(pokemonList: any, pageNumber: number) {
    await this.pokemonDisplay.displayPokemons(pokemonList);
    this.pageIndicator.innerHTML = pageNumber.toString();
    await this.checkPageButtons(pageNumber, pokemonList.max_reached);
  }

  async showSearchFilters(pokemonType: string, pokemonName: string) {
    console.log(`Type: ${pokemonType} heh`);
    const filterIndicator = await this.dom.createSearchFilterIndicator(
      pokemonType == "" ? "all" : pokemonType,
      pokemonName
    );
    console.log(filterIndicator);
    this.pokemonFilterIndicator.innerHTML = filterIndicator;
  }
}

export default Events;
