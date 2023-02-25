import Header from "./components/global/Header";
import Footer from "./components/global/Footer";
import NaoEncontrada from "./pages/NaoEncontrada";
import { Routes, Route } from "react-router-dom";
import MovieDetails from "./pages/MovieDetails";
import MovieList from "./pages/MovieList";
import Login from "./pages/Login";
import Sessao from "./pages/Sessao";
import "./styles.css";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="content">
        <Routes>
          <Route path="*" element={<NaoEncontrada />} />
          <Route path="/" element={<MovieList />} />
          <Route path="login/*" element={<Login />} />
          <Route path="/details/:id/" element={<MovieDetails />} />
          <Route path="/details/:id/sessao/*" element={<Sessao />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
