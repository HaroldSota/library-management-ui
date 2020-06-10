<template>
    <nav class="topnav navbar navbar-expand navbar-dark bg-dark">
        <a class="navbar-brand" href="#">Library Management</a>
        <div class="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0"></div>
        <ul class="navbar-nav ml-auto ml-md-0">
            <li :class="['nav-item dropdown', {'show': userSettingsDisplay}]">
                    <a class="nav-link dropdown-toggle" 
                      href="#" 
                      @click="userSettingsTogole()"
                      role="button" 
                      data-toggle="dropdown" 
                      aria-haspopup="true" 
                      aria-expanded="false">
                      <i class="fas fa-user fa-fw"></i> {{UserName}}
                    </a>
                    <div :class="['dropdown-menu dropdown-menu-right', {'show': userSettingsDisplay}]" aria-labelledby="userDropdown">
                        <a class="dropdown-item"  href="#" v-on:click="signOut">Sign out</a>
                    </div>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data(){
    return {
      userSettingsDisplay: false
    }
  },
  computed: {
    key() {
      return this.$route.path
    }
  }, methods:{
    signOut(){
        localStorage.removeItem('user',  null)
       this.$router.push({ path:  '/login' })
    },
    userSettingsTogole(){
      this.userSettingsDisplay=!this.userSettingsDisplay;
    }
  }
}
</script>
<style scoped>
.topnav{
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1030;
}
</style>