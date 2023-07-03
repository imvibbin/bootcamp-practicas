// SECTION: >> Imports
import PokemonDisplay from "./scripts/display.ts";
import Events from "./scripts/events.ts";

class Main {
  // SECTION: >> Instances
  private events = new Events();
  private pokemonDisplay = new PokemonDisplay();

  constructor() {
    // NOTE: displaying all pokemon cards
    this.events;
    this.pokemonDisplay.displayOnLoad();
  }
}

// SECTION: >> Usage
new Main();
