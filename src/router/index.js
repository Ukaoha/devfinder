import { createRouter, createWebHistory } from "vue-router";
import LandingView from "../views/LandingView.vue";
import DetailsView from "../views/DetailsView.vue";
import NotFoundView from "../views/NotFound.vue";

const routes = [
	{
		path: "/",
		name: "home",
		component: LandingView,
	},
	{
		path: "/repo/:id",
		name: "repo-details",
		component: DetailsView,
		props: true,
	},
	{
		path: "/:catchAll(.*)",
		component: NotFoundView,
		// redirect: "/",
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
