import axios from "axios";

const GEOAPIFY_API_KEY = "f9d78eda97e54167af00e18ea7bb363d";
const GEOAPIFY_BASE_URL = "https://api.geoapify.com/v1";

export const geocode = async (query) => {
  try {
    const response = await axios.get(`${GEOAPIFY_BASE_URL}/geocode/search`, {
      params: {
        text: query,
        apiKey: GEOAPIFY_API_KEY,
        limit: 1,
      },
      timeout: 10000, // 10 seconds timeout
    });
    return response.data.features[0]; // Geoapify returns an array of features
  } catch (error) {
    console.error("Geocoding error:", error);
    return null;
  }
};

export const reverseGeocode = async (lat, lon) => {
  try {
    const response = await axios.get(`${GEOAPIFY_BASE_URL}/geocode/reverse`, {
      params: {
        lat,
        lon,
        apiKey: GEOAPIFY_API_KEY,
        limit: 1,
      },
      timeout: 10000, // 10 seconds timeout
    });
    return response.data.features[0]; // Geoapify returns an array of features
  } catch (error) {
    console.error("Reverse geocoding error:", error);
    return null;
  }
};

export const autocomplete = async (query) => {
  try {
    const response = await axios.get(
      `${GEOAPIFY_BASE_URL}/geocode/autocomplete`,
      {
        params: {
          text: query,
          apiKey: GEOAPIFY_API_KEY,
          limit: 5, // You can adjust the limit as needed
        },
        timeout: 10000, // 10 seconds timeout
      }
    );
    console.log("Autocomplete response:", response.data); // Log the response
    return response.data.features; // Geoapify returns an array of features
  } catch (error) {
    console.error("Autocomplete error:", error);
    return [];
  }
};
