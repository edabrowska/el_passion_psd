import { Component } from 'react'
import fetch from 'isomorphic-fetch'

export default class AboutPage extends Component {
  static async getInitialProps (context) {
    // context.store.dispatch(<some redux action>)
    const repos = await fetch('https://api.github.com/users/daftcode/repos')
      .then(response => response.json())
    return { repos }
  }

  render () {
    const { repos } = this.props
    return (
      <div>
        <p>@daftcode's repos:</p>
        <ul>
          {repos.map((repo) => (
            <li key={repo.id}>
              <a href={repo.html_url}>{repo.name}</a>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
