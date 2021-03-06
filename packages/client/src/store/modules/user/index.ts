import mutations from "./mutations";
import getters from "./getters";
export interface UserData {
  twitchId: string;
  socketId: string;
  connected: boolean;
}

const initializeState = (): UserData => ({
  twitchId: "",
  socketId: "",
  connected: false,
});

export default {
  namespaced: false,
  state: initializeState(),
  mutations,
  actions: {},
  getters,
};
