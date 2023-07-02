// SECTION: >> Imports
import PokemonDisplay from "./scripts/display.ts";
import Events from "./scripts/events.ts";

// SECTION: >> Clases
const pokemonDisplay = new PokemonDisplay();
const events = new Events();

// SECTION: >> Functions
// NOTE: displaying all pokemon cards
pokemonDisplay.displayOnLoad();
