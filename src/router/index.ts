import { createRouter, createWebHistory } from "vue-router";
import ChatPage from "../views/chat/ChatPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/companies",
      name: "company catalog",
      component: "",
    },
    {
      path: "/company/:companyId",
      name: "company about page",
      component: "",
    },
    {
      path: "/enterprises",
      name: "social enterprise catalog",
      component: "",
    },
    {
      path: "/enterprise/:enterpriseId",
      name: "social enterprise about page",
      component: "",
    },
    {
      path: "/projects",
      name: "project page",
      component: "",
    },
    {
      path: "/project/:projectId",
      name: "project about page",
      component: "",
    },
    {
      path: "/media",
      name: "media catalog",
      component: "",
    },
    {
      path: "/company/media/:companyId",
      name: "company media catalog page",
      component: "",
    },
    {
      path: "/enterprise/media/:enterpriseId",
      name: "enterprise media catalog page",
      component: "",
    },
    {
      path: "/chat/:enterpriseId/:companyId",
      name: "chat page between enterprise and company",
      component: ChatPage,
      meta: { protected: true },
    },
  ],
});

router.beforeEach((to: any, from: any) => {
  return false;
});

export default router;
