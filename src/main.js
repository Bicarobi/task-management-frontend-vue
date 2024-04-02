import { createApp, reactive } from "vue";
import App from "./App.vue";
import router from "./router";
import i18n from "./i18n";
import "@/styles/index.css";

const app = createApp(App);

app.config.globalProperties.$myGlobalVariable = reactive({
	accessToken: "",
	username: "",
	profileImage: "",
	windowWidth: null,
	tabletWindowWidth: 1200,
	mobileWindowWidth: 700,
});

app.use(router).use(i18n).mount("#app");
