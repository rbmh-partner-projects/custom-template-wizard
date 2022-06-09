import {
  ApiKeyAuthenticationProvider,
  GraphQLApiService,
} from '@crepo/crepo-graphql-api-node-sdk-cjs'

const api = (apiKey: string): GraphQLApiService => {
  const endpoint =
    process.env.NODE_ENV === 'production'
      ? 'https://api.redbull.com'
      : 'https://api-staging.redbull.com'

  const authProvider = new ApiKeyAuthenticationProvider(apiKey)

  return new GraphQLApiService(endpoint, {
    authenticationProvider: authProvider,
  })
}

export default api
