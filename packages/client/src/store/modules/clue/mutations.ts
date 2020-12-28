import { ClueData, initializeState } from "./index";
import { MutationTree } from "vuex";
import { ClueState, ProvidedAnswers } from "@jeopardai/server/src/types";
import { wsServer } from "@jeopardai/server/src/sockets/commands";

export const mutations: MutationTree<ClueData> = {
  [wsServer.CLUE_STATE_CHANGE]: (state, payload: { clueState: ClueState }) => {
    state.clueState = payload.clueState;
  },
  [wsServer.CURRENT_STATUS]: (state: ClueData, payload: Partial<ClueData>) => {
    Object.keys(payload.currentClue).forEach((key: string) => {
      if (state[key]) {
        state[key] = payload[key];
      }
    });
  },
  [wsServer.DISPLAY_CLUE]: (
    state,
    payload: {
      id: number;
      isDailyDouble: boolean;
      category: string;
      valueIndex: number;
      question: string;
    }
  ) => {
    state.id = payload.id;
    state.category = payload.category;
    state.valueIndex = payload.valueIndex;
    state.question = payload.question;
    state.isDailyDouble = payload.isDailyDouble;
    state.answer = "";
    state.answerLocked = false;
  },
  [wsServer.DISPLAY_ANSWER]: (
    state,
    payload: {
      id: number;
      answer: string;
      provided: ProvidedAnswers[];
    }
  ) => {
    state.answer = payload.answer;
    state.provided.correct = payload.provided.filter((p) => p.evaluated);
    state.provided.incorrect = payload.provided.filter((p) => !p.evaluated);
  },
  [wsServer.END_OF_ROUND]: (state) => {
    const clear = initializeState();
    clear.forEach((prop: string) => {
      state[prop] = clear[prop];
    });
  },
  [wsServer.FJ_DISPLAY_CATEGORY]: (state, payload: { category: string }) => {
    state.category = payload.category;
  },
  [wsServer.ANSWER_RECIEVED]: (state) => {
    state.answerLocked = true;
  },
  [wsServer.GET_DD_WAGER]: (
    state,
    payload: { selected: { valueIndex: number; category: string } }
  ) => {
    state.category = payload.selected.category;
    state.valueIndex = payload.selected.valueIndex;
    state.isDailyDouble = true;
  },
  SET_WAGER: (state, wager: number) => {
    state.wager = wager;
  },
};

export default mutations;
