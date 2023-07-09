// SECTION: >> Imports
import ElementsUI from "../ui/elementsUI.ts";
import DisplayUI from "../ui/displayUI.ts";
import PokemonService from "../services/pokemonService.ts";

class EventsUI {
  // SECTION: >> Instances
  private _elementsUI = new ElementsUI();
  private _displayUI = new DisplayUI();
  private _pokemonService = new PokemonService();

  private _clickedTagId: string[] = [];
  private _pokemonType: string = "";
  private _firstPageLoad: boolean = false;
  private _searchPokemonName: string = "";
  private _timeout: any = 0;

  // NOTE: search elements
  private _inputSearch = document.querySelector(
    "#input-search-bar"
  ) as HTMLInputElement;
  private _pokemonFilterIndicator = document.querySelector(
    "#pokemon-filter-indicator"
  ) as HTMLDivElement;

  // NOTE: page indicator elements
  private _pageIndicator = document.getElementById(
    "page-indicator-number"
  ) as HTMLElement;
  private _nextPageBtn = document.getElementById("next-btn") as HTMLElement;
  private _backPageBtn = document.getElementById("back-btn") as HTMLElement;
  private _pageNumber = Number(this._pageIndicator.textContent);

  constructor() {
    // SECTION: >> EventListener
    // NOTE: when click on tag type execute handleTypeTagClick()
    document.body.addEventListener("click", async (event) => {
      await this.handleTypeTagClick(event);
      await this.removeFilters(event);
    });

    // NOTE: show next 20 pokemons
    this._nextPageBtn.addEventListener("click", async () => {
      this._pageNumber++;
      await this.updatePokemonDOM(
        this._pageNumber,
        this._firstPageLoad,
        "type"
      );
    });

    // NOTE: show previous 20 pokemons
    this._backPageBtn.addEventListener("click", async () => {
      this._pageNumber--;
      await this.updatePokemonDOM(
        this._pageNumber,
        this._firstPageLoad,
        "type"
      );
    });

    // NOTE: search pokemon by name
    this._inputSearch.addEventListener("keyup", async () => {
      this._searchPokemonName = this._inputSearch.value;
      this._pageNumber = 1;
      clearTimeout(this._timeout);
      console.log(`EVENT keyup -> Type: ${this._pokemonType}`);
      this._timeout = setTimeout(async () => {
        await this.updatePokemonDOM(
          this._pageNumber,
          this._firstPageLoad,
          "name"
        );
      }, 300); // 500ms delay
    });
  }

  // SECTION: >> Methods
  // NOTE: search pokemon by clicked type tag
  async handleTypeTagClick(event: MouseEvent) {
    this._clickedTagId = (event.target as Element).id.split("-");
    if (
      this._clickedTagId.includes("pokemon") &&
      this._clickedTagId.includes("type")
    ) {
      this._pageNumber = 1;
      this._pokemonType = this._clickedTagId[this._clickedTagId.length - 1];
      await this.updatePokemonDOM(
        this._pageNumber,
        this._firstPageLoad,
        "name"
      );
    }
  }

  // NOTE: check if there are more pokemons to show, it's a page number controller
  async checkPageButtons(_pageNumber: number, maxReached: boolean) {
    if (_pageNumber > 1) this._backPageBtn.classList.remove("hidden");
    else this._backPageBtn.classList.add("hidden");
    if (maxReached) this._nextPageBtn.classList.add("hidden");
    else this._nextPageBtn.classList.remove("hidden");
  }

  // NOTE: updates de pokemon cards depending of the type of filter (NAME or TYPE)
  // TODO: when there's no match by name show it on DOM
  async updatePokemonDOM(
    pageNumber: number,
    firstPageLoad: boolean,
    filterType: string
  ) {
    let pokemonList;
    const type = this._pokemonType === "" ? "all" : this._pokemonType;

    if (filterType === "name") {
      pokemonList = await this._pokemonService.filterPokemonByName(
        firstPageLoad,
        pageNumber,
        this._searchPokemonName,
        type
      );
    } else if (filterType === "type") {
      pokemonList = await this._pokemonService.filterPokemonByType(
        firstPageLoad,
        pageNumber,
        type,
        false
      );
    }

    await this.showSearchFilters(type, this._searchPokemonName);
    await this.updateDOM(pokemonList, pageNumber);
  }

  async updateDOM(pokemonList: any, pageNumber: number) {
    await this._displayUI.displayPokemons(pokemonList);
    this._pageIndicator.innerHTML = pageNumber.toString();
    await this.checkPageButtons(pageNumber, pokemonList.max_reached);
  }

  async showSearchFilters(pokemonType: string, pokemonName: string) {
    const filterIndicator = await this._elementsUI.createSearchFilterIndicator(
      pokemonType == "" ? "all" : pokemonType,
      pokemonName
    );
    this._pokemonFilterIndicator.innerHTML = filterIndicator;
  }

  // TODO: Create buttons to delete filters
  async removeFilters(event: any) {
    let typeRequest = "";
    const targetId = (event.target as HTMLElement).id;
    const makeRequest =
      targetId != "remove-filter" && targetId != "remove-name" ? false : true;
    if (targetId == "remove-filter") this._pokemonType = "all";
    if (targetId == "remove-name") {
      this._searchPokemonName = "";
      this._inputSearch.value = "";
    }
    if (makeRequest) {
      console.log(`Type to cancel: ${typeRequest}`);
      console.log(
        `EVENT remove filters by ${targetId} -> ${this._pokemonType}`
      );
      await this.updatePokemonDOM(
        (this._pageNumber = 1),
        this._firstPageLoad,
        "name"
      );
    }
    return;
  }
}

export default EventsUI;
