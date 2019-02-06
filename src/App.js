import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import BookShelf from './components/bookshelf/bookShelf'
import SearchBooks from './components/search/searchBooks'
import * as BooksAPI from './BooksAPI'





export default class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      books: []
    }
  }

  componentDidMount(){
    BooksAPI.getAll()
      .then((books) =>{
        this.setState(() => ({
          books
        }))
      })
  }

  MoveBooks = (bookSelect, to) => {
    if(!this.state.books.find((value) => value.id === bookSelect.id)){
      bookSelect.shelf = to
      this.setState((currentState) => ({
        books : currentState.books.concat(bookSelect)
      }))
    }else {
      this.setState((currentState) => ({
        books : currentState.books.map(book => book.id === bookSelect.id ? ({...book, shelf: to}): book)
      }))
    }
    BooksAPI.update(bookSelect, to)
}

  render() {
    return (
      <div>
        <Route exact path='/' component={() => (
          <BookShelf moveBooks={this.MoveBooks} books={this.state.books}/>
        )}/>
         <Route path='/search' component={() => (
          <SearchBooks moveBooks={this.MoveBooks} booksOnShelfs={this.state.books}/>
        )}/>
      </div>
    )
  }
}