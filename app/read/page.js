import { GraphQLClient } from 'graphql-request';

import AddForm from './add-form';

export default async function Page() {

    //const endpoint = process.env.GRAPHQL_PUBLIC_ENDPOINT;
    const endpoint = 'https://api-us-east-1-shared-usea1-02.hygraph.com/v2/clsnkcosn0v9001w60dp36wv4/master';
    const graphQLClient = new GraphQLClient(endpoint);
    
    // declare data as a type array of objects
    

    let { usernames } = await graphQLClient.request(`
    query Usernames ()   {
      usernames () {
        id
        name
        points
      }
    }
    `)
    console.log('usernames: ', usernames);
      return (
        <div>
            <h1>Data</h1>
            <AddForm />
            <ul>
                {usernames ? usernames.map((user) => (
                    <li key={user.id}>{user.name} - {user.points}</li>
                )) : null}
            </ul>    
        </div>
      )
    }
