<template>
  <div class="container pt-2">
    <div v-if="!isNotConnected">
      <Form></Form>
      <TestsTable @noConnection="onNoConnection()"/>
    </div>

    <div v-if="isNotConnected" class="alert alert-danger" role="alert">
      Opps... Something went wrong!
    </div>
  </div>
</template>

<script>
import Form from '../components/Home/Form'
import TestsTable from '../components/Home/TestsTable'
export default {
  data () {
    return {
      isNotConnected: false
    }
  },
  methods: {
    onNoConnection () {
      this.isNotConnected = true
    }
  },
  components: {
    Form,
    TestsTable
  }
}
</script>