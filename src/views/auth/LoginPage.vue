<template>
  <div id="loginPage">
    <LoginCard />
  </div>
</template>
<script>
import LoginCard from "../../components/auth/LoginCard.vue";
export default {
  components: { LoginCard },
};
</script>
<style>
#loginPage {
  position: absolute;
  top: 0;
  left: 0;
  
  /* background: black; */
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}
</style>
