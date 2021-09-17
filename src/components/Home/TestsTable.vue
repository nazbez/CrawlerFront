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
        <template v-if="data.item.id">
          {{ data.item.id }}
        </template>
      </template>

      <template #cell(website)="data">
        <template v-if="data.item.url">
          {{ data.item.url }}
        </template>
      </template>

      <template #cell(date)="data">
        <template v-if="data.item.saveTime">
          {{ data.item.saveTime }}
        </template>
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
            :disabled="currentPage == 1"
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
            :disabled="currentPage == totalPages"
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
      totalPages: 1,
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

      this.getResponse();
    },
    getResponse() {
      this.$resource(
        "Tests?PageNumber=" + this.currentPage + "&PageSize=" + this.pageSize
      )
        .get()
        .then((response) => response.json())
        .then((response) => {
          this.tests = response.object.tests;
          this.totalPages = response.object.pageInfo.totalPages;
        });
    },
  },
  created() {
    this.getResponse();
  },
};
</script>