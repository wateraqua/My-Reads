import React, { Component } from 'react'
// import * as BooksAPI from './BooksAPI'
import Book from "./Book";



class Bookshelf extends Component {
  state = {}

  render () {

    const { books, onSwitchShelf } = this.props

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title"
        key={this.props.shelf.name.toString()}>{this.props.shelf.name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.shelf.books.map(book => (
              //map the books and create a list of them in html format on the shelf
              <li key={book.id}>
                <Book
                  book={book}
                  books={books}

                  onSwitchShelf={onSwitchShelf}
                />
                </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Bookshelf;
