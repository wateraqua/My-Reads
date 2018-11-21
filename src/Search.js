import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import * as SortBooks from './SortBooks'



class Search extends Component {
  state = {
    query: '',
    newbooks: [],
    searchErr: false
  }

queryTimer = null;

changeQuery = (value) => {
  // adapted from Dough Brown's tutorial video
  // giving user some time to type before excuting the search
  clearTimeout(this.queryTimer);
  this.setState({ query: value});
  this.queryTimer = setTimeout(this.updateResearch, 150);
}

  updateResearch = () => {
    //disable empty query search
    if(this.state.query === '') {
      this.setState({ searchErr: false, newbooks: [] });
    }

    BooksAPI.search(this.state.query.trim()).then(response => {

      let newList =[];
      let newSearchErr = false;
      if(response === undefined || (response.searchErr && response.searchErr !== 'Invalid')) {
        newSearchErr = true;
      }else if (response.length){
        // check if there are books on the shelf and also in the research results
        // if the book is on both shelf and search results, apply it's shelf data on the search retults

        newList = SortBooks.combineShelfAndSearch(this.props.selectedBooks, response);
        newList = SortBooks.sortAllBooks(newList);
      }
      return this.setState({ searchErr: newSearchErr, newbooks: newList});
    })
  }

  componentWillReceiveProps = (props) => {
    //combine and sort books on the shelf and search lists for every new search, then reset state
    this.props = props;
    let newList = SortBooks.combineShelfAndSearch(this.props.selectedBooks, this.state.newbooks);
    newList = SortBooks.sortAllBooks(newList);
    this.setState({newBooks: newList});
  }


  render () {
    const { newbooks } = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
           Back
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type='text'
              placeholder='Search by title or author'
              value={ this.state.query }
              onChange={ (event) => this.changeQuery(event.target.value) }
            />
          </div>
        </div>
        <div className="search-books-results">
          {newbooks.searchErr && (
              <div className= "search-error">
                  Something is going wrong! </div>
              )}

          {!newbooks.searchErr && (
            <span className= "search-success">
              <h3> Found {newbooks.length}&nbsp; books </h3>
                  </span>
            )}
          <ol className="books-grid">
            {newbooks.map(newbook => (
              <li key={newbook.id}>
                <Book
                  book={newbook}
                  onSwitchShelf={this.props.onSwitchShelf}
                  />
                </li>
            ))}
          </ol>
          </div>

        </div>

    )
  }
}

export default Search;
