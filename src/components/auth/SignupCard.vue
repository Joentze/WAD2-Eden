<script setup lang="ts">
import {
  NotificationType,
  useNotification,
} from "../../stores/notificationStore";
import { useSignupStep } from "../../stores/signupStepStore";
import {
  validateEmail,
  validatePhoneNo,
  validateUrl,
  validateTexts,
  validatePhotoUrl,
  validatePassword,
} from "../../validators/authValidators.ts";
import { createNewAccount } from "../../firebaseHelpers/accountHandler.ts";
const notificationStore = useNotification();
const signupStepStore = useSignupStep();

const register = async (data) => {
  const {
    email,
    password,
    confirmPassword,
    companyDescription,
    companyName,
    siteUrl,
    phoneNo,
    accountType,
    photoUrl,
  } = data;
  let tempState = 0;
  console.log(data);
  try {
    validateTexts([companyName, companyDescription]);
    tempState = 1;
    validateEmail(email);
    validatePassword(password, confirmPassword);
    tempState = 2;
    console.log(phoneNo);
    validatePhoneNo(phoneNo);
    validateUrl(siteUrl);
    tempState = 3;
    validatePhotoUrl(photoUrl);
    await createNewAccount(data);
  } catch (e) {
    notificationStore.add({
      title: "Error ❗️",
      description: e,
      type: NotificationType.ERROR,
    });
    signupStepStore.goto(tempState);
  }
};
</script>
<template>
  <div
    class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 h-fit m-auto border border-1"
  >
    <form class="card-body">
      <!-- <IconEdenTitle  /> -->
      <SignupSteps
        :step-no="signupStepStore.step"
        :setState="signupStepStore.goto"
      />
      <!-- <div class="divider" /> -->
      <div v-if="signupStepStore.step === 0">
        <div class="form-control">
          <label class="label">
            <span class="label-text text-primary">Name of Organisation ﹡</span>
          </label>
          <input
            type="email"
            placeholder="example: The Tree Huggers"
            class="input input-sm input-bordered"
            v-model="companyName"
            required
          />
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text text-primary">Description ﹡</span>
          </label>
          <textarea
            type="text"
            placeholder="We love trees!"
            class="textarea textarea-bordered text-black"
            v-model="companyDescription"
            required
          />
        </div>
      </div>
      <div v-if="signupStepStore.step === 1">
        <div class="form-control">
          <label class="label">
            <span class="label-text text-primary">Email ﹡</span>
          </label>
          <input
            type="email"
            v-model="email"
            placeholder="example@mail.com"
            class="input input-sm input-bordered"
            required
          />
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text text-primary">Password ﹡</span>
          </label>
          <input
            type="password"
            v-model="password"
            placeholder="password"
            class="input input-sm input-bordered"
            required
          />
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text text-primary">Confirm Password ﹡</span>
          </label>
          <input
            type="password"
            v-model="confirmPassword"
            placeholder="Confirm Password"
            class="input input-sm input-bordered"
            required
          />
        </div>
      </div>
      <div v-if="signupStepStore.step === 2">
        <p class="text-primary font-bold">Account Details:</p>
        <div class="form-control">
          <label class="label">
            <span class="label-text text-primary">Contact No ﹡</span>
          </label>
          <input
            type="text"
            v-model="phoneNo"
            placeholder="example: 67674455"
            class="input input-sm input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text text-gray-400 flex flex-row gap-2"
              ><IconBuilding />Corporation</span
            >
            <input
              type="radio"
              name="radio-10"
              value="corporation"
              className="radio checked:bg-primary"
              v-model="accountType"
              checked
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text text-gray-400 flex flex-row gap-2">
              <IconPlant />Social Enterprise</span
            >
            <input
              type="radio"
              name="radio-10"
              value="enterprise"
              className="radio checked:bg-primary"
              v-model="accountType"
              checked
            />
          </label>
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text text-primary">Site URL ﹡</span>
          </label>
          <input
            type="text"
            v-model="siteUrl"
            placeholder="https://www.example.com"
            class="input input-sm input-bordered"
            required
          />
        </div>
      </div>
      <div v-if="signupStepStore.step === 3">
        <FileUploaderComponent v-on:upload-image="setPhotoUrl" />
      </div>
      <br />
      <button
        class="btn btn-primary"
        @click.prevent="
          register({
            email,
            password,
            confirmPassword,
            companyDescription,
            companyName,
            siteUrl,
            phoneNo,
            accountType,
            photoUrl,
          })
        "
        v-if="signupStepStore.step === 3"
      >
        Save the Earth
      </button>

      <button
        v-if="signupStepStore.step !== 3"
        class="btn btn-primary"
        @click.prevent="signupStepStore.next()"
      >
        Continue <IconArrowRight />
      </button>
    </form>
  </div>
</template>
<script lang="ts">
import IconPlant from "../icons/IconPlant.vue";
import IconBuilding from "../icons/IconBuilding.vue";
import IconCommunity from "../icons/IconCommunity.vue";
import FileUploaderComponent from "../file/FileUploaderComponent.vue";
import SignupSteps from "./steps/SignupSteps.vue";
import IconEdenTitle from "../icons/IconEdenTitle.vue";
import IconArrowRight from "../icons/IconArrowRight.vue";
export default {
  components: {
    IconPlant,
    IconBuilding,
    IconCommunity,
    FileUploaderComponent,
    SignupSteps,
    IconEdenTitle,
    IconArrowRight,
  },
  methods: {
    // printData: function () {
    //   console.log(this.email, this.password, this.photoUrl);
    // },
    setPhotoUrl: function (url: string) {
      this.photoUrl = url;
    },
    incrementState() {
      if (this.state < 4) {
        this.state++;
      }
    },
  },
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      companyName: "",
      companyDescription: "",
      phoneNo: "",
      accountType: "enterprise",
      siteUrl: "",
      state: 0,
      photoUrl: "",
    };
  },
};
</script>
