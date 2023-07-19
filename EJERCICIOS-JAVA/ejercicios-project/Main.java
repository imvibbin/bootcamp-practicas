package com.ejercicios;

import java.util.ArrayList;
import java.util.Random;
import java.util.Scanner;

public class Main {

  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    ArrayList<Character> gameSlotsAsList = new ArrayList<>();
    char[] gameSlots = { ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' };
    for (char slots : gameSlots) {
      gameSlotsAsList.add(slots);
    }
    System.out.println(">> Welcome to the game! <<");
    startGame(sc, gameSlotsAsList);
  }

  public static void startGame(Scanner sc, ArrayList<Character> gameSlotsAsList) {
    boolean cpuTurn = false;
    boolean markedSlotAvailable;
    while (true) {
      if (cpuTurn) {
        int selectedRowByCPU, selectedColumnByCPU;
        System.out.println(">> CPU's turn <<");
        int[] markedSlotsByCPU = createMarkedSlotInfoCPU(gameSlotsAsList);
        selectedRowByCPU = markedSlotsByCPU[0];
        selectedColumnByCPU = markedSlotsByCPU[1];
        markedSlotAvailable = markGameSlot(gameSlotsAsList, selectedRowByCPU, selectedColumnByCPU, true);
        cpuTurn = false;
      } else {
        int row, column;
        System.out.println(">> You're turn <<");
        System.out.println("Please select a row: (1, 2, or 3)");
        row = sc.nextInt();
        System.out.println("Please select a column: (1, 2, or 3)");
        column = sc.nextInt();
        markedSlotAvailable = markGameSlot(gameSlotsAsList, row, column, false);
        cpuTurn = true;
      }

      if (markedSlotAvailable) {
        String game = generateVisualGameResults(gameSlotsAsList);
        System.out.println("Result: \n" + game);
      }
    }
  }

  public static boolean markGameSlot(
      ArrayList<Character> gameSlotsAsList, int selectedRow, int selectedColumn, boolean cpuTurn) {
    int index = (selectedRow - 1) * 3 + (selectedColumn - 1);
    if (gameSlotsAsList.get(index) == ' ') {
      gameSlotsAsList.set(index, cpuTurn ? 'O' : 'X');
      return true;
    }
    return false;
  }

  public static String generateVisualGameResults(ArrayList<Character> gameSlotsAsList) {
    StringBuilder sb = new StringBuilder();
    for (int index = 0; index < gameSlotsAsList.size(); index++) {
      sb.append('|');
      sb.append(gameSlotsAsList.get(index));
      if (index == 2 || index == 5 || index == 8) {
        sb.append("|\n");
      }
    }
    return sb.toString();
  }

  public static int[] createMarkedSlotInfoCPU(ArrayList<Character> gameSlotsAsList) {
    Random random = new Random();
    while (true) {
      int selectedRowByCPU = random.nextInt(3) + 1;
      int selectedColumnByCPU = random.nextInt(3) + 1;
      if (markGameSlot(gameSlotsAsList, selectedRowByCPU, selectedColumnByCPU, true)) {
        return new int[] { selectedRowByCPU, selectedColumnByCPU };
      }
    }
  }

  public static boolean checkResults(ArrayList<Character> gameSlotsAsList) {
    // Add your game result checking logic here
    return true;
  }
}
