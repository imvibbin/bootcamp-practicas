class ElementsUI {
  // SECTION: >> METHODS
  // NOTE: displaying a type tag on DOM
  async createTagTypeSearcher(
    pokemonTypesJSON: any,
    mainPokeType: HTMLElement,
    divPokeTypeSearcher: HTMLElement
  ) {
    for (const type of pokemonTypesJSON.results) {
      if (type.name != `shadow` && type.name != `unknown`)
        divPokeTypeSearcher.innerHTML += `
        <div id="pokemon-type-${
          type.name
        }" class="font-bold mx-auto w-full flex item-center justify-center px-4 rounded-full pokemon-type-tags pokemon-type-${
          type.name
        }">${type.name.charAt(0).toUpperCase()}${type.name.slice(1)}</div>`;
    }
    mainPokeType.innerHTML += `<div id="pokemon-type-all" class="font-bold mt-5 mx-auto  pokemon-type-tags  flex item-center justify-center px-4 rounded-full  pokemon-type-all">All</div>`;
  }

  // NOTE: displaying a pokemon for each pokemon on DOM
  async createCardPokemon(pokemonsJson: any) {
    const pokemonTypes = await this.pokeTypesDOM(pokemonsJson);
    let DOM_content = `
    <div class="card pokemon-id-${
      pokemonsJson.id
    } font-bold bg-slate-800 text-center px-6 py-8 ring-5 ring-slate-900/5 shadow-xl rounded-lg text-white">
      <img src="${
        pokemonsJson.sprites.other["official-artwork"].front_default
      }" class="pokemon-img"></img>
      <p class="font-bold">${
        pokemonsJson.name.charAt(0).toUpperCase() + pokemonsJson.name.slice(1)
      }</p>`;

    let DOM_types = `
      <div class="pokemon-type flex justify-center">`;
    for (let type of pokemonTypes) {
      DOM_types += `
        <div id="pokemon-type-${type}" class=" flex item-center justify-center px-4 rounded-full  pokemon-type-tags pokemon-type-${type} font-bold">${
        type.charAt(0).toUpperCase() + type.slice(1)
      }</div>`;
    }
    DOM_types += `
      </div>
    </div>`;

    return DOM_content + DOM_types;
  }

  async createSearchFilterIndicator(pokemonType: string, pokemonName: string) {
    let filterIndicator = `
    <div class="text-white w-1/2">`;

    if (pokemonName != "") {
      filterIndicator += `
      <div class="flex justify-start item-center w-full">
        <p class="font-bold">Searching by name: </p> 
        <div class="ml-3"> ${pokemonName} </div>
        <div class="inline-block text-center align-middle border-white">
          <i id="remove-name" class="ml-3 cursor-pointer fa-solid fa-xmark h-50"></i>
        </div>
      </div>`;
    }

    if (pokemonType == "all") {
      filterIndicator += `
      <div class="flex w-full">
        <p class="font-bold">Searching by type: </p> 
        <div class="ml-3 flex item-center justify-center px-4 rounded-full  pokemon-type-tags pokemon-type-all font-bold">
          <p>All</p>
        </div>
      </div>`;
    } else {
      filterIndicator += `
      <div class="flex justify-start item-center w-full">
        <p class="font-bold">Searching by type: </p> 
        <div class="ml-3 item-center justify-center px-4 rounded-full pokemon-type-tags pokemon-type-${pokemonType}">
          ${pokemonType.charAt(0).toUpperCase() + pokemonType.slice(1)}
        </div>
        <div class="inline-block text-center align-middle border-white">
          <i id="remove-filter" class="ml-3 cursor-pointer fa-solid fa-xmark h-50"></i>
        </div>
      </div>`;
    }

    filterIndicator += `
    </div>`;
    return filterIndicator;
  }

  // NOTE: getting all the type name of each pokemon
  async pokeTypesDOM(pokemonInfo: any) {
    const pokemonType = pokemonInfo.types.map(
      (element: any) => element.type.name
    );
    return pokemonType;
  }
}

export default ElementsUI;
