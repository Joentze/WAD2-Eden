<template>
  <div id="signupPage">
    <SignupCard />
  </div>
</template>
<script>
import SignupCard from "../../components/auth/SignupCard.vue";
export default {
  components: { SignupCard },
};
</script>
<style>
#signupPage {
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
