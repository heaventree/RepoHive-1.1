const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

export async function fetchGitHubRepo(url: string) {
  const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) throw new Error("Invalid GitHub URL");
  
  const [, owner, name] = match;
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
  };
  
  if (GITHUB_TOKEN) {
    headers.Authorization = `token ${GITHUB_TOKEN}`;
  }

  const repoRes = await fetch(`https://api.github.com/repos/${owner}/${name}`, { headers });
  if (!repoRes.ok) throw new Error(`GitHub API error: ${repoRes.statusText}`);
  const repo = await repoRes.json();

  // Fetch README
  let readme = "";
  try {
    const readmeRes = await fetch(`https://api.github.com/repos/${owner}/${name}/readme`, { headers });
    if (readmeRes.ok) {
      const readmeData = await readmeRes.json();
      readme = atob(readmeData.content);
    }
  } catch (e) {
    console.warn("Could not fetch README");
  }

  return {
    owner: repo.owner.login,
    name: repo.name,
    url: repo.html_url,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    issues: repo.open_issues_count,
    language: repo.language || "Unknown",
    license: repo.license?.spdx_id || "Unknown",
    last_push: repo.pushed_at,
    description: repo.description || "",
    readme
  };
}

export function calculateScore(repo: any, weights: any) {
  // Simple heuristic scoring
  const starScore = Math.min(repo.stars / 1000, 25);
  const forkScore = Math.min(repo.forks / 500, 25);
  const issueScore = Math.max(20 - (repo.issues / 100), 0);
  
  const total = (starScore * (weights.popularity / 25)) + 
                (forkScore * (weights.activity / 25)) + 
                (issueScore * (weights.maintenance / 20));
                
  return Math.round(Math.min(total * 4, 100)); // Scale to 100
}
