import fetch from 'isomorphic-unfetch'

const aboutPage = ({repos}) =>
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

aboutPage.getInitialProps = async function () {
  const res = await fetch('https://api.github.com/users/daftcode/repos')
  const data = await res.json()

  return {
    repos: data
  }
}

export default aboutPage
