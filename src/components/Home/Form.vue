<template>
  <div class="container pt-2">
      <form class="pt-3" @submit.prevent="onSubmit">
        <div class="form-group">
            <label for="url">Url</label>
            <input 
            type="url" 
            id="url" 
            class="form-control"
            :class="{'is-invalid': $v.url.$error}"
            @blur="$v.url.$touch()" 
            v-model="url"/>
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
            >Test</button>

        <div v-if="testRunning" class="d-flex align-items-center">
          <span>Please wait while test is running...</span>
          <div class="spinner-border text-info mx-3"></div>
        </div>
      </form>
  </div>
</template>

<script>
import { url, required } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      url: "",
      resource: null,
      testRunning: false
    };
  },
  methods: {
    createTest() {
      this.testRunning = true
      const userInput = {
        url: this.url,
      };

      this.resource.save({}, userInput)
        .then(response => response.json())
        .catch(() => {
          this.testRunning = false
        })
    },
    onSubmit(){
       this.createTest()
    }
  },
  created() {
    this.resource = this.$resource("Tests");
  },
  validations: {
      url: {
        required,
        url
      }
  }
};
</script>