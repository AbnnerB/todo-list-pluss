import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home/TodoList";
import TodoDetails from "./Pages/Details/TodoDetails";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/details/:id" element={<TodoDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
