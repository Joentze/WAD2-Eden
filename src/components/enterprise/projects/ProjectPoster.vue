<template>
  <!-- You can open the modal using ID.showModal() method -->
  <button class="btn btn-primary btn-square" onclick="my_modal_4.showModal()">
    +
  </button>
  <dialog id="my_modal_4" class="modal text-primary">
    <div class="modal-box w-11/12 max-w-5xl">
      <div class="flex flex-row">
        <div class="flex-grow">
          <h1 class="font-bold text-xl">New Project 🌳</h1>
          <p class="text-gray-400 text-sm">
            Create a new project for your enterprise
          </p>
        </div>

        <button
          :disabled="projectDescription === '' && projectTitle === ''"
          class="btn btn-square btn-primary"
          @click="async () => await post()"
        >
          <IconArrowRight />
        </button>
      </div>

      <div class="divider" />
      <div class="flex flex-col sm:flex-row gap-2 sm:gap-4">
        <div class="form-control w-full">
          <label class="label">
            <span class="label-text text-primary font-bold">Project Title</span>
          </label>
          <input
            type="text"
            v-model="projectTitle"
            placeholder="Type here"
            class="input input-bordered w-full"
          />
        </div>
        <div class="form-control w-full max-w-xs">
          <label class="label">
            <span class="label-text text-primary font-bold">Project Tag</span>
          </label>
          <select class="select select-bordered" v-model="projectTag">
            <option disabled selected :value="undefined">Pick one</option>
            <option value="BEACH">BEACH</option>
            <option value="FOREST">FOREST</option>
            <option value="PEOPLE">PEOPLE</option>
            <option value="ANIMALS">ANIMALS</option>
          </select>
        </div>
      </div>
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text text-primary font-bold"
            >Project Location</span
          >
        </label>
        <input
          type="text"
          placeholder="Type here"
          v-model="projectAddress"
          class="input input-bordered w-full"
        />
      </div>
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text text-primary font-bold"
            >Project Description</span
          >
        </label>
        <textarea
          v-model="projectDescription"
          placeholder="Type here"
          class="textarea textarea-bordered h-24 text-black"
        />
      </div>
      <DateRangeSelector v-on:emitDate="onDateChange" />
      <div class="form-control w-full">
        <label class="label">
          <MediaFileUploaderComponent
            v-on:fileUrls="async (event) => await setFileUrls(event)"
          />
        </label>
      </div>
      <div class="modal-action">
        <form method="dialog">
          <!-- if there is a button, it will close the modal -->
          <button class="btn" id="closeButton">Close</button>
        </form>
      </div>
    </div>
  </dialog>
</template>
<script lang="ts">
import IconArrowRight from "../../icons/IconArrowRight.vue";
import MediaFileUploaderComponent from "../../file/MediaFileUploaderComponent.vue";
import { useAuthStore } from "../../../stores/authStore.ts";
import { postMedia } from "../../../firebaseHelpers/mediaHelpers.ts";
import { validateMediaPost } from "../../../validators/mediaValidators.ts";
import DateRangeSelector from "../../date/DateRangeSelector.vue";
import { createNewProject } from "../../../firebaseHelpers/projectHelpers.ts";
import { validateProject } from "../../../validators/projectValidators.ts";
export default {
  setup() {
    const authStore = useAuthStore();
    const { companyName, photoUrl, uid } = authStore.getData;
    return { companyName, photoUrl, uid };
  },
  components: { IconArrowRight, MediaFileUploaderComponent, DateRangeSelector },
  methods: {
    post: async function () {
      try {
        const projectData = {
          creatorName: this.companyName,
          creatorPhotoUrl: this.photoUrl,
          creatorId: this.uid,
          joined: [],
          projectTitle: this.projectTitle,
          projectStart: new Date(this.projectStart),
          projectEnd: new Date(this.projectEnd),
          projectDescription: this.projectDescription,
          projectAddress: this.projectAddress,
          projectSize: 0,
          projectTag: this.projectTag,
          projectImages: this.projectImages,
          completed: false,
        };
        console.log(projectData);
        validateProject(projectData);
        this.isLoading = true;
        await createNewProject(projectData);
        this.isLoading = false;
        document.getElementById("closeButton").click();
      } catch (e) {
        throw new Error(e.message);
      }
    },
    setFileUrls: function (urls) {
      this.projectImages = urls;
    },
    onDateChange: function (data) {
      const { startDate, endDate } = data;
      console.log(startDate, endDate);
      this.projectStart = startDate;
      this.projectEnd = endDate;
    },
  },
  data() {
    return {
      isLoading: false,
      creatorName: "",
      creatorPhotoUrl: "",
      creatorId: "",
      joined: [],
      projectTitle: "",
      projectStart: new Date(),
      projectEnd: new Date(),
      projectDescription: "",
      projectAddress: "",
      projectSize: 0,
      projectTag: "",
      projectImages: [],
      completed: false,
    };
  },
};
</script>
