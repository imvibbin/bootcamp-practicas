import PokemonService from "../services/pokemonService";

class ElementsUI {
  private _pokemonService = new PokemonService();

  async createTagTypeSearcher(
    pokemonTypesJSON: any,
    mainPokeType: HTMLElement,
    divPokeTypeSearcher: HTMLElement
  ) {
    const filteredTypes = pokemonTypesJSON.results.filter(
      (type: any) => type.name !== "shadow" && type.name !== "unknown"
    );

    const typeTags = filteredTypes
      .map(
        (type: any) => `
      <div id="pokemon-type-${
        type.name
      }" class="font-bold mx-auto w-full flex item-center justify-center px-4 rounded-full pokemon-type-tags pokemon-type-${
        type.name
      }">
        ${type.name.charAt(0).toUpperCase()}${type.name.slice(1)}
      </div>
    `
      )
      .join("");

    divPokeTypeSearcher.innerHTML += typeTags;
    mainPokeType.innerHTML += `
      <div id="pokemon-type-all" class="font-bold mt-5 mx-auto  pokemon-type-tags  flex item-center justify-center px-4 rounded-full  pokemon-type-all">
        All
      </div>
    `;
  }

  async createCardPokemon(pokemonsJson: any) {
    const pokemonTypes = await this._pokemonService.getPokemonTypeNames(
      pokemonsJson
    );

    const typeTags = pokemonTypes
      .map(
        (type: string) => `
      <div id="pokemon-type-${type}" class="flex item-center justify-center px-4 rounded-full  pokemon-type-tags pokemon-type-${type} font-bold">
        ${type.charAt(0).toUpperCase() + type.slice(1)}
      </div>
    `
      )
      .join("");

    return `
      <div class="card pokemon-id-${
        pokemonsJson.id
      } font-bold bg-slate-800 text-center px-6 py-8 ring-5 ring-slate-900/5 shadow-xl rounded-lg text-white">
        <img src="${
          pokemonsJson.sprites.other["official-artwork"].front_default
        }" class="pokemon-img"></img>
        <p class="font-bold">${
          pokemonsJson.name.charAt(0).toUpperCase() + pokemonsJson.name.slice(1)
        }</p>
        <div class="pokemon-type flex justify-center">
          ${typeTags}
        </div>
      </div>
    `;
  }

  async createSearchFilterIndicator(pokemonType: string, pokemonName: string) {
    const pokemonTypeToShow = pokemonType === "all" ? "all" : pokemonType;
    const pokemonTypeToShowUpperCase = `${pokemonType
      .charAt(0)
      .toUpperCase()}${pokemonType.slice(1)}`;

    const removeFilterButton = `
      <div class="inline-block text-center align-middle border-white">
        <i id="remove-filter" class="ml-3 cursor-pointer fa-solid fa-xmark h-50"></i>
      </div>
    `;

    let filterIndicator = `
      <div class="text-white w-1/2">
    `;

    if (pokemonName !== "") {
      filterIndicator += `
        <div class="flex justify-start item-center w-full">
          <p class="font-bold">Searching by name:</p>
          <div class="ml-3">${pokemonName}</div>
          <div class="inline-block text-center align-middle border-white">
            <i id="remove-name" class="ml-3 cursor-pointer fa-solid fa-xmark h-50"></i>
          </div>
        </div>
      `;
    }

    filterIndicator += `
        <div class="flex justify-start item-center w-full">
          <p class="font-bold">Searching by type:</p>
          <div class="ml-3 item-center justify-center px-4 rounded-full pokemon-type-tags pokemon-type-${pokemonTypeToShow}">
            ${pokemonTypeToShowUpperCase}
          </div>
    `;

    if (pokemonTypeToShow !== "all") {
      filterIndicator += removeFilterButton;
    }

    filterIndicator += `
        </div>
      </div>
    `;

    return filterIndicator;
  }
}

export default ElementsUI;
