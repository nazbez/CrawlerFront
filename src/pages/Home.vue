<template>
  <div class="container pt-2">
    <div>
      <Form></Form>
      <TestsTable />
    </div>
  </div>
</template>

<script>
import Form from "../components/Home/Form";
import TestsTable from "../components/Home/TestsTable";
export default {
  components: {
    Form,
    TestsTable,
  },
};
</script>