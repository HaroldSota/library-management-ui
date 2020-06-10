<template>
    <main>
      <div  class="container-fluid">
        <router-view :key="key" />
      </div>
    </main>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>
