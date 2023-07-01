import PokemonApi from "./calls.ts";
import Dom from "./dom.ts";

class PokemonDisplay {
  private pokemonApi = new PokemonApi();
  private dom = new Dom();

  async displayPokemonType() {
    await this.pokemonApi.getPokemonTypes();
    const pokemonsTypesJSON = localStorage.getItem("pokemon_types")
      ? JSON.parse(localStorage.getItem("pokemon_types") as string)
      : null;
    const mainPokeType = document.getElementById(
      "pokemon-type-tag"
    ) as HTMLElement;
    const divPokeTypeSearcher = document.getElementById(
      "pokemon-type-tag-searcher"
    ) as HTMLElement;
    await this.dom.createTagTypeSearcher(
      pokemonsTypesJSON,
      mainPokeType,
      divPokeTypeSearcher
    );
    return pokemonsTypesJSON;
  }

  async displayPokemons(onLoad: boolean, numPages: number, type: string) {
    if (onLoad) await this.pokemonApi.getAllPokemons();
    const pokemonsJSON = localStorage.getItem("pokemons")
      ? JSON.parse(localStorage.getItem("pokemons") as string)
      : null;
    const pokemonContainer = document.getElementById(
      "pokemon-container"
    ) as HTMLElement;
    const customJsonPokemons = await this.createCustomPokemonsJson(
      pokemonsJSON,
      numPages,
      type
    );

    let eraseDOMContent = false;
    for (const pokemon of customJsonPokemons) {
      if (numPages > 0 && !eraseDOMContent) {
        pokemonContainer.innerHTML = await this.dom.createCardPokemon(pokemon);
        eraseDOMContent = true;
      } else {
        pokemonContainer.innerHTML += await this.dom.createCardPokemon(pokemon);
      }
    }
    return customJsonPokemons;
  }

  async createCustomPokemonsJson(
    pokemonsJson: any,
    pageNumber: number,
    pokemonType: string
  ) {
    const POKEMONS_PER_PAGE = 20;
    const pokemonPromises = pokemonsJson.results.map((pokemon: any) =>
      this.pokemonApi.getPokemonInfo(pokemon.url)
    );
    const pokemonResults = await Promise.all(pokemonPromises);

    const pokemonsFilteredByType = pokemonResults.filter((pokemonResult) => {
      const types = pokemonResult.types.map((type: any) => type.type.name);
      return (
        pokemonType === "all" || types.some((type: any) => type === pokemonType)
      );
    });

    const startIndex =
      pageNumber > 0 ? POKEMONS_PER_PAGE * (pageNumber - 1) : 0;
    const endIndex = startIndex + POKEMONS_PER_PAGE;
    const pokemonsToShow = pokemonsFilteredByType.slice(startIndex, endIndex);

    console.log(`Start: ${startIndex}`);
    console.log(`End: ${endIndex}`);
    return pokemonsToShow;
  }

  async display() {
    await this.displayPokemonType();
    await this.displayPokemons(true, 1, "all");
  }
}

export default PokemonDisplay;
