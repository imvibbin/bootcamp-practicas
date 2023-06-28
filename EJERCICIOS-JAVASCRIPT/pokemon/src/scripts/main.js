// !! Global variables
var poke_params = `?limit=20&offset=0`;
const pokemon = {};
const pokemons = {};
const pokemon_types = {};

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

// * GET: all pokemon types
async function getPokemonTypes() {
  const response = await fetch(`https://pokeapi.co/api/v2/type`);
  const pokemon_types_json = await response.json();
  return pokemon_types_json;
}

async function displayPokemonTypeSearcher() {
  const pokemon_types = await getPokemonTypes();
  const pokemon_type_searcher = document.getElementById("pokemon-searcher");
  for (const type of pokemon_types.results) {
    if (type.name != `shadow` && type.name != `unknown`)
      pokemon_type_searcher.innerHTML += `<div class="mx-auto w-full pokemon-type-tags pokemon-type-${
        type.name
      }">${type.name.charAt(0).toUpperCase() + type.name.slice(1)}</div>`;
  }
  return pokemon_types;
}

async function displayPokemons() {
  const pokemons = await getAllPokemons(poke_params);
  const pokemonContainer = document.getElementById("pokemon-container");
  for (const pokemon of pokemons.pokemons) {
    pokemonContainer.innerHTML += await cardPokemon(pokemon);
  }
  return pokemons;
}

async function pokeTypesDOM(json) {
  let pokemon_type = [];
  json.info.types.map((element) => {
    pokemon_type.push(element.type.name);
  });
  return pokemon_type;
}

async function cardPokemon(json) {
  const pokemon_types = await pokeTypesDOM(json);
  let DOM_content = `<div class="card pokemon-id-${
    json.info.id
  } bg-white dark:bg-slate-800 text-center rounded-lg px-6 py-8 ring-5 ring-slate-900/5 shadow-xl text-white">
    <img src="${
      json.info.sprites.other["official-artwork"].front_default
    }" class="pokemon-img"></img>
    <h2>${json.name.charAt(0).toUpperCase() + json.name.slice(1)}</h2>`;

  let DOM_types = `<div class="pokemon-type">`;
  pokemon_types.map((type) => {
    DOM_types += `
      <div class=" pokemon-type-tags pokemon-type-${type}">${
      type.charAt(0).toUpperCase() + type.slice(1)
    }</div>
    `;
  });
  DOM_types += `</div></div>`;

  return DOM_content + DOM_types;
}

async function display() {
  const change = await displayPokemons();
  const change2 = await displayPokemonTypeSearcher();
  this.pokemons = change;
  this.pokemon_types = change2;
}

display();
