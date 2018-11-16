import React, { Component } from 'react'

class JobSearchBar extends Component {
  render() {
    return (
      <div>
         <div className="jobSearchBar">
      <div>
      <input type="text" placeholder="Search Jobs" value={this.state.searchJobName} onChange={this.onChangeSearchJob} required />      
      </div>

        <div>
      <input type="text" placeholder="Search Location" value={this.state.searchJobName} onChange={this.onChangeLocation} required />
      </div>
    </div>
      </div>
    )
  }
}
export default JobSearchBar;