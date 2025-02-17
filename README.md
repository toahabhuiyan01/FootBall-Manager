# Football Player Management Application

A modern web application for managing football players and building custom teams with specific constraints.

## Getting Started

### Prerequisites

-   Node.js (v14 or higher)
-   npm or yarn package manager

### Installation

```bash
npm install
# or
yarn install
```

### Development

To start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

### Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

## Features

### Player List

-   View a comprehensive list of football players
-   Each player card displays:
    -   Player photo
    -   Name
    -   Nationality
    -   Position
    -   Age
    -   Current club
    -   Market value
-   Click on a player card to view detailed information in a side drawer

### Player Search and Filtering

-   Search players by name
-   Filter players by:
    -   Position
    -   Nationality
    -   Age range

### Team Builder

Create custom teams with specific constraints:

-   Choose from multiple formations:
    -   4-3-3
    -   4-4-2
    -   3-4-3
    -   5-2-3
    -   5-3-2

#### Team Building Rules

1. Must select exactly 11 players
2. Team average age must be between 25 and 27 years
3. Maximum 2 players allowed from the same country
4. Maximum 2 players allowed from the same club

### Interactive Formation Display

-   Visual representation of the selected formation.
-   Dynamic formation layout based on the selected formation.
-   If no player is selected for a position, display a placeholder. Clicking that appears player selection popover.
-   If a player is selected for a position, display the player's photo and name Clicking that appears the players detailed info in a side drawer.

## Technologies Used

-   React
-   TypeScript
-   Material-UI (MUI)
-   Vite
-   React Router
-   Zustand (State Management)
