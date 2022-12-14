import { createStore } from "vuex";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";
import router from "../routers";
import { useToast } from "vue-toastification";

const toast = useToast();

// Create a new store instance.
const store = createStore({
    plugins: [createPersistedState()],
    state: {
        authenticated: false,
        user: {},
    },
    getters: {
        authenticated(state) {
            return state.authenticated;
        },
        user(state) {
            return state.user.data;
        },
    },
    mutations: {
        SET_AUTHENTICATED(state, value) {
            state.authenticated = value;
        },
        SET_USER(state, value) {
            state.user = value;
        },
    },
    actions: {
        // Auth
        async login({ commit }, data) {
            try {
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${localStorage.getItem("token")}`;
                const loginData = await axios.get("/api/user");
                commit("SET_USER", loginData);
                commit("SET_AUTHENTICATED", true);
                toast.success("Welcome Back!", {
                    transition: "Vue-Toastification__bounce",
                    hideProgressBar: true,
                });
                router.push({ name: "dashboard" });
            } catch (error) {
                console.log(error);
                commit("SET_USER", {});
                commit("SET_AUTHENTICATED", false);
            }
        },

        logout({ commit }) {
            commit("SET_USER", {});
            commit("SET_AUTHENTICATED", false);
            toast.error("Successfully Logged out!", {
                transition: "Vue-Toastification__bounce",
                hideProgressBar: true,
            });
            router.push({ name: "login" });
        },

        // Admin
        async getAdminListAction({ commit }, data) {
            try {
                const result = await axios.get("/api/admins", {
                    params: data,
                });

                return {
                    success: true,
                    data: result.data,
                    message: result.message,
                    errors: [],
                };
            } catch (error) {
                console.log("error > ", error);
                toast.error("Something went wrong.", {
                    transition: "Vue-Toastification__bounce",
                    hideProgressBar: true,
                });

                return {
                    success: false,
                    data: [],
                    message: error.response.data.message,
                    errors: [],
                };
            }
        },

        async getAdminEditAction({ commit }, data) {
            try {
                const result = await axios.get("/api/admins/" + data);

                return {
                    success: true,
                    data: result.data,
                    message: result.message,
                    errors: [],
                };
            } catch (error) {
                toast.error(error.response.data.error, {
                    transition: "Vue-Toastification__bounce",
                    hideProgressBar: true,
                });

                return {
                    success: false,
                    data: [],
                    message: error.response.data.message,
                    errors: [],
                };
            }
        },

        async createNewAdminAction({ commit }, data) {
            try {
                const result = await axios.post("/api/admins", data);
                toast.success(result.data.message, {
                    transition: "Vue-Toastification__bounce",
                    hideProgressBar: true,
                });

                return {
                    success: true,
                    data: result,
                    message: result.message,
                    errors: [],
                };
            } catch (error) {
                console.log("error > ", error);
                if (error.response.status == 422) {
                    toast.error(error.response.data.message, {
                        transition: "Vue-Toastification__bounce",
                        hideProgressBar: true,
                    });

                    return {
                        success: false,
                        data: [],
                        message: error.response.data.message,
                        errors: error.response.data.errors,
                    };
                } else {
                    toast.error("Something went wrong.", {
                        transition: "Vue-Toastification__bounce",
                        hideProgressBar: true,
                    });

                    return {
                        success: false,
                        data: [],
                        message: error.response.data.message,
                        errors: [],
                    };
                }
            }
        },

        async updateAdminAction({ commit }, data) {
            try {
                const result = await axios.put(
                    "/api/admins/" + data.id,
                    data.data
                );
                toast.success(result.data.message, {
                    transition: "Vue-Toastification__bounce",
                    hideProgressBar: true,
                });

                return {
                    success: true,
                    data: result,
                    message: result.message,
                    errors: [],
                };
            } catch (error) {
                console.log("error > ", error);
                if (error.response.status == 422) {
                    toast.error(error.response.data.message, {
                        transition: "Vue-Toastification__bounce",
                        hideProgressBar: true,
                    });

                    return {
                        success: false,
                        data: [],
                        message: error.response.data.message,
                        errors: error.response.data.errors,
                    };
                } else {
                    toast.error("Something went wrong.", {
                        transition: "Vue-Toastification__bounce",
                        hideProgressBar: true,
                    });

                    return {
                        success: false,
                        data: [],
                        message: error.response.data.message,
                        errors: [],
                    };
                }
            }
        },

        async deleteAdminAction({ commit }, data) {
            try {
                const result = await axios.delete("/api/admins/" + data);
                toast.success(result.data.message, {
                    transition: "Vue-Toastification__bounce",
                    hideProgressBar: true,
                });

                return {
                    success: true,
                    data: result,
                    message: result.message,
                    errors: [],
                };
            } catch (error) {
                console.log("error > ", error);
                toast.error(error.response.data.message, {
                    transition: "Vue-Toastification__bounce",
                    hideProgressBar: true,
                });

                return {
                    success: false,
                    data: [],
                    message: error.response.data.message,
                    errors: [],
                };
            }
        },

        // Client
        async getClientListAction({ commit }, data) {
            try {
                const result = await axios.get("/api/clients", {
                    params: data,
                });

                return {
                    success: true,
                    data: result.data,
                    message: result.message,
                    errors: [],
                };
            } catch (error) {
                console.log("error > ", error);
                toast.error("Something went wrong.", {
                    transition: "Vue-Toastification__bounce",
                    hideProgressBar: true,
                });

                return {
                    success: false,
                    data: [],
                    message: error.response.data.message,
                    errors: [],
                };
            }
        },

        async getClientEditAction({ commit }, data) {
            try {
                const result = await axios.get("/api/clients/" + data);

                return {
                    success: true,
                    data: result.data,
                    message: result.message,
                    errors: [],
                };
            } catch (error) {
                toast.error(error.response.data.error, {
                    transition: "Vue-Toastification__bounce",
                    hideProgressBar: true,
                });

                return {
                    success: false,
                    data: [],
                    message: error.response.data.message,
                    errors: [],
                };
            }
        },

        async createNewClientAction({ commit }, data) {
            try {
                const result = await axios.post("/api/clients", data);
                toast.success(result.data.message, {
                    transition: "Vue-Toastification__bounce",
                    hideProgressBar: true,
                });

                return {
                    success: true,
                    data: result,
                    message: result.message,
                    errors: [],
                };
            } catch (error) {
                console.log("error > ", error);
                if (error.response.status == 422) {
                    toast.error(error.response.data.message, {
                        transition: "Vue-Toastification__bounce",
                        hideProgressBar: true,
                    });

                    return {
                        success: false,
                        data: [],
                        message: error.response.data.message,
                        errors: error.response.data.errors,
                    };
                } else {
                    toast.error("Something went wrong.", {
                        transition: "Vue-Toastification__bounce",
                        hideProgressBar: true,
                    });

                    return {
                        success: false,
                        data: [],
                        message: error.response.data.message,
                        errors: [],
                    };
                }
            }
        },

        async updateClientAction({ commit }, data) {
            try {
                const result = await axios.put(
                    "/api/clients/" + data.id,
                    data.data
                );
                toast.success(result.data.message, {
                    transition: "Vue-Toastification__bounce",
                    hideProgressBar: true,
                });

                return {
                    success: true,
                    data: result,
                    message: result.message,
                    errors: [],
                };
            } catch (error) {
                console.log("error > ", error);
                if (error.response.status == 422) {
                    toast.error(error.response.data.message, {
                        transition: "Vue-Toastification__bounce",
                        hideProgressBar: true,
                    });

                    return {
                        success: false,
                        data: [],
                        message: error.response.data.message,
                        errors: error.response.data.errors,
                    };
                } else {
                    toast.error("Something went wrong.", {
                        transition: "Vue-Toastification__bounce",
                        hideProgressBar: true,
                    });

                    return {
                        success: false,
                        data: [],
                        message: error.response.data.message,
                        errors: [],
                    };
                }
            }
        },
        async deleteClientAction({ commit }, data) {
            try {
                const result = await axios.delete("/api/clients/" + data);
                toast.success(result.data.message, {
                    transition: "Vue-Toastification__bounce",
                    hideProgressBar: true,
                });

                return {
                    success: true,
                    data: result,
                    message: result.message,
                    errors: [],
                };
            } catch (error) {
                console.log("error > ", error);
                toast.error(error.response.data.message, {
                    transition: "Vue-Toastification__bounce",
                    hideProgressBar: true,
                });

                return {
                    success: false,
                    data: [],
                    message: error.response.data.message,
                    errors: [],
                };
            }
        },
    },
});

export default store;
