import "./Search.css";
import { useEffect } from "react";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { search } from "../services/Brewery";

const schema = z.object({ query: z.string() });

export const Search = ({ setSearching, setSearchList }) => {
  const { control, watch, formState } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { query: "" },
    mode: "onChange",
  });
  const { errors } = formState;
  const query = watch("query");

  useEffect(() => {
    if (!formState.isValid || query.length === 0) {
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
  }, [query, formState.isValid, setSearching, setSearchList]);

  return (
    <>
      <Controller
        name="query"
        control={control}
        render={(props) => (
          <input
            {...props.field}
            className="search-input"
            type="text"
            placeholder="Enter a brewery name or location..."
          />
        )}
      />
      {errors.query && (
        <div className="error-message">{errors.query.message}</div>
      )}
    </>
  );
};
