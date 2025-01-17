import React from 'react'

class Projects extends React.Component {
  state = {
    characters: [

    ]
  }
  removeCharacter = (index) => {
    const { characters } = this.state

    this.setState({
      characters: characters.filter((character, i) => {
        return i !== index
      }),
    })
  }
  handleSubmit = (character) => {
    this.setState({ characters: [...this.state.characters, character] })
  }
  render() {
    return (
      <div class="all">
        <div class="lefter">
          <div class="text">Hosting</div>
        </div>
        <div class="left">
          <div class="text">Web Design</div>
        </div>
        <div class="center">
          <div class="explainer"><span>Hover me</span></div>
          <div class="text">Frontend Development</div>
        </div>
        <div class="right">
          <div class="text">Backend Development</div>
        </div>
        <div class="righter">
          <div class="text">SEO</div>
        </div>
      </div>
    )
  }
}

export default Projects