import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import Jobs from "../views/Jobs/Jobs.vue";
import JobDetails from "../views/Jobs/JobDetails.vue";
import Tasks from "../views/Tasks/Tasks.vue";
import TaskDetails from "../views/Tasks/TaskDetails.vue";
import CreateTask from "../views/Tasks/CreateTask.vue";
import DeleteTask from "../views/Tasks/DeleteTask.vue";
import NotFound from "../views/NotFound.vue";
import SignIn from "../views/Auth/SignIn.vue";
import SignUp from "../views/Auth/SignUp.vue";

const routes = [
	{
		path: "/",
		name: "home",
		component: HomeView,
	},
	{
		path: "/about",
		name: "about",
		component: AboutView,
	},
	{
		path: "/signin",
		name: "signIn",
		component: SignIn,
	},
	{
		path: "/signup",
		name: "signUp",
		component: SignUp,
	},
	{
		path: "/jobs",
		name: "jobs",
		component: Jobs,
	},
	{
		path: "/jobs/:id",
		name: "jobDetails",
		component: JobDetails,
		props: true,
	},
	{
		path: "/tasks",
		name: "tasks",
		component: Tasks,
	},
	{
		path: "/tasks/:id",
		name: "taskDetails",
		component: TaskDetails,
		props: true,
	},
	{
		path: "/createtask/",
		name: "createTask",
		component: CreateTask,
		props: true,
	},
	{
		path: "/deletetask/",
		name: "deleteTask",
		component: DeleteTask,
		props: true,
	},
	// redirect
	{
		path: "/all-jobs",
		redirect: "/jobs",
	},
	{
		path: "/all-tasks",
		redirect: "/tasks",
	},
	// catchall 404
	{
		path: "/:catchAll(.*)",
		name: "notFound",
		component: NotFound,
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
