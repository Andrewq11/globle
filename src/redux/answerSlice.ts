import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AnswerState {
  key: number;
}

const initialState: AnswerState = {
  key: Math.round(Math.random() * 196),
};

export const answerSlice = createSlice({
  name: "answer",
  initialState,
  reducers: {
    newCountryKey: (state) => {
      // Pick random country
      const key = Math.round(Math.random() * 196);
      state.key = key;
      console.log('New country key: ', key)

      // let key;
      // while (true) {
      //   // Pick random country
      //   key = Math.round(Math.random() * 196);
      //   let prevAnswers: any = localStorage.getItem("answers");
      //   prevAnswers = JSON.parse(prevAnswers);

      //   if (!prevAnswers.includes(key)) {
      //     prevAnswers.push(key);
      //     localStorage.setItem("answers", JSON.stringify(prevAnswers));
      //     break;
      //   }
      // }

      // state.key = key;
    },
  },
});

// Action creators are generated for each case reducer function
export const { newCountryKey } = answerSlice.actions;

export default answerSlice.reducer;
