<template>
  <p>Landing</p>
  <button class="btn btn-primary" @click.prevent="toLogin()">
    Click to Login
  </button>
</template>
<script>
export default {
  methods: {
    toLogin: function () {
      this.$router.push("login");
    },
  },
};
</script>
