'use server';

import { GraphQLClient } from "graphql-request";

export async function getNames(name: string) {
  const endpoint = "https://api-us-east-1-shared-usea1-02.hygraph.com/v2/clsnkcosn0v9001w60dp36wv4/master";
  //const endpoint = process.env.GRAPHQL_PUBLIC_ENDPOINT;
  const graphQLClient = new GraphQLClient(endpoint);
  
  const searchname = name ? name : "";
  console.log("name", searchname)
 
  const { usernames }: any = await graphQLClient.request(`
  query Usernames($searchname: String!) {
    usernames(where: {name_contains: $searchname}) {
      id
      name
      points
    }
  }
  `, { searchname }); // variables must be part of the request arguments!
  console.log(usernames);
  return usernames;
}
