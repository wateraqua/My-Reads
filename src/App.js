import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookCase from './BookCase'
import * as SortBooks from './SortBooks'
import Search from './Search'

class BooksApp extends React.Component {
  state = {
     books: [],
     newBook: true
  }

  componentDidMount = () => {
    if (this.state.newbook) {
      this.updateAllBooks();
    }
  }

  UpdateAllBooks = () => {
    //get all the books from the API and sort their names alphabetically
    BooksAPI.getAll().then((list) => {
        this.setState({
          books: SortBooks.sortAllBooks(list),
          newBook: false
        })
      })
  }

  bookAdded = () => {
    this.setState({newbook: true});
  }

  switchShelf = (switchBook, shelf) => {
//call API to update shelf for switching selected books to the new shelf
    BooksAPI.update(switchBook, shelf).then(response => {
      //update the state of the book on the shelf
      switchBook.shelf = shelf;
      //update new state and merge into the new array
      this.setState(prevState => ({
        books: prevState.books
        .filter(book =>book.id !== switchBook.id)
        .concat(switchBook)
      }))
  })}


  render() {
    const { books } = this.state;
    return (
      <div className="app">
      <Route
      exact path='/'
      render={(() => (
        <BookCase
        books={books}
        onUpdateAllBooks={this.UpdateAllBooks}
        onSwitchShelf={this.switchShelf}
        />
      ))}/>

      <Route
      exact path='/search'
      render= {(() => (
        <Search selectedBooks={books} onSwitchShelf={this.switchShelf} />
      ))} />
      </div>

    )
  }
}

export default BooksApp
