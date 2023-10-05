import { createRouter, createWebHistory } from "vue-router";
import ChatPage from "../views/chat/ChatPage.vue";
import CompanyCatalog from "../views/company/CompanyCatalog.vue";
import CompanyPage from "../views/company/CompanyPage.vue";
import EnterpriseCatalog from "../views/enterprise/EnterpriseCatalog.vue";
import EnterprisePage from "../views/enterprise/EnterprisePage.vue";
import MediaCatalog from "../views/media/MediaCatalog.vue";
import CompanyMediaCatalog from "../views/media/CompanyMediaCatalog.vue";
import EnterpriseMediaCatalog from "../views/media/EnterpriseMediaCatalog.vue";
import ProjectCatalog from "../views/project/ProjectCatalog.vue";
import ProjectPage from "../views/project/ProjectPage.vue";
import LoginPage from "../views/auth/LoginPage.vue";
import SignupPage from "../views/auth/SignupPage.vue";
import LandingPage from "../views/landing/LandingPage.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: LoginPage,
    },
    {
      path: "/signup",
      name: "signup",
      component: SignupPage,
    },
    {
      path: "/",
      name: "landing",
      component: LandingPage,
    },
    {
      path: "/companies",
      name: "company catalog",
      component: CompanyCatalog,
    },
    {
      path: "/company/:companyId",
      name: "company about page",
      component: CompanyPage,
    },
    {
      path: "/enterprises",
      name: "social enterprise catalog",
      component: EnterpriseCatalog,
    },
    {
      path: "/enterprise/:enterpriseId",
      name: "social enterprise about page",
      component: EnterprisePage,
    },
    {
      path: "/projects",
      name: "project catalog page",
      component: ProjectCatalog,
    },
    {
      path: "/project/:projectId",
      name: "project about page",
      component: ProjectPage,
    },
    {
      path: "/media",
      name: "media catalog",
      component: MediaCatalog,
    },
    {
      path: "/company/media/:companyId",
      name: "company media catalog page",
      component: CompanyMediaCatalog,
    },
    {
      path: "/enterprise/media/:enterpriseId",
      name: "enterprise media catalog page",
      component: EnterpriseMediaCatalog,
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
  if (to.meta.protected) return false;
  return true;
});

export default router;
