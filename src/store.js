import { createStore } from "vuex";

export default createStore({
  state: {
    currentUser: null,
    notifications: [],
    formData: {
      text: "",
      name: "",
      email: "",
    },
  },
  mutations: {
    updateFormData(state, newData) {
      state.formData = newData;
    },
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
    setFormData({ commit }, newData) {
      commit("updateFormData", newData);
    },
    addNotification({ commit }, notification) {
      commit("ADD_NOTIFICATION", notification);
    },
    removeNotification({ commit }, notification) {
      commit("REMOVE_NOTIFICATION", notification);
    },
  },
  getters: {
    formData: (state) => state.formData,
  },
});
