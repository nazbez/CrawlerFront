<template>
  <div class="container pt-2">
    <form class="pt-3" @submit.prevent="onSubmit" autocomplete="off">
      <div class="form-group">
        <label for="url">Url</label>
        <input
          type="url"
          id="url"
          class="form-control"
          :class="{ 'is-invalid': $v.url.$error }"
          @blur="$v.url.$touch()"
          v-model="url"
          placeholder="Enter the url"
        />
        <div class="invalid-feedback" v-if="!$v.url.url">
          Input should be an url
        </div>
        <div class="invalid-feedback" v-if="!$v.url.required">
          Input field is required
        </div>
      </div>
      <button
        variant="primary"
        type="submit"
        class="btn btn-success"
        @click="createTest"
        v-if="!testRunning"
        :disabled="$v.$invalid"
      >
        Test
      </button>

      <div v-else class="d-flex align-items-center">
        <span>Please wait while test is running...</span>
        <div class="spinner-border text-info mx-3"></div>
      </div>
    </form>
  </div>
</template>

<script>
import { url, required } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      url: "",
      resource: null,
      testRunning: false,
      error: "",
    };
  },
  methods: {
    createTest() {
      this.testRunning = true;
      const userInput = {
        url: this.url,
      };

      this.resource
        .save({}, userInput)
        .then((response) => response.json())
        .then((response) => {
          if (response.error != "") {
            console.log(response.error);
            this.error = response.error;
            alert(this.error);
          } else {
            console.log(response.object);
          }
        })
        .then(() => {
          this.testRunning = false;
          this.url = "";
        });
    },
    onSubmit() {
      this.createTest();
    },
  },
  created() {
    this.resource = this.$resource("Tests");
  },
  validations: {
    url: {
      url,
      required,
    },
  },
};
</script>