// SECTION: >> Imports
import ElementsUI from "../ui/elementsUI.ts";
import DisplayUI from "../ui/displayUI.ts";
import PokemonService from "../services/pokemonService.ts";

class EventsUI {
  // SECTION: >> Instances
  private _elementsUI = new ElementsUI();
  private _displayUI = new DisplayUI();
  private _pokemonService = new PokemonService();

  private _clickedId: string[] = [];
  private _clickedType: string = "";
  private _firstPageLoad: boolean = false;
  private _searchPokemonName: string = "";
  private _timeout: any = 0;

  private _inputSearch = document.querySelector(
    "#input-search-bar"
  ) as HTMLInputElement;
  private _pokemonFilterIndicator = document.querySelector(
    "#pokemon-filter-indicator"
  ) as HTMLDivElement;

  private _pageIndicator = document.getElementById(
    "page-indicator-number"
  ) as HTMLElement;
  private _nextPageBtn = document.getElementById("next-btn") as HTMLElement;
  private _backPageBtn = document.getElementById("back-btn") as HTMLElement;
  private _pageNumber = Number(this._pageIndicator.textContent);

  constructor() {
    // SECTION: >> EventListener
    // NOTE: when click on tag type execute handleTypeTagClick()
    document.body.addEventListener("click", (event) =>
      this.handleTypeTagClick(event)
    );

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
    this._clickedId = (event.target as Element).id.split("-");
    if (
      this._clickedId.includes("pokemon") &&
      this._clickedId.includes("type")
    ) {
      this._pageNumber = 1;
      this._clickedType = this._clickedId[this._clickedId.length - 1];
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
    _pageNumber: number,
    _firstPageLoad: boolean,
    filterType: string
  ) {
    let pokemonList;
    if (filterType === "name") {
      pokemonList = await this._pokemonService.filterPokemonByName(
        _firstPageLoad,
        _pageNumber,
        this._searchPokemonName,
        this._clickedType == "" ? "all" : this._clickedType
      );
    } else if (filterType === "type") {
      pokemonList = await this._pokemonService.filterPokemonByType(
        _firstPageLoad,
        _pageNumber,
        this._clickedType == "" ? "all" : this._clickedType,
        false
      );
    }
    await this.showSearchFilters(this._clickedType, this._searchPokemonName);
    await this.updateDOM(pokemonList, _pageNumber);
  }

  async updateDOM(pokemonList: any, _pageNumber: number) {
    await this._displayUI.displayPokemons(pokemonList);
    this._pageIndicator.innerHTML = _pageNumber.toString();
    await this.checkPageButtons(_pageNumber, pokemonList.max_reached);
  }

  // TODO: Create buttons to delete filters
  async showSearchFilters(pokemonType: string, pokemonName: string) {
    console.log(`Type: ${pokemonType} heh`);
    const filterIndicator = await this._elementsUI.createSearchFilterIndicator(
      pokemonType == "" ? "all" : pokemonType,
      pokemonName
    );
    console.log(filterIndicator);
    this._pokemonFilterIndicator.innerHTML = filterIndicator;
  }
}

export default EventsUI;
