import type { H3Event } from 'h3'
import { Octokit } from 'octokit'

let _octokit: Octokit

export function useOctokit() {
  if (!_octokit) {
    const config = useRuntimeConfig()
    _octokit = new Octokit({
      auth: config.githubToken,
    })
  }
  return _octokit
}

// Read more about caching functions https://hub.nuxt.com/docs/features/cache#server-functions-caching
export const fetchRepo = defineCachedFunction(async (owner: string, name: string) => {
  // Fetch repository details to get owner type
  console.log(`Fetching repository details for ${owner}/${name}`)
  const { data } = await useOctokit().request('GET /repos/{owner}/{name}', {
    owner,
    name,
  })

  return data
}, {
  maxAge: 60 * 60, // 1 hour
  swr: true,
  group: 'functions',
  name: 'getRepoDetails',
  getKey: (_event: H3Event, owner: string, repo: string) => `${owner}/${repo}`,
})
