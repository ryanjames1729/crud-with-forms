'use server';

import { GraphQLClient } from "graphql-request";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export async function getNames(name: string) {
  const endpoint = process.env.GRAPHQL_PUBLIC_ENDPOINT;
  const graphQLClient = new GraphQLClient(endpoint || '');
  
  const searchname = name ? name : "";
  console.log("name", searchname)
  
  try{
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
  catch (e) {
    console.error(e);
    return [];
  }
}

export async function postName(
  prevState: {
    message: string;
  },
  formData: FormData,
) {
  const endpoint = process.env.GRAPHQL_PUBLIC_ENDPOINT;
  const token = process.env.GRAPHQL_TOKEN;

  const points = "0";
  const name = formData.get("createName") as string;

  const graphQLClient = new GraphQLClient(endpoint || "", {
    headers: {
      authorization: `Bearer ${token}`,
    }
  });
 
  const { createUsername }: any = await graphQLClient.request(`
  mutation CreateUsername($name: String!, $points: String!) {
    createUsername(data: {name: $name, points: $points}) {
      id
      name
      points
    }
  }
  `, { name, points }); // variables must be part of the request arguments!
  const id = createUsername.id;
  console.log("id: ", id);
  const { pubishUsername }: any = await graphQLClient.request(`
    mutation PublishUsername($id: ID!) {
        publishUsername(where: {id: $id}) {
        id
        name
        points
        }
    }
    `, { id }); // variables must be part of the request arguments!
  console.log(createUsername);
  revalidatePath('https://crud-with-forms.vercel.app/read')
  return {message: "Name created!"};
}

export async function mutateName(name: string, points: string) {
  const endpoint = process.env.GRAPHQL_PUBLIC_ENDPOINT;
  const token = process.env.GRAPHQL_TOKEN;

  const graphQLClient = new GraphQLClient(endpoint || '', {
    headers: {
      authorization: `Bearer ${token}`,
    }
  });

  const { usernames }: any = await graphQLClient.request(`
  query Usernames($name: String!) {
    usernames(where: {name_contains: $name}) {
      id
      name
      points
    }
  }
  `, { name }); // variables must be part of the request arguments!
  console.log('usernames: ', usernames);
  const id = usernames[0].id;
  console.log("id: ", id);
  const { updateUsername }: any = await graphQLClient.request(`
    mutation UpdateUsername($id: ID!, $points: String!) {
        updateUsername(where: {id: $id}, data: {points: $points}) {
        id
        name
        points
        }
    }
    `, { id, points }); // variables must be part of the request arguments!

    const { pubishUsername }: any = await graphQLClient.request(`
    mutation PublishUsername($id: ID!) {
        publishUsername(where: {id: $id}) {
        id
        name
        points
        }
    }
    `, { id }); // variables must be part of the request arguments!
  console.log(updateUsername);
  return updateUsername;
}


export async function deleteName(name: string) {

  const endpoint = process.env.GRAPHQL_PUBLIC_ENDPOINT;
  const token = process.env.GRAPHQL_TOKEN;
  
  const graphQLClient = new GraphQLClient(endpoint || '', {
    headers: {
      authorization: `Bearer ${token}`,
    }
  });

  const { usernames }: any = await graphQLClient.request(`
  query Usernames($name: String!) {
    usernames(where: {name_contains: $name}) {
      id
      name
      points
    }
  }
  `, { name }); // variables must be part of the request arguments!
  console.log('usernames: ', usernames);

  const id = usernames[0].id;
  console.log("id: ", id);

  const { updateUsername }: any = await graphQLClient.request(`
    mutation DeleteUsername($id: ID!) {
        deleteUsername(where: {id: $id}) {
        id
        name
        points
        }
    }
    `, { id }); // variables must be part of the request arguments!
  console.log(updateUsername);
  return updateUsername;
}