import "./Dashboard.css";
import { useEffect, useState } from "react";
import { getBreweryList } from "../services/Brewery";

import { Stats } from "../component/Stats";
import { Search } from "../component/Search";
import { BreweryTable } from "../component/BreweryTable";
import { BarGraph } from "../component/BarGraph";

const Dashboard = () => {
  const [searching, setSearching] = useState(false);
  const [loading, setLoading] = useState(true);
  const [initialList, setInitialList] = useState([]);
  const [searchList, setSearchList] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const list = await getBreweryList();
        setInitialList(list);
      } catch (error) {
        alert(
          "An error occured: " + error instanceof Error ? error.message : ""
        );
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const listToRender = searching ? searchList : initialList;

  return (
    <>
      <h1>🍺 Brewery List 🍺</h1>

      {loading && <p>Loading... ⏳</p>}

      <div className="statsGraph">
        <Stats breweries={listToRender} />
        <BarGraph data={listToRender} />
      </div>

      <Search setSearching={setSearching} setSearchList={setSearchList} />

      <BreweryTable breweries={listToRender} />
    </>
  );
};

export default Dashboard;
