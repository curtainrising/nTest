// payloads

export const verifyTokenPayload = () => `
  login
`

export const userPayload = () => `
  email
  id
  isViewer
  login
`

export const organizationPayload = () => `
  nodes {
    ... on Repository {
      id
      name
      createdAt
      databaseId
      forkCount
      diskUsage
      updatedAt
      ref(qualifiedName: "master") {
        target {
          ... on Commit {
            id
            history(first: 10) {
              nodes {
                abbreviatedOid
                author {
                  name
                }
                commitUrl
                committedDate
                message
              }
              totalCount
            }
          }
        }
      }
    }
  }
`

// functions - query
export const searchFunc = ({organization}) => `
  search (
    query: "org:${organization}",
    type: REPOSITORY,
    first: 100
  )
`

export const verifyTokenFunc = () => `
  viewer
`

export const getUserFunc = ({login}) => `
  user(login: "${login}")
`

// query
export const query = (func, payload) => `
{
  ${func}
  {
    ${payload}
  }
}
`
