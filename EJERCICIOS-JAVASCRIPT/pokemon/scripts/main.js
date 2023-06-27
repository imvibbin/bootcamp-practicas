// !! Global variables
var poke_params = `?limit=27&offset=0`;
const pokemon = {};
const pokemons = {};

// !! API calls
// * GET: all pokemons
async function getAllPokemons(api_type) {
  const poke_custom_json = { pokemons: [] };
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${api_type}`);
  const pokemons_json = await response.json();
  const pokemonPromises = pokemons_json.results.map((pokemon) =>
    getInfoPokemon(pokemon.url)
  );
  const pokemonResults = await Promise.all(pokemonPromises);
  for (let i = 0; i < pokemons_json.results.length; i++) {
    poke_custom_json["pokemons"].push({
      name: pokemons_json.results[i].name,
      info: pokemonResults[i],
    });
  }
  return poke_custom_json;
}
//
// * function required for getAllPokemons()
async function getInfoPokemon(api) {
  const res = await fetch(api);
  const poke_json = await res.json();
  return poke_json;
}

// * GET: pokemon by id
async function getPokemonById(id) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pokemon_json = await response.json();
  return pokemon_json;
}

async function displayPokemons() {
  const pokemons = await getAllPokemons(poke_params);
  console.log(pokemons.pokemons[0].info.id);
  const pokemonContainer = document.getElementById("pokemon-container");
  for (const pokemon of pokemons.pokemons) {
    pokemonContainer.innerHTML += await cardPokemon(pokemon);
  }
  return pokemons;
}

async function cardPokemon(json) {
  return `
  <div class="card pokemon-id-${json.info.id}">
    <img src="${
      json.info.sprites.other["official-artwork"].front_default
    }" class="pokemon-img"></img>
    <h2>${json.name.charAt(0).toUpperCase() + json.name.slice(1)}</h2>
  </div>
  `;
}

console.log(displayPokemons());
