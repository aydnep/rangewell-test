import React from 'react'
import PropTypes from 'prop-types'

class Idea extends React.PureComponent {
  static propTypes = {
    idea: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
  }

  state = {
    idea: this.props.idea,
    edit: {
      title: !this.props.idea.title && !this.props.idea.body,
      body: false
    }
  }

  componentDidMount() {
    const { idea } = this.state
    if (!idea.title && !idea.body) {
      this.title.focus()
    }
  }

  handleEdit = (e) => {
    const idea = { ...this.state.idea }
    idea[e.target.name] = e.target.value
    this.setState({ idea })
  }

  handleDelete = () => {
    this.props.onDelete(this.state.idea.id)
  }

  handleBlur = (e) => {
    if (e.target.value) {
      this.props.onChange(this.state.idea)
      this.setState({ edit: { title: false, body: false } })
    }
  }

  handleTitleClick = () => {
    const edit = { ...this.state.edit }
    if (!edit.title) {
      this.setState({ edit: { title: true, body: false } })
    }
  }

  handleBodyClick = () => {
    const edit = { ...this.state.edit }
    if (!edit.title) {
      this.setState({ edit: { title: false, body: true } })
    }
  }

  refTitle = (e) => {
    this.title = e
  }

  render() {
    const { idea, edit } = this.state

    return (
      <section className="Idea">
        <header>
          <input
            name="title"
            readOnly={!edit.title}
            value={idea.title || ''}
            onChange={this.handleEdit}
            onBlur={this.handleBlur}
            ref={this.refTitle}
            onClick={this.handleTitleClick}
          />
        </header>
        <main>
          <textarea
            name="body"
            readOnly={!edit.body}
            value={idea.body || ''}
            onChange={this.handleEdit}
            onBlur={this.handleBlur}
            onClick={this.handleBodyClick}
          />
        </main>
        <footer>
          <button onClick={this.handleDelete}>
            <svg width="14px" height="18px" viewBox="0 0 14 18" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="Desktop-HD" transform="translate(-600.000000, -646.000000)" fill="#D00303">
                  <g id="Card-2" transform="translate(570.000000, 261.000000)">
                    <g id="Delete" transform="translate(0.000000, 364.000000)">
                      <path d="M42.999,25 L30.999,25 L30.999,37 C30.999,38.104 31.895,39 33,39 L40.999,39 C42.105,39 42.999,38.104 42.999,37 L42.999,25 M39.499,20.999 L34.499,20.999 L33.5,22 L30.999,22 C30.448,22 30,22.448 30,22.999 L30,24 L44,24 L44,22.999 C44,22.448 43.552,22 42.999,22 L40.5,22 L39.499,20.999" id="Trash-Icon-"></path>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
            Delete
          </button>
        </footer>
      </section>
    )
  }
}

export default Idea
