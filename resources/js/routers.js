import { createWebHistory, createRouter } from "vue-router";
import AdminList from "./pages/admins/AdminList.vue";
import AddAdmin from "./pages/admins/AddAdmin.vue";
import ClientList from "./pages/clients/ClientList.vue";
import AddClient from "./pages/clients/AddClient.vue";
import Dashboard from "./pages/Dashboard.vue";
import Login from "./pages/auth/Login.vue";
import store from "./store";

const routes = [
    {
        name: "login",
        path: "/login",
        component: Login,
        meta: {
            middleware: "guest",
            title: `Login`,
        },
    },
    {
        name: "dashboard",
        path: "/",
        component: Dashboard,
        meta: {
            title: `Dashboard`,
            middleware: "auth",
        },
    },
    {
        name: "admins",
        path: "/admins",
        component: AdminList,
        meta: {
            title: `Admin List`,
            middleware: "super_admin",
        },
    },
    {
        name: "add_admin",
        path: "/admins/add",
        component: AddAdmin,
        meta: {
            title: `Add Admin`,
            middleware: "super_admin",
        },
    },
    {
        name: "clients",
        path: "/clients",
        component: ClientList,
        meta: {
            title: `Client List`,
            middleware: "admin",
        },
    },
    {
        name: "add_client",
        path: "/clients/add",
        component: AddClient,
        meta: {
            title: `Add Client`,
            middleware: "admin",
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const isAuth = store.state.authenticated;
    let role = "";
    if (isAuth) {
        role = store.state.user.data.user.role;
    } else {
        role = "";
    }
    document.title = to.meta.title;
    if (to.meta.middleware == "guest") {
        if (isAuth) {
            next({ name: "dashboard" });
        }
        next();
    } else if (to.meta.middleware == "super_admin") {
        if (isAuth && role === "SUPER_ADMIN") {
            next();
        } else {
            next({ name: "dashboard" });
        }
    } else if (to.meta.middleware == "admin") {
        if (isAuth && role === "ADMIN") {
            next();
        } else {
            next({ name: "dashboard" });
        }
    } else if (to.meta.middleware == "client") {
        if (isAuth && role === "CLIENT") {
            next();
        } else {
            next({ name: "dashboard" });
        }
    } else {
        if (isAuth) {
            next();
        } else {
            next({ name: "login" });
        }
    }
});

export default router;