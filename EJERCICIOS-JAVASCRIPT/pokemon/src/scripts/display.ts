// SECTION: >> IMPORTS
import PokemonApi from "./calls.ts";
import Dom from "./dom.ts";

class PokemonDisplay {
  private dom = new Dom();
  private pokemonApi = new PokemonApi();
  private mainPokeType = document.getElementById(
    "pokemon-type-tag"
  ) as HTMLElement;
  private divPokeTypeSearcher = document.getElementById(
    "pokemon-type-tag-searcher"
  ) as HTMLElement;
  private pokemonContainer = document.getElementById(
    "pokemon-container"
  ) as HTMLElement;

  // SECTION: >> METHODS
  // NOTE: filter pokemons by type
  async filterPokemonByType(
    firstLoad: boolean,
    pageNumber: number,
    pokemonType: string,
    searchByName: boolean
  ) {
    const pokemonList = await this.getPokemonsList(firstLoad);
    const pokemonListByType = pokemonList.filter((pokemonResult: any) => {
      const types = pokemonResult.types.map((type: any) => type.type.name);
      return (
        pokemonType === "all" || types.some((type: any) => type === pokemonType)
      );
    });
    return !searchByName
      ? await this.getPokemonsByPage(pageNumber, pokemonListByType)
      : { pokemons: pokemonListByType };
  }

  // NOTE: filtering pokemon by name
  // HACK: improve control of name (if there's no match then make a warning on DOM)
  async filterPokemonByName(
    firstLoad: boolean,
    pageNumber: number,
    pokemonName: string,
    pokemonType: string
  ) {
    const pokemonListByType = await this.filterPokemonByType(
      firstLoad,
      pageNumber,
      pokemonType,
      true
    );
    console.log(pokemonListByType);
    const pokemonListByName = pokemonListByType.pokemons.filter(
      (pokemonInfo: any) => {
        return pokemonInfo.name
          .toLowerCase()
          .includes(pokemonName.toLowerCase());
      }
    );

    const finalPokemonList =
      pokemonListByName.length != 0
        ? await this.getPokemonsByPage(pageNumber, pokemonListByName)
        : { pokemons: [], max_reached: true, no_match: true };

    return finalPokemonList;
  }

  // NOTE: displays all available pokemons
  async getPokemonsList(firstLoad: boolean) {
    if (firstLoad && !localStorage.getItem("pokemons")) {
      await this.pokemonApi.getAllPokemons();
    }
    const pokemonsJSON = localStorage.getItem("pokemons")
      ? JSON.parse(localStorage.getItem("pokemons") as string)
      : null;
    const customJsonPokemons = await this.getCustomPokemonsList(pokemonsJSON);
    return customJsonPokemons;
  }

  // NOTE: creates a custom with the pokemons that we need to show
  async getCustomPokemonsList(pokemonsJson: any) {
    const pokemonPromises = pokemonsJson.results.map((pokemon: any) =>
      this.pokemonApi.getPokemonInfo(pokemon.url)
    );
    const pokemonInfoList = await Promise.all(pokemonPromises);
    return pokemonInfoList;
  }

  // NOTE: getting a JSON with only 20 pokemons
  async getPokemonsByPage(pageNumber: number, pokemonListByType: any) {
    const POKEMONS_PER_PAGE = 20;
    const startIndex =
      pageNumber > 0 ? POKEMONS_PER_PAGE * (pageNumber - 1) : 0;
    const endIndex = startIndex + POKEMONS_PER_PAGE;
    const pokemonsToShow = {
      pokemons: pokemonListByType.slice(startIndex, endIndex),
      max_reached: endIndex > pokemonListByType.length ? true : false,
    };
    return pokemonsToShow;
  }

  async displayPokemons(pokemons: any) {
    let htmlString = "";
    for (const pokemon of pokemons.pokemons) {
      htmlString += await this.dom.createCardPokemon(pokemon);
    }
    this.pokemonContainer.innerHTML = htmlString;
  }

  // NOTE: displays all pokemon type tags on DOM
  async displayPokemonType() {
    if (!localStorage.getItem("pokemon_types")) {
      await this.pokemonApi.getPokemonTypes();
    }
    const pokemonsTypesJSON = localStorage.getItem("pokemon_types")
      ? JSON.parse(localStorage.getItem("pokemon_types") as string)
      : null;
    await this.dom.createTagTypeSearcher(
      pokemonsTypesJSON,
      this.mainPokeType,
      this.divPokeTypeSearcher
    );
  }

  // NOTE: shows all pokemon types and pokemons
  async displayOnLoad() {
    await this.displayPokemonType();
    const pokemonList = await this.filterPokemonByType(true, 1, "all", false);
    await this.displayPokemons(pokemonList);
  }
}

export default PokemonDisplay;
