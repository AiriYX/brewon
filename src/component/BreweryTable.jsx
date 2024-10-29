import { Link } from "react-router-dom";
import "./BreweryTable.css";

export const BreweryTable = ({ breweries }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Country</th>
          <th>Website</th>
        </tr>
      </thead>
      <tbody>
        {breweries.map((brewery) => {
          return (
            <tr key={brewery.id}>
              <td>
                <Link to={`/brewery/${brewery.id}`}>{brewery.name}</Link>
              </td>

              <td>{brewery.country}</td>
              <td>
                <a href={brewery.website_url} target="_blank">
                  {brewery.website_url}
                </a>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
