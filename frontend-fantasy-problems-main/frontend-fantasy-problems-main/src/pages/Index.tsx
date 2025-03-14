
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const challenges = [
  {
    id: "autocomplete",
    title: "Autocomplete",
    description: "Build an autocomplete component that suggests options as the user types",
    difficulty: "Medium"
  },
  {
    id: "pagination",
    title: "Pagination",
    description: "Create a pagination component for navigating through multiple pages of data",
    difficulty: "Easy"
  },
  {
    id: "infinite-scroll",
    title: "Infinite Scroll",
    description: "Implement infinite scrolling to load more content as the user scrolls down",
    difficulty: "Medium"
  },
  {
    id: "carousel",
    title: "Carousel",
    description: "Build an image carousel with previous/next controls and indicators",
    difficulty: "Medium"
  },
  {
    id: "star-rating",
    title: "Star Rating",
    description: "Create an interactive star rating component for user feedback",
    difficulty: "Easy"
  },
  {
    id: "todo-list",
    title: "Todo List",
    description: "Develop a todo list with add, edit, delete, and mark as complete functionality",
    difficulty: "Easy"
  },
  {
    id: "typeahead",
    title: "Typeahead Search",
    description: "Build a typeahead search component with debouncing for efficient API calls",
    difficulty: "Hard"
  },
  {
    id: "tic-tac-toe",
    title: "Tic Tac Toe",
    description: "Create a fully functional tic-tac-toe game with win detection",
    difficulty: "Medium"
  },
  {
    id: "drag-drop",
    title: "Drag and Drop",
    description: "Implement a drag and drop interface for reordering items in a list",
    difficulty: "Hard"
  },
  {
    id: "virtual-list",
    title: "Virtual List",
    description: "Build a virtualized list that efficiently renders only visible items for large datasets",
    difficulty: "Hard"
  },
  {
    id: "multi-step-form",
    title: "Multi-step Form",
    description: "Create a multi-step form with validation and progress tracking",
    difficulty: "Medium"
  },
  {
    id: "data-grid",
    title: "Data Grid",
    description: "Implement a data grid with sorting, filtering, and pagination functionality",
    difficulty: "Hard"
  },
  {
    id: "file-explorer",
    title: "File Explorer",
    description: "Build a file explorer with expandable folders and file navigation",
    difficulty: "Hard"
  },
  {
    id: "connect-four",
    title: "Connect Four",
    description: "Create a Connect Four game with AI opponent and win detection",
    difficulty: "Hard"
  },
  {
    id: "sudoku-solver",
    title: "Sudoku Solver",
    description: "Build an interactive Sudoku puzzle with a backtracking solver algorithm",
    difficulty: "Hard"
  },
  {
    id: "state-management",
    title: "Custom State Management",
    description: "Implement a Redux-like state management system using React Context and useReducer",
    difficulty: "Hard"
  },
  {
    id: "spreadsheet",
    title: "Interactive Spreadsheet",
    description: "Create a spreadsheet with formula evaluation and cell dependencies",
    difficulty: "Hard"
  },
  {
    id: "chess-game",
    title: "Chess Game",
    description: "Build a chess game with complete rules, move validation, and PGN notation",
    difficulty: "Hard"
  }
];

const Index = () => {
  const navigate = useNavigate();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="container px-4 py-12 mx-auto max-w-7xl">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 animate-slide-down">
            Frontend Machine Coding Challenges
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-slide-down animation-delay-100">
            A collection of common interview problems for frontend developers with complete solutions
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((challenge, index) => (
            <Card 
              key={challenge.id}
              className="card-hover overflow-hidden bg-card/60 backdrop-blur-sm border-border/50 shadow-sm"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-semibold">{challenge.title}</CardTitle>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                    {challenge.difficulty}
                  </span>
                </div>
                <CardDescription className="mt-2">{challenge.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Placeholder for future challenge preview or thumbnail */}
              </CardContent>
              <CardFooter className="flex justify-end border-t border-border/30 pt-4">
                <Button 
                  variant="ghost" 
                  className="group" 
                  onClick={() => navigate(`/${challenge.id}`)}
                >
                  View Challenge
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
