import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { GlobeMethods } from "react-globe.gl";
import { Country } from "../lib/country";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Guesses } from "../lib/localStorage";
import { today } from "../util/dates";
import { RootState } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { newCountryKey } from "../redux/answerSlice";

const countryData: Country[] = require("../data/country_data.json").features;

const Globe = lazy(() => import("./Globe"));
const Guesser = lazy(() => import("./Guesser"));
const List = lazy(() => import("./List"));

type Props = {
  reSpin: boolean;
  setShowStats: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Game({ reSpin }: Props) {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(newCountryKey);
  // }, []);

  // Get data from local storage
  const [storedGuesses, storeGuesses] = useLocalStorage<Guesses>("guesses", {
    day: today,
    countries: [],
  });

  // Init blank list for storing country guesses
  let storedCountries: Country[] = [];

  // Set up state for tracking guesses and wins
  const [guesses, setGuesses] = useState<Country[]>(storedCountries);
  const [win, setWin] = useState(false);
  const globeRef = useRef<GlobeMethods>(null!);

  useEffect(() => {
    const guessNames = guesses.map((country) => country.properties.NAME);
    storeGuesses({
      day: today,
      countries: guessNames,
    });
  }, [guesses, storeGuesses]);

  // Fallback while loading
  const renderLoader = () => <p>Loading</p>;

  return (
    <Suspense fallback={renderLoader()}>
      <Guesser
        guesses={guesses}
        setGuesses={setGuesses}
        win={win}
        setWin={setWin}
      />
      {!reSpin && (
        <div>
          <Globe guesses={guesses} globeRef={globeRef} />
          <List guesses={guesses} win={win} globeRef={globeRef} />
        </div>
      )}
    </Suspense>
  );
}
