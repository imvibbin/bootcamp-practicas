import ListGenerator from "../utils/listGeneratorUtil.ts";

class PokemonService {
  private _listGenerator = new ListGenerator();

  async filterPokemonByType(
    firstLoad: boolean,
    pageNumber: number,
    pokemonType: string,
    searchByName: boolean
  ) {
    const pokemonList = await this._listGenerator.getPokemonsList(firstLoad);
    const pokemonListByType = pokemonList.filter((pokemonResult: any) => {
      const types = pokemonResult.types.map((type: any) => type.type.name);
      return (
        pokemonType === "all" || types.some((type: any) => type === pokemonType)
      );
    });
    return !searchByName
      ? await this._listGenerator.getPokemonsByPage(
          pageNumber,
          pokemonListByType
        )
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
        ? await this._listGenerator.getPokemonsByPage(
            pageNumber,
            pokemonListByName
          )
        : { pokemons: [], max_reached: true, no_match: true };

    return finalPokemonList;
  }
}

export default PokemonService;
