class PokemonApi {
  private POKEMON_API_PARAMS = `?limit=600`;
  public DB_NAME = "pokemonDatabase";
  public DB_VERSION = 1;
  public POKEMON_STORE_NAME = "pokemons";

  // !! API calls
  // * GET: all pokemons
  async getAllPokemons() {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${this.POKEMON_API_PARAMS}`
    );
    const pokemonsJson = await response.json();
    localStorage.setItem("pokemons", JSON.stringify(pokemonsJson));
  }

  // *  required for getAllPokemons()
  async getPokemonInfo(pokeApiUrl: string) {
    const response = await fetch(pokeApiUrl);
    const pokemonInfo = await response.json();
    return pokemonInfo;
  }

  // * GET: pokemon by id
  async getPokemonById(id: number) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemonById = await response.json();
    localStorage.setItem("pokemon", JSON.stringify(pokemonById));
  }

  // * GET: all pokemon types
  async getPokemonTypes() {
    const response = await fetch(`https://pokeapi.co/api/v2/type`);
    const pokemonTypes = await response.json();
    localStorage.setItem("pokemon_types", JSON.stringify(pokemonTypes));
  }
}

export default PokemonApi;
