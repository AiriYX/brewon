import "./DataSet.css";
import { useEffect, useState } from "react";
import { getBreweryList } from "../services/Brewery";

import { Stats } from "./Stats";
import { Search } from "./Search";
import { BreweryTable } from "./BreweryTable";

const DataSet = () => {
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
    <div className="content">
      <h1>🍺 Brewery List 🍺</h1>

      {loading && <p>Loading... ⏳</p>}

      <Stats breweries={listToRender} />

      <Search setSearching={setSearching} setSearchList={setSearchList} />

      <BreweryTable breweries={listToRender} />
    </div>
  );
};

export default DataSet;
