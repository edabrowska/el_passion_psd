import fetch from 'unfetch'

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

/**
 * `getInitialProps` would interfere with `withRedux` if `withLayout` was used for this page.
 * If fetching data in `getInitialProps` *and* redux are needed, they need to be combined
 * in and async action - use redux-thunk or redux-saga for that.
 */

aboutPage.getInitialProps = async function () {
  const res = await fetch('https://api.github.com/users/daftcode/repos')
  const data = await res.json()

  return {
    repos: data
  }
}

export default aboutPage
