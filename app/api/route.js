import { gql } from 'graphql-request';

export async function getNames() {
  const query = gql`
  query Usernames {
    usernames(where: {name_contains: "Ryan"}) {
      id
      name
      points
    }
  }
  `;

  const data = await request(query);
  return data.usernames;
}