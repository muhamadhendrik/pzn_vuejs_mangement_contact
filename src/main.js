import {createApp} from "vue";
import App from "./App.vue";
import {createRouter, createWebHistory} from "vue-router";
import Layout from "./components/Layout.vue";
import UserRegister from "./components/User/UserRegister.vue";
import UserLogin from "./components/User/UserLogin.vue";
import DashboardLayout from "./components/DashboardLayout.vue";
import ContactList from "./components/Contact/ContactList.vue";
import UserProfile from "./components/User/UserProfile.vue";
import UserLogout from "./components/User/UserLogout.vue";
import ContactCreate from "./components/Contact/ContactCreate.vue";
import ContactEdit from "./components/Contact/ContactEdit.vue";
import ContactDetail from "./components/Contact/ContactDetail.vue";
import AddressCreate from "./components/Address/AddressCreate.vue";
import AddressEdit from "./components/Address/AddressEdit.vue";
import {useLocalStorage} from "@vueuse/core";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            component: Layout,
            children: [
                { path: "", redirect: "/login" },
                { path: "register", name: "register", component: UserRegister, meta: { guestOnly: true } },
                { path: "login", name: "login", component: UserLogin, meta: { guestOnly: true } },
            ],
        },
        {
            path: "/dashboard",
            component: DashboardLayout,
            meta: { requiresAuth: true },
            children: [
                { path: "", redirect: "/dashboard/contacts" },
                { path: "contacts", name: "contacts.list", component: ContactList },
                { path: "contacts/create", name: "contacts.create", component: ContactCreate },
                { path: "contacts/:id/edit", name: "contacts.edit", component: ContactEdit },
                { path: "contacts/:id", name: "contacts.detail", component: ContactDetail },
                { path: "contacts/:id/addresses/create", name: "addresses.create", component: AddressCreate },
                { path: "contacts/:id/addresses/:addressId/edit", name: "addresses.edit", component: AddressEdit },
                { path: "users/profile", name: "users.profile", component: UserProfile },
                { path: "users/logout", name: "users.logout", component: UserLogout },
            ],
        },
    ],
});

router.beforeEach((to, from, next) => {
    const token = useLocalStorage("token", "");
    const isAuthenticated = token.value != "" || null ? true : false;

    if (!isAuthenticated && to.path.startsWith('/dashboard')) {
        next('/login');
        return;
    }

    if (isAuthenticated && (to.path === '/login' || to.path === '/register' || to.path === '/')) {
        next('/dashboard');
        return;
    }

    if (to.path === '/') {
        next(isAuthenticated ? '/dashboard' : '/login');
        return;
    }
    next();
});

createApp(App).use(router).mount("#app");
