import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./component/Layout";
import Dashboard from "./pages/Dashboard";
import { BreweryPage } from "./pages/Brewery";

const SearchPage = () => {
  return <div>Search</div>;
};

const AboutPage = () => {
  return <div>About barnie</div>;
};

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/brewery/:id" element={<BreweryPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
