import { solveGame } from './solver';
import { polygonDistance } from './distance';
import { Country } from '../lib/country';

const countryData: Country[] = require('../data/country_data.json').features;

describe('solveGame', () => {
  it('should return the correct mystery country', () => {
    const guessedCountry = 'France';
    const distance = polygonDistance(
      countryData.find((country: Country) => country.properties.NAME === guessedCountry),
      countryData.find((country: Country) => country.properties.NAME === 'Germany')
    );

    const result = solveGame(guessedCountry, distance);
    expect(result).toBe('Germany');
  });

  it('should throw an error if guessed country is not found', () => {
    const guessedCountry = 'InvalidCountry';
    const distance = 1000;

    expect(() => solveGame(guessedCountry, distance)).toThrow('Guessed country not found');
  });

  it('should throw an error if multiple possible countries are found', () => {
    const guessedCountry = 'France';
    const distance = 0; // Multiple countries have 0 distance to themselves

    expect(() => solveGame(guessedCountry, distance)).toThrow('Multiple possible countries found');
  });

  it('should throw an error if no possible country is found', () => {
    const guessedCountry = 'France';
    const distance = 100000000; // No country is this far from France

    expect(() => solveGame(guessedCountry, distance)).toThrow('No possible country found');
  });
});
