import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

import './FormBar.css';


class FormBar extends Component {
  state = {
    directoryPath: '',
    wordsFilePath: '',
    wordToSearch: '',
    words: ['it', 'as', 'the', 'of', 'and', 'at']
  }

  handleDirectoryPathChange =(v) => {
    this.setState({directoryPath: v});
  }

  handleWordsFilePathChange = (v) => {
    this.setState({wordsFilePath: v});
  }

  handleDropdownSelectOption = (v) => {
    console.log(v)
    this.setState({wordToSearch: v});
  }

  render() {
    return (
      <div className="formContainer">
        <TextField
          required
          id="directoryPathInput"
          label="Directory Path"
          variant="outlined"
          onChange={e => this.handleDirectoryPathChange(e.target.value)}
        />
        <TextField
          required
          id="wordsFilePathInput"
          label="Words File Path"
          variant="outlined"
          onChange={e => this.handleWordsFilePathChange(e.target.value)}
        />
        <div>
          <InputLabel id="wordToSearchDropdown">Word To Search</InputLabel>
          <Select
            labelId="wordToSearchDropdown"
            id="wordToSearchDropdown"
            value={this.state.wordToSearch}
            onChange={e => this.handleDropdownSelectOption(e.target.value)}
          >
            {this.state.words.map((word, i) => <MenuItem key={i} value={word}>{word}</MenuItem>)}
          </Select>
        </div>
        <Button variant="contained" color="primary" onClick={() => this.props.searchWords(this.state)}>
           Search
        </Button>
      </div>
    )
  }
}

export default FormBar;