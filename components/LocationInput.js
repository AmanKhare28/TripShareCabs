import React, { useState } from "react";
import { autocomplete } from "../utils/geoapify";
import styles from "../styles/page.module.css";

const LocationInput = ({ value, onChange, onClick, style }) => {
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = async (event) => {
    const query = event.target.value;
    onChange({ value: query });

    if (!query) {
      setSuggestions([]);
      return;
    }

    if (query.length > 2) {
      // Start fetching suggestions for queries longer than 2 characters
      const results = await autocomplete(query);
      console.log("Autocomplete results:", results); // Log the results
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    onChange({ value: suggestion.properties.formatted });
    setSuggestions([]);
  };

  return (
    <div className={styles.locationInput} style={style}>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onClick={onClick}
        placeholder="Enter location"
        className={styles.input}
      />
      {suggestions.length > 0 && (
        <ul className={styles.suggestions}>
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className={styles.suggestion}
            >
              {suggestion.properties.formatted}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationInput;
