<script setup lang="ts">
import NavItem from "./NavItem.vue";
</script>
<template>
  <div class="drawer" id="navBar">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <!-- Page content here -->
      <label
        for="my-drawer"
        class="btn btn-ghost btn-square btn-sm drawer-button"
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
    <div class="drawer-side">
      <label
        for="my-drawer"
        aria-label="close sidebar"
        class="drawer-overlay"
      ></label>
      <ul class="menu p-4 w-80 min-h-full bg-base-200 text-primary">
        <!-- Sidebar content here -->
        <NavItem
          v-for="content in navContent"
          :icon="content.icon"
          :label="content.label"
          :link="content.link"
        />
      </ul>
    </div>
  </div>
</template>

<style>
#navBar {
  position: fixed;
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
export default {
  components: { IconBuilding, IconTV, IconPlant },
  data() {
    return {
      navContent: [
        { icon: IconPlant, label: "Social Enterprises", link: "/enterprises" },
        { icon: IconBuilding, label: "Companies", link: "/companies" },
        { icon: IconTV, label: "Media", link: "/media" },
      ],
    };
  },
};
interface navItem {
  icon: HTMLElement;
  label: string;
  link: string;
}
</script>
