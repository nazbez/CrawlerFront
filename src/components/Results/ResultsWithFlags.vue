<template>
  <div v-if="results.length != 0" class="table-responsive">
    <h1 class="h2">{{ heading }}</h1>
    <div>
      <b-table
        :items="results"
        :fields="fields"
        responsive="sm"
        head-row-variant="dark"
        :per-page="perPage"
        :current-page="currentPage"
        small
        bordered
        striped
      ></b-table>

      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
        align="center"
        size="lg"
      ></b-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: ["heading", "inHtml", "id"],
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      rows: 0,
      results: [],
      fields: ["url"],
    };
  },
  created() {
    this.$resource("Tests/" + this.id)
      .get()
      .then((response) => response.json())
      .then((response) => {
        if (response.object.results) {
          this.results = response.object.results.filter(
            (x) => x.inHtml == this.inHtml && x.inSitemap == !this.inHtml
          );
          this.rows = this.results.length;
        }
      });
  },
};
</script>