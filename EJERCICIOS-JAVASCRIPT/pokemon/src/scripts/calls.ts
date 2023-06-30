interface Pokemon {
  name: string;
  info: any;
}

interface CustomJsonPokemons {
  pokemons: Pokemon[];
}

const pokemonApiParams = `?limit=200`;
const pokemonsJSON = localStorage.getItem("pokemons")
  ? JSON.parse(localStorage.getItem("pokemons") as string)
  : null;
const pokemonsTypesJSON = localStorage.getItem("pokemon_types")
  ? JSON.parse(localStorage.getItem("pokemon_types") as string)
  : null;

// !! API calls
// * GET: all pokemons
async function getAllPokemons(api_type: string) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${api_type}`);
  const pokemonsJson = await response.json();
  localStorage.setItem("pokemons", JSON.stringify(pokemonsJson));
}

// * function required for getAllPokemons()
async function getInfoPokemon(api: string) {
  const response = await fetch(api);
  const pokemonInfo = await response.json();
  return pokemonInfo;
}

// * GET: pokemon by id
async function getPokemonById(id: number) {
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

async function displayPokemonType() {
  await getPokemonTypes();
  const pokemonSearcher = document.getElementById(
    "pokemon-searcher"
  ) as HTMLElement;
  for (const type of pokemonsTypesJSON.results) {
    if (type.name != `shadow` && type.name != `unknown`)
      pokemonSearcher.innerHTML += `<div class="mx-auto w-100 pokemon-type-tags pokemon-type-${
        type.name
      }">${type.name.charAt(0).toUpperCase() + type.name.slice(1)}</div>`;
  }
  return pokemonsTypesJSON;
}

async function displayPokemons(numPages: number, type: string) {
  // api call that stores stringified json on cache
  if (numPages === 0) await getAllPokemons(pokemonApiParams);
  const pokemonContainer = document.getElementById(
    "pokemon-container"
  ) as HTMLElement;
  const customJsonPokemons = await createCustomPokemonsJson(
    pokemonsJSON,
    numPages,
    type
  );

  let eraseDOMContent = false;
  for (const pokemon of customJsonPokemons.pokemons) {
    if (numPages > 0 && !eraseDOMContent) {
      pokemonContainer.innerHTML = await createCardPokemon(pokemon);
      eraseDOMContent = true;
    } else {
      pokemonContainer.innerHTML += await createCardPokemon(pokemon);
    }
  }
  return customJsonPokemons;
}

async function createCustomPokemonsJson(
  json: any,
  numPage: number,
  type: string
) {
  const customPokemons: CustomJsonPokemons = {
    pokemons: [],
  };
  const pokemonPromises = json.results.map((pokemon: any) =>
    getInfoPokemon(pokemon.url)
  );
  const pokemonResults = await Promise.all(pokemonPromises);

  let pokemonsToSelect = numPage != 0 ? 20 * numPage : 20;
  let pokemonsToShow = pokemonsToSelect > 20 ? pokemonsToSelect - 20 : 0;

  for (pokemonsToShow; pokemonsToShow < pokemonsToSelect; pokemonsToShow++) {
    if (type == "all") {
      customPokemons["pokemons"].push({
        name: json.results[pokemonsToShow].name,
        info: pokemonResults[pokemonsToShow],
      });
    }
  }

  return customPokemons;
}

async function pokeTypesDOM(json: any) {
  let pokemonType: string[] = [];
  json.info.types.map((element: any) => {
    pokemonType.push(element.type.name);
  });
  return pokemonType;
}

async function createCardPokemon(json: any) {
  const pokemonTypes = await pokeTypesDOM(json);
  let DOM_content = `<div class="card pokemon-id-${
    json.info.id
  } bg-slate-800 text-center px-6 py-8 ring-5 ring-slate-900/5 shadow-xl text-white">
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
  await displayPokemonType();
  await displayPokemons(0, "all");
}

export {
  getAllPokemons,
  getPokemonById,
  getPokemonTypes,
  display,
  displayPokemons,
};
