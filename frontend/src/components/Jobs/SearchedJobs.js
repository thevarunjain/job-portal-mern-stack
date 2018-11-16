import React, { Component } from 'react'
import Header from "../Common/Header"
import JobSearchBar from "./SearchBar";


class SearchedJobs extends Component {
  render() {
    return (
      <div>
        <Header />
        <JobSearchBar />
      </div>
    )
  }
}
export default SearchedJobs;