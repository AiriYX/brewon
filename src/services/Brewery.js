export class BreweryItem {
  id;
  name;
  brewery_type;
  address_1;
  address_2;
  address_3;
  city;
  state_province;
  postal_code;
  country;
  longitude;
  latitude;
  phone;
  website_url;
  state;
  street;

  constructor(props) {
    Object.assign(this, props);
  }

  toString = () => {
    return `id=${this.id}, name=${this.name}`;
  };
}

/**
 * Returns a single brewery for the identifier supplied.
 *
 * @param req.breweryId
 * @returns A single brewery.
 */
export const getBrewery = async ({ breweryId }) => {
  try {
    const encodedBreweryId = encodeURIComponent(breweryId);
    const url = `https://api.openbrewerydb.org/v1/breweries/${encodedBreweryId}`;
    const response = await fetch(url, { method: "GET" });
    if (response.status >= 400) {
      throw new Error(
        response.status === 404
          ? "Could not find the brewery for the specified identifier"
          : "An unknown error occurred."
      );
    }

    const brewery = await response.json();
    return new BreweryItem(brewery);
  } catch (error) {
    console.error("An error occurred: ", error);
    throw error;
  }
};

/**
 * Returns a list of breweries.
 *
 * @returns The list of breweries.
 */
export const getBreweryList = async () => {
  try {
    const url = "https://api.openbrewerydb.org/v1/breweries";
    const response = await fetch(url, { method: "GET" });
    const list = await response.json();
    if (!Array.isArray(list))
      throw new Error("Received an incorrect response.");

    const items = list.map((breweryObject) => new BreweryItem(breweryObject));
    return items;
  } catch (error) {
    console.error("An error occurred: ", error);
    throw error;
  }
};

/**
 * Returns a set of breweries given an autocomplete query.
 *
 * @param param.query The query to use for autocomplete.
 * @returns A list of breweries matching the query.
 */
export const autocomplete = async ({ query }) => {
  try {
    if (query === undefined || typeof query !== "string") {
      throw new Error("You must specify a query that is a string.");
    }

    const encodedQuery = encodeURIComponent(query);
    const url = `https://api.openbrewerydb.org/v1/breweries/autocomplete?query=${encodedQuery}`;
    const response = await fetch(url, { method: "GET" });
    const list = await response.json();
    if (!Array.isArray(list))
      throw new Error("Received an incorrect response.");

    const items = list.map((breweryObject) => new BreweryItem(breweryObject));
    return items;
  } catch (error) {
    console.error("An error occurred: ", error);
    throw error;
  }
};

/**
 * Returns a set of breweries given a search query.
 *
 * @param param.query The query to use for search.
 * @returns A list of breweries matching the search query.
 */
export const search = async ({ query }) => {
  try {
    if (query === undefined || typeof query !== "string") {
      throw new Error("You must specify a query that is a string.");
    }

    const encodedQuery = encodeURIComponent(query);
    const url = `https://api.openbrewerydb.org/v1/breweries/search?query=${encodedQuery}`;
    const response = await fetch(url, { method: "GET" });
    const list = await response.json();
    if (!Array.isArray(list))
      throw new Error("Received an incorrect response.");

    const items = list.map((breweryObject) => new BreweryItem(breweryObject));
    return items;
  } catch (error) {
    console.error("An error occurred: ", error);
    throw error;
  }
};
