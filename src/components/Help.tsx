// import useCheckMobile from "../hooks/useCheckMobile";
import { isMobile } from "react-device-detect";
import Outline from "./Outline";

export default function Help() {
  // const isMobile = useCheckMobile();
  const countrySize = isMobile ? 125 : 150;
  return (
    <div className="my-2 space-y-7">
      <h2
        className="text-center text-2xl my-5 font-extrabold"
        style={{ fontFamily: "'Montserrat'" }}
      >
        How to play
      </h2>
      <p>
        Every day, there is a new Mystery Country. Your goal is to guess the
        mystery country using the fewest number of guesses. Each incorrect guess
        will appear on the globe with a colour indicating how close it is to the
        Mystery Country.
      </p>
      <p>
        For example, if the Mystery Country is <b>Japan</b>, then the following
        countries would appear with these colours if guessed:
      </p>
      <div className="flex flex-col md:flex-row justify-between items-center">
        {["France", "Nepal", "Mongolia", "South Korea"].map((country, idx) => {
          return (
            <Outline key={idx} countryName={country} width={countrySize} />
          );
        })}
      </div>
      <p>A new Mystery Country will be available every day!</p>
    </div>
  );
}
