<template>
    <div>
        <div :class="['alert alert-danger', {invisible: errorMessage.length==0}]" role="alert">
        {{errorMessage}}
      </div>
    <div class="card mb-4">
        <div class="card-header"><i class="fas fa-list"></i> Books List</div>
        <div class="card-body">
            <div class="table-responsive">
                <p v-if="allBooks.length < 1" class="empty-table">
                    No data
                </p>
                <div class="dataTables_wrapper" v-else>
                    <div class="row">
                        <div class="col-sm-12 col-md-6">
                            <div class="dataTables_length">
                                <label>Show
                                    <select v-model="show_items_per_page"
                                            class="custom-select custom-select-sm form-control form-control-sm">
                                        <option value="10">10</option>
                                        <option value="25">25</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                    </select>
                                </label>
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-6">
                            <div class="dataTables_filter">
                                <label>Search:
                                  <input v-model="queryText" 
                                         class="form-control form-control-sm" 
                                         placeholder=""></label>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <table class="table table-striped table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Title</th>
                                        <th scope="col">Author</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr :key="i" v-for="i in parseInt(getLastIndex())" scope="row">
                                      
                                        <td>{{books[show_items_per_page*page_number+i-1].title}}</td>
                                        <td>{{books[show_items_per_page*page_number+i-1].author}}</td>
                                        <td align="center">
                                            <button type="button" 
                                                    :class="['btn btn-success', {disabled: !books[show_items_per_page*page_number+i-1].isAvailable}]"
                                                    @click="borrow(books[show_items_per_page*page_number+i-1])">Borrow</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12 col-md-5">
                            <div class="dataTables_info" 
                                 id="dataTable_info" 
                                 role="status"
                                 aria-live="polite">Showing {{show_items_per_page*page_number+1}} to {{show_items_per_page*page_number+(getLastIndex() *1)}} of {{books.length}} </div>
                        </div>
                        <div class="col-sm-12 col-md-7">
                            <div class="dataTables_paginate paging_simple_numbers" id="dataTable_paginate">
                                <ul class="pagination">
                                    <li :class="['paginate_button page-item previous', {disabled: page_number ==0}]">
                                        <a href="#"  @click="page_number--"  class="page-link">Previous</a>
                                    </li>
                                    <li :key="i" v-for="i in parseInt(getLastPgeNo())" :class="['paginate_button page-item', {active: i-1 == page_number}]">
                                      <a href="#" @click="page_number= i -1" class="page-link">{{i}}</a>
                                    </li>
                                    <li :class="['paginate_button page-item next ', {disabled: page_number ==getLastPgeNo()-1}]">
                                      <a href="#"  @click="next()" class="page-link">Next</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    </div>
</template>
<script>
import { authHeader } from '../../_helpers';

export default {
  name: 'Library',

  data(){
     return {
       show_items_per_page : 10,
       page_number: 0,
       queryText : "",
       books: [],
       allBooks: [],
       errorMessage:  ''
     }

  },
  methods: {
    edit(item) {
      if (item.name === '' || item.email === '') return
      this.$emit('edit:data', item.id, item)
      
    },
    getLastIndex()
    {
      if(this.books.length > (this.show_items_per_page* (this.page_number +1)))
        return this.show_items_per_page;
      
      
      return this.books.length % this.show_items_per_page;
    },
    getLastPgeNo(){
         return (this.books.length/this.show_items_per_page)%1 == 0
          ? this.books.length/this.show_items_per_page
          : Math.floor(this.books.length/this.show_items_per_page) +1;
    },
    previous(){
      this.page_number--
    },
    next(){
      this.page_number++
    },
    borrow(item){
      if(item.isAvailable)
      {

          this.$http.post("https://localhost:5001/api/Book/Borrow?bookId="+item.id
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
                     this.errorMessage =  e.response.data.Message;     
                    });
      }
    },
    loadData()
    {
     this.$http.get("https://localhost:5001/api/Book/GetAll", {  headers: authHeader() })
              .then(response => {
                      if(response.data)
                      {
                        this.allBooks = response.data;
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
  watch: { 
      queryText: function(newVal)
      {
        this.page_number = 0;
        this.books = this.allBooks.filter(function(item){
          return item.title.toLowerCase().includes(newVal.toLowerCase()) ||  item.author.toLowerCase().includes(newVal.toLowerCase());
         })
      }
    }
}
</script>

<style scoped>
.dataTables_wrapper
{
  width: 98%;
  display: block;
}
.dataTables_length, .dataTables_filter, .dataTables_filter label{
  display: flex;
  white-space: nowrap !important;
}
.dataTables_filter ,.dataTables_paginate{
    float: right;
}
</style>