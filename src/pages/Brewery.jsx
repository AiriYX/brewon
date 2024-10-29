import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBrewery } from "../services/Brewery";

import "./Brewery.css";

export const BreweryPage = () => {
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useState(null);
  const [brewery, setBrewery] = useState(null);

  useEffect(() => {
    console.log("useEffect: ", id);

    if (!id) return;

    getBrewery({ breweryId: id })
      .then((result) => setBrewery(result))
      .catch((error) => {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        }
      });
  }, [id]);

  if (id === undefined) return null;
  if (errorMessage !== null) {
    return <div>{errorMessage}</div>;
  }
  if (brewery === null) return null;

  return (
    <div>
      <h1>Brewery Information</h1>
      <div className="result-container">
        {Object.keys(brewery).map((k) => {
          if (!brewery[k] || k === "toString") {
            return null;
          }
          return (
            <div key={k}>
              {k} = {brewery[k]}
            </div>
          );
        })}
      </div>
    </div>
  );
};
