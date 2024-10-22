import "./Stats.css";

export const Stats = ({ breweries }) => {
  if (!Array.isArray(breweries)) return null; // We do not have the correct type right now

  const numBreweries = breweries.length;
  const breweriesWithinUnitedStates = breweries.filter(
    (brewery) => brewery.country === "United States"
  ).length;
  const breweriesInNewYork = breweries.filter(
    (brewery) => brewery.city === "New York"
  ).length;

  return (
    <div className="stats-container">
      <div className="stat-card">
        Number of Breweries Loaded: {numBreweries}
      </div>

      <div className="stat-card">
        Number of Breweries within the US: {breweriesWithinUnitedStates}/
        {numBreweries}
      </div>

      <div className="stat-card">
        Number of Breweries in New York: {breweriesInNewYork}/{numBreweries}
      </div>
    </div>
  );
};
