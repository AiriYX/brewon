import "./Search.css";
import { useEffect, useState } from "react";
import { search } from "../services/Brewery";

export const Search = ({ setSearching, setSearchList }) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (query.length === 0) {
      setSearching(false);
      setSearchList([]);
      return;
    }

    const doSearch = async () => {
      try {
        const searchResponse = await search({ query });
        setSearchList(searchResponse);
      } catch (error) {
        console.warn("An error occurred: ", error);
        setSearching(false);
      }
    };

    setSearching(true);
    doSearch();
  }, [query, setSearchList, setSearching]);

  return (
    <form>
      <input
        className="search-input"
        type="text"
        value={query}
        placeholder="Enter a brewery name or location..."
        onChange={(e) => {
          e.preventDefault();
          setQuery(e.target.value);
        }}
      />
    </form>
  );
};
