import { createStore } from "vuex";

export default createStore({
  state: {
    currentUser: null,
    notifications: [],
  },
  mutations: {
    SET_CURRENT_USER(state, user) {
      state.currentUser = user;
    },
    ADD_NOTIFICATION(state, notification) {
      state.notifications.push(notification);
    },
    REMOVE_NOTIFICATION(state, notification) {
      const index = state.notifications.indexOf(notification);
      if (index !== -1) {
        state.notifications.splice(index, 1);
      }
    },
  },
  actions: {
    addNotification({ commit }, notification) {
      commit("ADD_NOTIFICATION", notification);
    },
    removeNotification({ commit }, notification) {
      commit("REMOVE_NOTIFICATION", notification);
    },
  },
});
