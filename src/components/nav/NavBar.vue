<script setup lang="ts">
import NavItem from "./NavItem.vue";
import { useCurrentUser } from "vuefire";
import { useAuthStore } from "../../stores/authStore.ts";

const userData = useAuthStore().getData;
</script>
<template>
  <div class="drawer h-16 z-10" id="navBar" v-if="isDisplay()">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
    <div class="grow"></div>

    <div class="drawer-content">
      <label
        for="my-drawer"
        class="btn btn-ghost btn-square -m-1 drawer-button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-menu-2 text-primary"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M4 6l16 0"></path>
          <path d="M4 12l16 0"></path>
          <path d="M4 18l16 0"></path>
        </svg>
      </label>
    </div>

    <!-- <p>{{ route }}</p> -->
    <div class="drawer-side">
      <label
        for="my-drawer"
        aria-label="close sidebar"
        class="drawer-overlay"
      ></label>
      <ul class="menu w-80 min-h-full bg-base-100 text-primary">
        <!-- Sidebar content here -->
        <!-- <p>{{ isDisplay }} {{ $route.path }}</p> -->
        <NavItem
          label="Dashboard"
          link="/dashboard"
          :icon="IconDashboard"
          v-if="userData.accountType === 'enterprise'"
        />
        <NavItem
          label="Events"
          link="/events"
          :icon="IconCalendar"
          v-if="userData.accountType === 'corporation'"
        />
        <div class="divider" />
        <NavItem
          v-for="content in navContent"
          :icon="content.icon"
          :label="content.label"
          :link="content.link"
        />
      </ul>
    </div>
    <div class="grow w-full text-center">
      <p class="text-primary font-black">EDEN</p>
    </div>
    <ProfileDropdown v-if="userData.uid" />
    <button
      v-else
      class="btn btn-primary btn-sm btn-outline"
      @click="redirectToLogin()"
    >
      Sign In
    </button>
    <!-- <div class="w-24">
      <p v-if="user">Logged In</p>
      <p v-else>Not Logged In</p>
    </div> -->
  </div>
</template>

<style>
#navBar {
  position: fixed;
  display: flex;
  flex-direction: row;
  left: 0;
  top: 0;
  background: white;
  border-bottom: 1px solid whitesmoke;
  width: 100%;
  padding: 0.75rem;
}
</style>
<script lang="ts">
import IconBuilding from "../icons/IconBuilding.vue";
import IconTV from "../icons/IconTV.vue";
import IconPlant from "../icons/IconPlant.vue";
import IconDashboard from "../icons/IconDashboard.vue";
import ProfileDropdown from "../auth/ProfileDropdown.vue";
import IconCalendar from "../icons/IconCalendar.vue";
import { useRouter } from "vue-router";

export default {
  components: {
    IconBuilding,
    IconTV,
    IconDashboard,
    IconPlant,
    ProfileDropdown,
    IconCalendar,
  },
  methods: {
    redirectToLogin: function () {
      this.$router.push("/login");
    },
    isDisplay: function () {
      return !["/login", "/signup", "/"].includes(this.$route.fullPath);
    },
  },
  data() {
    return {
      // isDisplay: !["/login", "/signup", "/"].includes(this.$route.fullPath),

      navContent: [
        { icon: IconPlant, label: "Social Enterprises", link: "/enterprises" },
        { icon: IconBuilding, label: "Companies", link: "/companies" },
        { icon: IconTV, label: "Media", link: "/media" },
      ],
    };
  },
};
</script>
