
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Autocomplete from "./components/challenges/Autocomplete";
import Pagination from "./components/challenges/Pagination";
import InfiniteScroll from "./components/challenges/InfiniteScroll";
import Carousel from "./components/challenges/Carousel";
import StarRating from "./components/challenges/StarRating";
import TodoList from "./components/challenges/TodoList";
import Typeahead from "./components/challenges/Typeahead";
import TicTacToe from "./components/challenges/TicTacToe";
import DragDrop from "./components/challenges/DragDrop";
import VirtualList from "./components/challenges/VirtualList";
import MultiStepForm from "./components/challenges/MultiStepForm";
import DataGrid from "./components/challenges/DataGrid";
import FileExplorer from "./components/challenges/FileExplorer";
import ConnectFour from "./components/challenges/ConnectFour";
import SudokuSolver from "./components/challenges/SudokuSolver";
import StateManagement from "./components/challenges/StateManagement";
import Spreadsheet from "./components/challenges/Spreadsheet";
import ChessGame from "./components/challenges/ChessGame";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/autocomplete" element={<Autocomplete />} />
          <Route path="/pagination" element={<Pagination />} />
          <Route path="/infinite-scroll" element={<InfiniteScroll />} />
          <Route path="/carousel" element={<Carousel />} />
          <Route path="/star-rating" element={<StarRating />} />
          <Route path="/todo-list" element={<TodoList />} />
          <Route path="/typeahead" element={<Typeahead />} />
          <Route path="/tic-tac-toe" element={<TicTacToe />} />
          <Route path="/drag-drop" element={<DragDrop />} />
          <Route path="/virtual-list" element={<VirtualList />} />
          <Route path="/multi-step-form" element={<MultiStepForm />} />
          <Route path="/data-grid" element={<DataGrid />} />
          <Route path="/file-explorer" element={<FileExplorer />} />
          <Route path="/connect-four" element={<ConnectFour />} />
          <Route path="/sudoku-solver" element={<SudokuSolver />} />
          <Route path="/state-management" element={<StateManagement />} />
          <Route path="/spreadsheet" element={<Spreadsheet />} />
          <Route path="/chess-game" element={<ChessGame />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
