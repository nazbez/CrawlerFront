<template>
  <div class="text-center mt-5">
    <h1 class="h2">Test results</h1>

    <b-table
      id="my-table"
      :fields="fields"
      :items="tests"
      responsive="sm"
      head-row-variant="dark"
      bordered
      striped
    >
      <template #cell(id)="data">
        {{ data.item.id }}
      </template>

      <template #cell(website)="data">
        {{ data.item.url }}
      </template>

      <template #cell(date)="data">
        {{  data.item.saveTime}}
      </template>

      <template #cell(details)="data">
        <router-link :to="{ name: 'TestResult', params: { id: data.item.id } }">
          <a>see details</a>
        </router-link>
      </template>
    </b-table>

    <nav style="margin: auto">
      <ul class="pagination">
        <li class="page-item">
          <button
            class="page-link"
            aria-label="Previous"
            @click="loadPage(currentPage - 1)"
          >
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">Previous</span>
          </button>
        </li>
        <li class="page-item">
          <button
            class="page-link"
            aria-label="Next"
            @click="loadPage(currentPage + 1)"
          >
            <span aria-hidden="true">&raquo;</span>
            <span class="sr-only">Next</span>
          </button>
        </li>
      </ul>
      <h4>{{ currentPage }} of {{ totalPages }}</h4>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tests: [],
      pageSize: 10,
      currentPage: 1,
      totalPages: 0,
      fields: ["id", "website", "date", { key: "details", label: "More info" }],
    };
  },
  methods: {
    loadPage(newPage) {
      if (newPage < 1) {
        this.currentPage = 1;
      } else if (newPage > this.totalPages) {
        this.currentPage = this.totalPages;
      } else {
        this.currentPage = newPage;
      }

      this.$resource(
        "Tests?PageNumber=" + this.currentPage + "&PageSize=" + this.pageSize
      )
        .get()
        .then((response) => response.json())
        .then((response) => {
          this.tests = response.tests;
          this.totalPages = response.pageInfo.totalPages;
        });
    },
  },
  created() {
    this.$resource(
      "Tests?PageNumber=" + this.currentPage + "&PageSize=" + this.pageSize
    )
      .get()
      .then((response) => response.json())
      .then((response) => {
        this.tests = response.tests;
        this.totalPages = response.pageInfo.totalPages;
      });
  },
};
</script>