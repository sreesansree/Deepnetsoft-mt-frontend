import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Menu from "./pages/Menu/Menu";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/menu" element={<Menu />} />
      </Routes>
    </Router>
  );
}

export default App;
