import LoginView from "@/views/Auth/LoginView.vue";
import OAuthRedirectView from "@/views/Auth/OAuthRedirectView.vue";

export default [
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
		path: '/oauth/redirect',
		name: 'OAuthRedirectView',
		component: OAuthRedirectView,
	},
];
