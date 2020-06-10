<template>
    <div style="width:100%">
      <navbar />
        <div class="app-layout">
            <div class="app-layout-nav">
               <sidebar />
            </div>
            <div class="app-layout-content">
               <app-main />
            </div>
        </div>
    </div>
</template>
<script>
import { Navbar, Sidebar, AppMain } from './components'
export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  }
}
</script>

<style scoped>
.app-layout {
  display: flex;
  padding-top: 50px;
}

.app-layout .app-layout-nav{
  position: fixed;
  right: 0;
  left: 0;
  flex-basis: 225px;
  flex-shrink: 0;
}
.app-layout-nav{
  max-width: 225px;
  height: 100%;
  overflow: hidden;
}
.app-layout .app-layout-content {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 0;
  flex-grow: 1;
  min-height: calc(100vh - 56px);
  margin-left: 225px;
}
</style>