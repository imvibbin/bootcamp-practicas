import PokemonApi from "../api/pokemonApi.ts";

class ListGenerator {
  private _pokemonApi = new PokemonApi();

  // NOTE: displays all available pokemons
  async getPokemonsList(firstLoad: boolean) {
    if (firstLoad && !localStorage.getItem("pokemons")) {
      await this._pokemonApi.getAllPokemons();
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
      this._pokemonApi.getPokemonInfo(pokemon.url)
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
}

export default ListGenerator;
