import { createRouter, createWebHistory } from "vue-router";
import ChatPage from "../views/chat/ChatPage.vue";
import CompanyCatalog from "../views/company/CompanyCatalog.vue";
import CompanyPage from "../views/company/CompanyPage.vue";
import EnterpriseCatalog from "../views/enterprise/EnterpriseCatalog.vue";
import EnterprisePage from "../views/enterprise/EnterprisePage.vue";
// Testing
import TestPage from "../views/test/Test.vue";
import DashboardPage from "../views/dashboard/Dashboard.vue";
import LearningResourcePage from "../views/learningresources/LearningResources.vue";

import MediaCatalog from "../views/media/MediaCatalog.vue";
import CompanyMediaCatalog from "../views/media/CompanyMediaCatalog.vue";
import EnterpriseMediaCatalog from "../views/media/EnterpriseMediaCatalog.vue";
import ProjectCatalog from "../views/project/ProjectCatalog.vue";
import ProjectPage from "../views/project/ProjectPage.vue";
import LoginPage from "../views/auth/LoginPage.vue";
import SignupPage from "../views/auth/SignupPage.vue";
import LandingPage from "../views/landing/LandingPage.vue";
import EnterpriseDashboardPage from "../views/enterprise/EnterpriseDashboardPage.vue";
import CompanyDashboardPage from "../views/company/CompanyDashboardPage.vue";
import EnterpriseProjectApplicationPage from "../views/enterprise/EnterpriseProjectApplicationPage.vue";
import AwaitPage from "../views/misc/AwaitPage.vue";
import { useFirebaseAuth } from "vuefire";
import { useNotification, NotificationType } from "@/stores/notificationStore";

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
      path: "/dashboard",
      name: "dashboard page",
      component: DashboardPage,
    },
    {
      path: "/learningresources",
      name: "learning resource page",
      component: LearningResourcePage,
    },
    {
      path: "/test",
      name: "test page",
      component: TestPage,
    },
    {
      path: "/enterprise-dashboard",
      name: "enterprise dashboard",
      component: EnterpriseDashboardPage,
      meta: { protected: true },
    },

    {
      path: "/application/project/:projectId",
      name: "project application page",
      component: EnterpriseProjectApplicationPage,
    },
    {
      path: "/corporation-dashboard",
      name: "corporation dashboard",
      component: CompanyDashboardPage,
      meta: { protected: true },
    },
    {
      path: "/corporations",
      name: "company catalog",
      component: CompanyCatalog,
    },
    {
      path: "/corporation/:corporationId",
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
      path: "/await",
      name: "await page",
      component: AwaitPage,
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
    // {
    //   path: "/dashboard",
    //   name: "dashboard page",
    //   component: Dashboard,
    // },
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
  const auth = useFirebaseAuth();
  const notificationStore = useNotification();
  console.log(auth);
  if (to.meta.protected && auth?.currentUser === null) {
    router.push({ path: "/login" });
    notificationStore.add({
      title: "Not Authorised",
      description: "You've have to be logged in to access that page",
      type: NotificationType.ERROR,
    });
  }
  return true;
});

export default router;
