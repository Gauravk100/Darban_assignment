# Emoji Tic Tac Toe

A twisted version of the classic Tic Tac Toe game using emojis and introducing a "vanishing emoji" rule.

## Game Rules

### Board Structure
- The game is played on a 3x3 grid like regular Tic Tac Toe
- The grid starts empty and can contain a maximum of 6 active emojis (3 per player) at any given time

### Emoji Categories
- Each player selects one emoji category before the game begins
- Available categories: Animals, Food, Sports, Nature, Travel
- On their turn, a player is assigned a random emoji from their own category

### Turn-Based Play
- Player 1 begins, followed by Player 2, alternating every turn
- A player can place their emoji on any empty cell

### Vanishing Rule
- Each player can have only 3 emojis on the board at any time
- When a player attempts to place a 4th emoji, their oldest emoji is removed automatically (FIFO logic)
- The 4th emoji cannot be placed over where the 1st emoji was placed
- The emoji disappears visually, and that cell becomes empty or reusable

### Time Control
- Players can select a custom time bracket—either a shared time limit or separate ones for each player.
- Quick Move Bonus: Make your move within 10 seconds and earn an extra +5 seconds as a reward!

### Winning Condition
- A player wins by forming a line of 3 of their own emojis:
  - Horizontally, vertically, or diagonally
- Winning emojis must all belong to the same player (category-based check)

## Features
- Play against another player or the computer
- Dark/light theme toggle
- Responsive design for both desktop and mobile
- Help section for first-time players
- Time control in Tic-Tac-Toe game 

## Technologies Used
- React.js
- Vite
- Tailwind CSS

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
\`\`\`bash
git clone https://github.com/yourusername/Darban_assignment.git
cd emoji-tic-tac-toe
\`\`\`

2. Install dependencies
\`\`\`bash
npm install
# or
yarn
\`\`\`

3. Start the development server
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

4. Open your browser and navigate to `http://localhost:5173`

## Building for Production

\`\`\`bash
npm run build
# or
yarn build
\`\`\`

The build artifacts will be stored in the `dist/` directory.
