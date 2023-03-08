import { defer } from "@defer/client";
import { graphql } from "@octokit/graphql";

interface GitHubUserInfo {
  user: {
    login: string;
    location: string;
    reposLangs: {
      nodes: {
        name: string;
        languages: {
          edges: {
            size: number;
            node: {
              color: string;
              name: string;
            };
          }[];
        };
      }[];
    };
    reposStars: {
      totalCount: number;
      nodes: {
        name: string;
        stargazers: {
          totalCount: number;
        };
      }[];
    };
  };
}

interface GithubInfo {
  location: string;
  stars: number;
  languages: {
    [k: string]: number;
  };
  username: string;
}

const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${process.env.GITHUB_PA_TOKEN}`,
  },
});

export async function getGithubInfo(
  githubUsername: string
): Promise<GithubInfo> {
  const result = await graphqlWithAuth<GitHubUserInfo>(
    `
      query userInfo($githubUsername: String!) {
        rateLimit {
          limit
          cost
          remaining
          resetAt
        }
        user(login: $githubUsername) {
          login
          location
          reposLangs: repositories(ownerAffiliations: OWNER, first: 10) {
            nodes {
              name
              languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
                edges {
                  size
                  node {
                    name
                  }
                }
              }
            }
          }
          reposStars: repositories(first: 10, ownerAffiliations: OWNER, orderBy: {direction: DESC, field: STARGAZERS}) {
            totalCount
            nodes {
              stargazers {
                totalCount
              }
            }
          }
        }
      }
    `,
    {
      githubUsername,
    }
  );
  return {
    location: result.user.location,
    stars: (result.user.reposStars.nodes || []).reduce((sum, node) => {
      return sum + node.stargazers.totalCount;
    }, 0),
    languages: (result.user.reposLangs.nodes || []).reduce(
      (acc, node) => {
        (node.languages.edges || []).forEach((lang) => {
          if (!acc[lang.node.name]) {
            acc[lang.node.name] = lang.size;
          } else {
            acc[lang.node.name] = lang.size + acc[lang.node.name];
          }
          acc.total = acc.total + lang.size;
        });
        return acc;
      },
      { total: 0 } as Record<string, number>
    ),
    username: result.user.login,
  };
}
