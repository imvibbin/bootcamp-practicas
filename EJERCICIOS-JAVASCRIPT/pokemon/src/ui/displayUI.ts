import ElementsUI from "./elementsUI.ts";
import PokemonService from "../services/pokemonService.ts";
import PokemonApi from "../api/pokemonApi.ts";

class DisplayUI {
  private _elementsUI = new ElementsUI();
  private _pokemonService = new PokemonService();
  private _pokemonApi = new PokemonApi();

  private mainPokeType = document.getElementById(
    "pokemon-type-tag"
  ) as HTMLElement;
  private divPokeTypeSearcher = document.getElementById(
    "pokemon-type-tag-searcher"
  ) as HTMLElement;
  private pokemonContainer = document.getElementById(
    "pokemon-container"
  ) as HTMLElement;

  async displayPokemons(pokemons: any) {
    let htmlString = "";
    for (const pokemon of pokemons.pokemons) {
      htmlString += await this._elementsUI.createCardPokemon(pokemon);
    }
    this.pokemonContainer.innerHTML = htmlString;
  }

  // NOTE: displays all pokemon type tags on DOM
  async displayPokemonType() {
    if (localStorage.getItem("pokemon_types")) await this._pokemonApi.getPokemonTypes();
    const pokemonTypeList = localStorage.getItem("pokemon_types")
      ? JSON.parse(localStorage.getItem("pokemon_types") as string)
      : null;
    console.log(pokemonTypeList)
    await this._elementsUI.createTagTypeSearcher(
      pokemonTypeList,
      this.mainPokeType,
      this.divPokeTypeSearcher
    );
  }

  // NOTE: shows all pokemon types and pokemons
  async displayOnLoad() {
    const pokemonFilterIndicator = document.querySelector(
      "#pokemon-filter-indicator"
    ) as HTMLDivElement;

    await this.displayPokemonType();
    const pokemonList = await this._pokemonService.filterPokemonByType(
      true,
      1,
      "all",
      false
    );
    // HACK: if its possible make an alternative of this
    pokemonFilterIndicator.innerHTML =
      await this._elementsUI.createSearchFilterIndicator("all", "");
    await this.displayPokemons(pokemonList);
  }
}

export default DisplayUI;
