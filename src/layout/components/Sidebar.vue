<template>
    <nav class="layout-sb accordion layout-sb-dark">
      <div class="layout-sb-menu">
         <div class="nav">
          <div class="layout-sb-menu-heading"></div>
           <router-link  class="nav-link" to="/library">
              <div class="nav-link-icon"><i class="fas fa-list"></i></div>Library
            </router-link>
           <router-link  class="nav-link" to="/myBooks">
              <div class="nav-link-icon"><i class="fas fa-book"></i></div>Borrowed books
           </router-link>
         </div>
      </div>
    </nav>
</template>

<script>
export default {
  name: 'Sidebar',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
.layout-sb {
  display: flex;
  flex-direction: column;
  height: 100%;
  flex-wrap: nowrap;
  bottom: 0;
}
.layout-sb .layout-sb-menu {
  flex-grow: 1;
}
.layout-sb .layout-sb-menu .nav {
  flex-direction: column;
  flex-wrap: nowrap;
}
.layout-sb .layout-sb-menu .nav .layout-sb-menu-heading {
  padding: 1.75rem 1rem 0.75rem;
  font-size: 0.75rem;
  font-weight: bold;
  text-transform: uppercase;
}
.layout-sb .layout-sb-menu .nav .nav-link {
  display: flex;
  align-items: center;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  position: relative;
}
.layout-sb .layout-sb-menu .nav .nav-link .sb-nav-link-icon {
  font-size: 0.9rem;
}
.layout-sb .layout-sb-menu .nav .nav-link .layout-sb-collapse-arrow {
  display: inline-block;
  margin-left: auto;
  transition: transform 0.15s ease;
}
.layout-sb .layout-sb-menu .nav .nav-link.collapsed .layout-sb-collapse-arrow {
  transform: rotate(-90deg);
}
.layout-sb .layout-sb-menu .nav .layout-sb-menu-nested {
  margin-left: 1.5rem;
  flex-direction: column;
}
.layout-sb .layout-sb-footer {
  padding: 0.75rem;
  flex-shrink: 0;
}

.layout-sb-dark {
  background-color: #212529;
  color: rgba(255, 255, 255, 0.5);
}
.layout-sb-dark .layout-sb-menu .layout-sb-menu-heading {
  color: rgba(255, 255, 255, 0.25);
}
.layout-sb-dark .layout-sb-menu .nav-link {
  color: rgba(255, 255, 255, 0.5);
}
.layout-sb-dark .layout-sb-menu .nav-link .sb-nav-link-icon {
  color: rgba(255, 255, 255, 0.25);
}
.layout-sb-dark .layout-sb-menu .nav-link .layout-sb-collapse-arrow {
  color: rgba(255, 255, 255, 0.25);
}
.layout-sb-dark .layout-sb-menu .nav-link:hover {
  color: #fff;
}
.layout-sb-dark .layout-sb-menu .nav-link.active {
  color: #fff;
}
.layout-sb-dark .layout-sb-menu .nav-link.active .sb-nav-link-icon {
  color: #fff;
}

.nav-link-icon {
  margin-right: 0.5rem;
}

</style>