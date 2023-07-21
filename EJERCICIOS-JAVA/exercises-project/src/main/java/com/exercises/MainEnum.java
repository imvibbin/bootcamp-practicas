package com.exercises;

import com.exercises.classes.Developer;
import com.exercises.enums.Professions;

import java.util.ArrayList;

public class MainEnum {
  public static void main(String[] args) {
      Developer firstDev = new Developer("John Kervin", "Valle Cabuntasan", 21, Professions.FULL_STACK_DEVELOPER.toString());
      Developer secondDev = new Developer("Jahn Arvun", "Vollo Cebon", 21, Professions.BACK_END_DEVELOPER.toString());
      Developer thirdDev = new Developer("Juhn Kurbin", "Val Tasan", 21, Professions.FRONT_END_DEVELOPER.toString());
      ArrayList<Developer> devs = new ArrayList<>();
      devs.add(firstDev);
      devs.add(secondDev);
      devs.add(thirdDev);

      int index = 0;
      for (Developer dev : devs) {
          if (dev.getRol().equals(Professions.FRONT_END_DEVELOPER.toString())) {
              System.out.println("Developer " + (index + 1) + ": JS es una 💩 es mejor utilizar TypeScript");
          } else if (dev.getRol().equals(Professions.BACK_END_DEVELOPER.toString())
                  || dev.getRol().equals(Professions.FULL_STACK_DEVELOPER.toString())) {
              System.out.println("Developer " + (index + 1) + ": Viva el back");
          }
          index++;
      }
  }
}
