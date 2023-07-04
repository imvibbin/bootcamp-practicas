// SECTION: >> Imports
import DisplayUI from "./ui/displayUI.ts";
import EventsUI from "./ui/eventsUI.ts";

class Main {
  // SECTION: >> Instances
  private _eventsUI = new EventsUI();
  private _displayUI = new DisplayUI();

  constructor() {
    // NOTE: displaying all pokemon cards
    this._eventsUI;
    this._displayUI.displayOnLoad();
  }
}

// SECTION: >> Usage
new Main();
