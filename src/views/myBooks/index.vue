<template>
<div>
        <div :class="['alert alert-danger', {invisible: errorMessage.length==0}]" role="alert">
        {{errorMessage}}
      </div>
    <div class="card mb-4">

        <div class="card-header"><i class="fas fa-book mr-1"></i>Borrowed Books</div>
        <div class="card-body">
            <div class="table-responsive">
                <p v-if="books.length < 1" class="empty-table">
                    No data
                </p>
                      <div class="col-sm-12" v-else>
                            <table class="table table-striped table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Title</th>
                                        <th scope="col">Author</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr :key="i" v-for="i in books.length" scope="row">
                                        <td>{{books[i-1].title}}</td>
                                        <td>{{books[i-1].author}}</td>
                                        <td align="center">
                                            <button type="button" 
                                                    class="btn btn-success"
                                                    @click="returnBook(books[i-1])">Return</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import { authHeader } from '../../_helpers';

export default {
  name: 'MyBooks',
    data(){
     return {
       books: [],
       errorMessage:  ''
     }
  },
  methods: {
        returnBook(item)
        {
          this.$http.post("https://localhost:5001/api/Book/ReturnBook?borrowId="+item.id
                    ,{}
                    ,{  headers: authHeader() })
                    .then(response => {
                          if(response.data)
                          {
                            this.loadData();
                          }
                    })
                    .catch(e => {
                     console.log(e);
                     this.errorMessage = e.response.data.Message;
                    });
        },
        loadData()
        {
            this.$http.get("https://localhost:5001/api/Book/GetBorrowedBooksByUser", {  headers: authHeader() })
                      .then(response => {
                              if(response.data)
                              {
                                this.books = response.data;
                              }
                      })
                      .catch(e => {
                        console.log(e);
                        this.errorMessage =  e.response.data.Message;
                      });
        }
  },
  created:function(){
    this.loadData();
  },
}
</script>
