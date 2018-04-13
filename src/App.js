import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Idea from './Idea'

class App extends Component {
  state = {
    ideas: [],
    idea: {}
  }
  componentWillMount() {
    fetch('http://localhost:4000/ideas')
      .then(res => res.json())
      .then(ideas => this.setState({ ideas: this.orderIdeas(ideas) }))
  }

  onChange = (idea) => {
    fetch('http://localhost:4000/idea/update', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(idea)
    })
      .then(res => res.json())
      .then((data) => {
        const ideas = [...this.state.ideas].map(item => item.id === data.id ? data : item)
        this.setState({ ideas })
      })
  }

  onDelete = (id) => {
    fetch('http://localhost:4000/idea/delete', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    })
      .then(res => res.json())
      .then((data) => {
        const ideas = [...this.state.ideas].filter(item => item.id !== data.id)
        this.setState({ ideas })
      })
  }

  onNewIdea = () => {
    fetch('http://localhost:4000/ideas/new')
      .then(res => res.json())
      .then((idea) => {
        const ideas = [...this.state.ideas].concat([idea])
        this.setState({ ideas: this.orderIdeas(ideas)  })
      })
  }

  orderIdeas = (ideas) => ideas.sort((a, b) => {
    if (a.created_date > b.created_date) {
      return 1
    } else if (a.created_date < b.created_date) {
      return -1
    }
    return 0
  })

  render() {
    const { ideas = [] } = this.state
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          <button onClick={this.onNewIdea}>New Idea</button>
        </p>
        <div className="Ideas">
          {ideas.map(idea => (
            <Idea key={idea.id} idea={idea} onChange={this.onChange} onDelete={this.onDelete} />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
