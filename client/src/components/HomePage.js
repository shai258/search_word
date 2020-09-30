import React, { Component } from 'react'

import FormBar from './FormBar';
import ResultsDisplay from './ResultsDisplay';

class HomePage extends Component {
  state = {
    results: []
  }

  searchWords = ({ directoryPath, wordsFilePath, wordToSearch }) => {
    fetch (`/search/?directory_path=${directoryPath}&words_file_path=${wordsFilePath}&word_to_search=${wordToSearch}`)
      .then(data => data.json())
        .then(data => this.setState({results: data}))    
  }

  render() {
    return (
      <div>
        <FormBar searchWords={this.searchWords}/>
        <ResultsDisplay results={this.state.results}/>
      </div>
    )
  }
}

export default HomePage;