const pokemonsJSON = JSON.parse(localStorage.getItem("pokemons"));
var pokemonApiParams = `?limit=200`;

// !! API calls
// * GET: all pokemons
async function getAllPokemons(api_type) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${api_type}`);
  const pokemonsJson = await response.json();
  localStorage.setItem("pokemons", JSON.stringify(pokemonsJson));
}

// * function required for getAllPokemons()
async function getInfoPokemon(api) {
  const response = await fetch(api);
  const pokemonInfo = await response.json();
  return pokemonInfo;
}

// * GET: pokemon by id
async function getPokemonById(id) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pokemonById = await response.json();
  localStorage.setItem("pokemon", JSON.stringify(pokemonById));
}

// * GET: all pokemon types
async function getPokemonTypes() {
  const response = await fetch(`https://pokeapi.co/api/v2/type`);
  const pokemonTypes = await response.json();
  localStorage.setItem("pokemon_types", JSON.stringify(pokemonTypes));
}

async function displayPokemonTypeSearcher() {
  await getPokemonTypes();
  const pokemonTypes = JSON.parse(localStorage.getItem("pokemon_types"));
  const pokemonSearcherDOM = document.getElementById("pokemon-searcher");
  for (const type of pokemonTypes.results) {
    if (type.name != `shadow` && type.name != `unknown`)
      pokemonSearcherDOM.innerHTML += `<div class="mx-auto w-full pokemon-type-tags pokemon-type-${
        type.name
      }">${type.name.charAt(0).toUpperCase() + type.name.slice(1)}</div>`;
  }
  return pokemonTypes;
}

async function displayPokemons(numPages, type) {
  // api call that stores stringified json on cache
  if (numPages > 0) await getAllPokemons(pokemonApiParams);
  const pokemonContainer = document.getElementById("pokemon-container");
  const customJsonPokemons = await createCustomPokemonsJson(
    pokemonsJSON,
    numPages,
    type
  );

  let eraseDOMContent = false;
  for (const pokemon of customJsonPokemons.pokemons) {
    if (numPages > 0 && !eraseDOMContent) {
      pokemonContainer.innerHTML = await cardPokemon(pokemon);
      eraseDOMContent = true;
    } else {
      pokemonContainer.innerHTML += await cardPokemon(pokemon);
    }
  }
  return customJsonPokemons;
}

async function createCustomPokemonsJson(json, numPage, type) {
  const customJsonPokemons = { pokemons: [] };
  const pokemonPromises = json.results.map((pokemon) =>
    getInfoPokemon(pokemon.url)
  );
  const pokemonResults = await Promise.all(pokemonPromises);

  let pokemonsToSelect = numPage != 0 ? 20 * numPage : 20;
  let pokemonsToShow = pokemonsToSelect > 20 ? pokemonsToSelect - 20 : 0;

  for (pokemonsToShow; pokemonsToShow < pokemonsToSelect; pokemonsToShow++) {
    if (type == "all") {
      customJsonPokemons["pokemons"].push({
        name: json.results[pokemonsToShow].name,
        info: pokemonResults[pokemonsToShow],
      });
    }
  }
  console.log(customJsonPokemons);
  return customJsonPokemons;
}

async function pokeTypesDOM(json) {
  let pokemonType = [];
  json.info.types.map((element) => {
    pokemonType.push(element.type.name);
  });
  return pokemonType;
}

async function getPokemonsByType(type) {}

async function cardPokemon(json) {
  const pokemonTypes = await pokeTypesDOM(json);
  let DOM_content = `<div class="card pokemon-id-${
    json.info.id
  } bg-white dark:bg-slate-800 text-center rounded-lg px-6 py-8 ring-5 ring-slate-900/5 shadow-xl text-white">
    <img src="${
      json.info.sprites.other["official-artwork"].front_default
    }" class="pokemon-img"></img>
    <h2>${json.name.charAt(0).toUpperCase() + json.name.slice(1)}</h2>`;

  let DOM_types = `<div class="pokemon-type">`;
  pokemonTypes.map((type) => {
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
  await displayPokemonTypeSearcher();
  await displayPokemons(0);
}

export {
  getAllPokemons,
  getPokemonById,
  getPokemonTypes,
  display,
  displayPokemons,
};
