import { Country } from "../lib/country";
import { polygonDistance } from "./distance";

const countryData: Country[] = require("../data/country_data.json").features;

export function solveGame(guessedCountry: string, distance: number): string {
  const guessCountry = countryData.find(
    (country: Country) => country.properties.NAME.toLowerCase() === guessedCountry.toLowerCase()
  );

  if (!guessCountry) {
    throw new Error("Guessed country not found");
  }

  const possibleCountries = countryData.filter((country: Country) => {
    const proximity = polygonDistance(guessCountry, country);
    return Math.abs(proximity - distance) < 1000; // Allow a small margin of error
  });

  if (possibleCountries.length === 1) {
    return possibleCountries[0].properties.NAME;
  } else if (possibleCountries.length > 1) {
    throw new Error("Multiple possible countries found");
  } else {
    throw new Error("No possible country found");
  }
}
