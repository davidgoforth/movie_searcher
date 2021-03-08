import React, { Component } from 'react';
import './App.css';
import MovieRow from './MovieRow.js'
import $ from 'jquery'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.performSearch("A")
  }

  performSearch(searchTerm) {
    console.log("Performing a search using TMDB")
    const urlString = "https://api.themoviedb.org/3/search/movie?api_key=5e4bccceac38841ef6fbcfe350feda68&query=" + searchTerm
    $.ajax({
      url: urlString,
      success: (searchResults) => {
        console.log("Fetched data successfully!")
        const results = searchResults.results

        var movieRows = []

        results.forEach((movie) => {
          movie.poster_src = "https://image.tmdb.org/t/p/w185" + movie.poster_path

          const movieRow = <MovieRow key={movie.id} movie={movie}/>
          movieRows.push(movieRow)
        })

        this.setState({rows: movieRows})
      },
      error: (xhr, status, err) => {
        console.error("Failed to fetch data!")
      }
    })
  }

  searchChangeHandler(event) {
    console.log(event.target.value)
    const boundObject = this
    const searchTerm = event.target.value
    boundObject.performSearch(searchTerm)
  }

  render() {
    return (
      <div>
      
        <table className="titleBar">
          <tbody>
            <tr>
              <td>
                <img alt="poster" width="50" src="tmdb.svg"/>
              </td>
              <td width= "12" td/>
              <td>
                <h1>The Movie Database Search</h1>
              </td>
            </tr>
          </tbody>
        </table>

        <input style={{
          fontSize: 24,
          display: 'block',
          width: "99%",
          paddingTop: 8,
          paddingBottom: 8,
          paddingLeft: 20
        }} onChange={this.searchChangeHandler.bind(this)} placeholder = "Search..." />

        {this.state.rows}

      </div>
    );
  }
}

export default App;