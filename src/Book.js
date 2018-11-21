import React, { Component } from 'react'
// import * as BooksAPI from './BooksAPI'
import Changer from "./Changer";


class Book extends Component {

  state = {
    shelfSelection: this.props.book.shelf || "none"

  }

  render () {
    // join the array of authors into a single string
    const authors = this.props.book.authors && this.props.book.authors.join(' | ');
    //create thumbnail url
    let url = (this.props.book.imageLinks && `url(${this.props.book.imageLinks.thumbnail})`);

    return (

        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
              width: 128,
              height: 193,
              backgroundImage: url
            }}>
            </div>
              <Changer
              book={this.props.book}
              onSwitchShelf={this.props.onSwitchShelf}
              />
            </div>
          <div className="book-title">{this.props.title}</div>
          <div className="book-authors">{authors}</div>
          </div>
    )
  }
}

export default Book;
