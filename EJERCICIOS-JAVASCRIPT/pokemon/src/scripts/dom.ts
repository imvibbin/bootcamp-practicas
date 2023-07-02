class Dom {
  // SECTION: >> METHODS
  // NOTE: displaying a type tag on DOM
  async createTagTypeSearcher(
    pokemonTypesJSON: any,
    mainPokeType: HTMLElement,
    divPokeTypeSearcher: HTMLElement
  ) {
    for (const type of pokemonTypesJSON.results) {
      if (type.name != `shadow` && type.name != `unknown`)
        divPokeTypeSearcher.innerHTML += `<div id="pokemon-type-${
          type.name
        }" class="mx-auto w-full pokemon-type-tags pokemon-type-${
          type.name
        }">${type.name.charAt(0).toUpperCase()}${type.name.slice(1)}</div>`;
    }
    mainPokeType.innerHTML += `<div id="pokemon-type-all" class="mt-5 mx-auto w-full pokemon-type-tags pokemon-type-all">All</div>`;
  }

  // NOTE: displaying a pokemon for each pokemon on DOM
  async createCardPokemon(pokemonsJson: any) {
    const pokemonTypes = await this.pokeTypesDOM(pokemonsJson);
    let DOM_content = `<div class="card pokemon-id-${
      pokemonsJson.id
    } bg-slate-800 text-center px-6 py-8 ring-5 ring-slate-900/5 shadow-xl rounded-lg text-white">
    <img src="${
      pokemonsJson.sprites.other["official-artwork"].front_default
    }" class="pokemon-img"></img>
    <h2>${
      pokemonsJson.name.charAt(0).toUpperCase() + pokemonsJson.name.slice(1)
    }</h2>`;

    let DOM_types = `<div class="pokemon-type">`;
    for (let type of pokemonTypes) {
      DOM_types += `
      <div id="pokemon-type-${type}" class="pokemon-type-tags pokemon-type-${type}">${
        type.charAt(0).toUpperCase() + type.slice(1)
      }</div>
    `;
    }
    DOM_types += `</div></div>`;

    return DOM_content + DOM_types;
  }

  // NOTE: getting all the type name of each pokemon
  async pokeTypesDOM(pokemonInfo: any) {
    const pokemonType = pokemonInfo.types.map(
      (element: any) => element.type.name
    );
    return pokemonType;
  }
}

export default Dom;
