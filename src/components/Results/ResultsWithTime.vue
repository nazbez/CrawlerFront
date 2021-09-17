<template>
  <div>
    <div class="border-bottom mb-5">
      <h1 class="h2">{{ details.url }}</h1>
    </div>
    <h2 class="h2">PERFORMANCE</h2>
    <div>
      <b-table
        :items="details.results"
        id="my-table"
        :fields="fields"
        responsive="sm"
        :per-page="perPage"
        :current-page="currentPage"
        small
        head-row-variant="dark"
        bordered
        striped
      >
        <template #cell(url)="data">
          <template v-if="data.item.url">
            {{ data.item.url }}
          </template>
        </template>

        <template #cell(responseTime)="data">
          <template v-if="data.item.responseTime">
            {{ data.item.responseTime }}
          </template>
        </template>
      </b-table>

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
  props: ["id"],
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      rows: 0,
      details: {},
      fields: [
        "url",
        { key: "responseTime", label: "Timing", class: "text-center" },
      ],
    };
  },
  created() {
    this.$resource("Tests/" + this.id)
      .get()
      .then((response) => response.json())
      .then((response) => {
        this.details = response.object;
        this.rows = this.details.results.length;
      });
  },
};
</script>