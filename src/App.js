import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home/TodoList";
import TodoDetails from "./Pages/Details/TodoDetails";
import PageError from "./Pages/Error/PageError";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/details/:id" element={<TodoDetails />} />
          <Route path="*" element={<PageError />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
