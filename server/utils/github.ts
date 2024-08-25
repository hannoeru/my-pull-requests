import { Octokit } from 'octokit'

let _octokit: Octokit

export function useOctokit() {
  if (!_octokit) {
    _octokit = new Octokit({
      auth: process.env.NUXT_GITHUB_TOKEN,
    })
  }
  return _octokit
}

export const fetchRepo = async (owner: string, name: string) => {
  // Fetch repository details to get owner type
  console.log(`Fetching repository details for ${owner}/${name}`)
  const { data } = await useOctokit().request('GET /repos/{owner}/{name}', {
    owner,
    name,
  })

  return data
}
