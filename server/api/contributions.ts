import type { Contributions, PullRequest, User } from '~~/types/index'

export default defineCachedEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const octokit = useOctokit(event)
  // Fetch user from token
  const userResponse = await octokit.request('GET /user')
  const user: User = {
    name: userResponse.data.name ?? userResponse.data.login,
    username: userResponse.data.login,
    avatar: userResponse.data.avatar_url,
  }
  const excludedOrgsQuery = config.githubExcludedOrgs.split(',').map(org => `-org:"${org}"`).join('+')
  // Fetch pull requests from user
  const { data } = await octokit.request('GET /search/issues', {
    q: `type:pr+author:"${user.username}"+-user:"${user.username}"+${excludedOrgsQuery}`,
    per_page: 100,
    page: 1,
  })

  // Filter out closed PRs that are not merged
  const filteredPrs = data.items.filter(pr => !(pr.state === 'closed' && !pr.pull_request?.merged_at))

  const prs: PullRequest[] = []
  // For each PR, fetch the repository details
  for (const pr of filteredPrs) {
    const [owner, name] = pr.repository_url.split('/').slice(-2)
    const repo = await fetchRepo(event, owner!, name!)

    prs.push({
      repo: `${owner}/${name}`,
      title: pr.title,
      url: pr.html_url,
      created_at: pr.created_at,
      state: pr.pull_request?.merged_at ? 'merged' : pr.state as 'open' | 'closed',
      number: pr.number,
      type: repo.owner.type, // Add type information (User or Organization)
      stars: repo.stargazers_count,
    })
  }

  return {
    user,
    prs,
  } as Contributions
}, {
  group: 'api',
  name: 'contributions',
  getKey: () => 'all',
  swr: true,
  maxAge: 60 * 10, // 10 minutes
})
