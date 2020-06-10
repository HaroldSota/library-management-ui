<template>
    <div id="login-container">
        <div id="login-container-content">
            <main>
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-5">
                            <div class="card shadow-lg border-0 rounded-lg mt-5">
                                <div class="card-body">
                                  <br>
                                    <p class="text-center">
                                      Use: admin@gmail.com and 1234567890
                                    </p>
                                  <hr>

                                  	<h4 class="card-title text-center mb-4 mt-1">Sign in</h4>
                                    <hr>
                                    <p class="text-danger text-center hidden">{{loginForm.errorMessage}}</p>
                                    <form :model="loginForm">
                                      	<div class="form-group">
                                            <div class="input-group">
                                                  <div class="input-group-prepend">
                                                      <span class="input-group-text"> <i class="fa fa-user"></i> </span>
                                                  </div>
                                                <input v-model="loginForm.username" 
                                                      class="form-control py-4" 
                                                      type="email"
                                                      placeholder="Enter email address" />
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="input-group">
                                                    <div class="input-group-prepend">
                                                        <span class="input-group-text"> <i class="fa fa-lock"></i> </span>
                                                    </div>
                                                <input v-model="loginForm.password"
                                                      v-on:keydown.enter.stop="handleLogin"
                                                      class="form-control py-4" 
                                                      type="password" 
                                                      placeholder="Enter password" />
                                            </div>
                                       </div>
                                       <div class="form-group d-flex align-items-center justify-content-center ">
                                         <a href="#" @click.prevent="handleLogin"
                                                 class="btn btn-lg btn-success btn-block">Sign in</a>
                                       </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>
<script>
export default {
  name: 'Login',
  data() {

    return {
      loginForm: {
        username: '',
        password: '',
        errorMessage: ''
      },

      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    handleLogin() {
        if (this.loginForm.username.length < 9) {
          this.loginForm.errorMessage = 'Username must be at least 9 characters';
          return false
        } else if (this.loginForm.password.length < 9){
          this.loginForm.errorMessage = 'Password must be at least 9 characters';
          return false
        }
        else{
          if(!this.loading)
          {
              this.$http.post("https://localhost:5001/api/User/Authenticate",
                {
                  Username: this.loginForm.username, 
                  Password: this.loginForm.password
                })
                .then(response => {
                          if(response.data)
                          {
                            console.log(response.data);
                            localStorage.setItem('user',  JSON.stringify(response.data))
                            this.loading = false
                            this.$router.push({ path: this.redirect || '/' })
                          }
                  })
                  .catch(e => {
                    this.loading = false
                    this.loginForm.errorMessage = e.response.data.Message;                 
                  });

                this.loading = true
                return  true;
          }
          return false;
        }
    }
  }
}
</script>

<style>
body
{
  background-color: #24292e !important;
}
#login-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
#login-container #login-container-content {
  min-width: 0;
  flex-grow: 1;
}
#login-container #login-container-content {
  min-width: 0;
}
</style>