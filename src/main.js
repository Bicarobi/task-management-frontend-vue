import { createApp, reactive } from "vue";
import App from "./App.vue";
import router from "./router";

/* provide("localStorage", {
	accessToken: "",
	username: "",
	data: {
		// token property returning the ls token value
		accessToken: window.localStorage.getItem("accessToken"),
		username: window.localStorage.getItem("username"),
	},
	watch: {
		// watcher listening for changes on the token property
		// to ensure the new value is written back to ls
		accessToken(value) {
			window.localStorage.setItem("accessToken", value);
		},
		username(value) {
			window.localStorage.setItem("username", value);
		},
	},
}); */

const app = createApp(App);

app.config.globalProperties.$myGlobalVariable = reactive({
	accessToken: "",
	username: "",
});

app.use(router).mount("#app");

/* app.config.globalProperties.$localStorage = { accessToken: "", username: "" };
 */
/* Vue.prototype.$localStorage = new Vue({});
 */
