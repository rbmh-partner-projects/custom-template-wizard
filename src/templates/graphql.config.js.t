module.exports = {
  name: "Content and Data Services GraphQL API Schema",
  schemaPath: "./schema.graphql",
  extensions: {
    endpoints: {
      "GraphQL Production Endpoint": {
        url: "https://api.redbull.com/v1/graphql",
        headers: {
          "user-agent": "JS GraphQL",
          "API-Key": "{{=it.crepoAPIKeyProd}}"
        },
        introspect: true
      }
    }
  }
}
