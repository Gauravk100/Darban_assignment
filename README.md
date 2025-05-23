# Emoji Tic Tac Toe

A fun twist on the classic Tic Tac Toe game, using emojis and introducing a unique "vanishing emoji" rule.

## Game Rules

### Board Structure

* Played on a 3x3 grid like traditional Tic Tac Toe.
* The grid starts empty and holds a maximum of 6 active emojis (3 per player) at any time.

### Emoji Categories

* Each player selects one emoji category before the game starts.
* Available categories: **Animals**, **Food**, **Sports**, **Nature**, **Travel**.
* On each turn, a random emoji from the player's selected category is assigned.

### Turn-Based Play

* Player 1 starts, followed by Player 2. Turns alternate.
* Players place their emoji on any empty cell.

### Vanishing Rule

* Players may have only **3 emojis on the board** at once.
* Placing a 4th emoji causes the **oldest one to vanish** (FIFO logic).
* The vanished cell becomes **empty and reusable**.
* The 4th emoji **cannot be placed** in the cell where the vanished (1st) emoji was located.

### Time Control

* Players can choose either a **shared time limit** or **individual timers**.
* **Quick Move Bonus**: Play your move within 10 seconds to earn **+5 seconds**.

### Winning Condition

* A player wins by aligning **3 of their own emojis**:

  * Horizontally, vertically, or diagonally.
* All winning emojis must be from the **same player's category**.

## Features

* Play vs another player or the computer.
* Light/Dark theme toggle.
* Fully responsive for desktop and mobile.
* Help section for first-time players.
* Configurable time control.

## Technologies Used

* **React.js**
* **Vite**
* **Tailwind CSS**

## Getting Started

### Prerequisites

* **Node.js** (v14 or higher)
* **npm** or **yarn**

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/Darban_assignment.git
   cd Darban_assignment
   ```

2. Install dependencies

   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and visit: `http://localhost:5173`

## Building for Production

```bash
npm run build
# or
yarn build
```

The optimized build will be output to the `dist/` directory.

