import React from 'react'

/*
Importando os componentes
*/
import BookShelf from './components/bookshelf/bookShelf'
import SearchBooks from './components/search/searchBooks'
import * as BooksAPI from './BooksAPI'
/*utilizando o dom para rendenizar */
import { Route } from 'react-router-dom'
import './App.css'






export default class App extends React.Component {
/** criando construtor */
  constructor(props){
    super(props)
    this.state = {
      books: []
    }
  }

/** Metodo render serve para rendenizar as coisas na tela */
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

/** modelo para retornar valores da Api */
  componentDidMount(){
    BooksAPI.getAll()
      .then((books) =>{
        this.setState(() => ({
          books
        }))
      })
  }

 


/** função para mover os livros das estantes */
  MoveBooks = (bookSelect, stand) => {
    /** Se o estado do livro for igual ao valor da estante ele exibe*/
    if(!this.state.books.find((value) => value.id === bookSelect.id)){
      bookSelect.shelf = stand
      /** seta o estado atual no array de livros da estante */
      this.setState((state) => ({
        books : state.books.concat(bookSelect)
      }))
    }else {
      this.setState((state) => ({
        books : state.books.map(book => 
          book.id === bookSelect.id ? ({...book, shelf: stand}): book)
      }))
    }
    /** atualiza os livros */
    BooksAPI.update(bookSelect, stand)
}
}