import fetch from 'isomorphic-unfetch'

import withLayout from '~/hoc/withLayout'

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

const aboutPageWithLayout = withLayout(aboutPage)

aboutPageWithLayout.getInitialProps = async function () {
  const res = await fetch('https://api.github.com/users/daftcode/repos')
  const data = await res.json()

  return {
    repos: data
  }
}

export default aboutPageWithLayout
