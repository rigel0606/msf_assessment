import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import LinkPage from "./components/LinkPage";
import Preparing from "./components/Preparing";
import NotFound from "./components/NotFound";

import "./App.css";

function App() {
  return (
    <>
      <NavBar />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/linkpage" element={<LinkPage />} />
          <Route path="/action-1" element={<Preparing />} />
          <Route path="/action-2" element={<Preparing />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
