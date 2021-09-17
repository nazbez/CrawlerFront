<template>
  <div class="mt-5">
    <div class="mt-3">
          <a class="btn btn-dark" href="http://localhost:8080">Come to tests</a>
    </div>
    <ResultsWithTime class="mt-5" :id="id"></ResultsWithTime>
    <ResultsWithFlags
      class="mt-5"
      heading="URLs NOT FOUND AT HTML"
      :inHtml="false"
      :id="id"
    ></ResultsWithFlags>
    <ResultsWithFlags
      class="mt-5"
      heading="URLs NOT FOUND AT SITEMAP"
      :inHtml="true"
      :id="id"
    ></ResultsWithFlags>
  </div>
</template>

<script>
import ResultsWithTime from "../components/Results/ResultsWithTime";
import ResultsWithFlags from "../components/Results/ResultsWithFlags";
export default {
  data() {
    return {
      id: this.$route.params["id"],
    };
  },
  methods: {
    comeToTests(){

    }
  },
  components: {
    ResultsWithTime,
    ResultsWithFlags,
  },
  watch: {
    $route(toR, fromR) {
      this.id = toR.params["id"];
    },
  },
};
</script>