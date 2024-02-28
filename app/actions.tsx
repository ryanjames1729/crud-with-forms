'use server';

import { GraphQLClient } from "graphql-request";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export async function getNames(name: string) {
  //const endpoint = 'https://api-us-east-1-shared-usea1-02.hygraph.com/v2/clsnkcosn0v9001w60dp36wv4/master';
  const endpoint = process.env.GRAPHQL_PUBLIC_ENDPOINT ? process.env.GRAPHQL_PUBLIC_ENDPOINT : '';
  const graphQLClient = new GraphQLClient(endpoint);
  
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
  const endpoint = 'https://api-us-east-1-shared-usea1-02.hygraph.com/v2/clsnkcosn0v9001w60dp36wv4/master'
  const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MDgwMjI0MTYsImF1ZCI6WyJodHRwczovL2FwaS11cy1lYXN0LTEtc2hhcmVkLXVzZWExLTAyLmh5Z3JhcGguY29tL3YyL2Nsc25rY29zbjB2OTAwMXc2MGRwMzZ3djQvbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQtdXMtZWFzdC0xLXNoYXJlZC11c2VhMS0wMi5oeWdyYXBoLmNvbS8iLCJzdWIiOiJiZjQ0M2NhOS05MTM4LTRiMmItODcwMS00ZWZhOTM4NWFkOTAiLCJqdGkiOiJjbHNua2czaXMwZjU1MDFsZ2I1a3RmM3RqIn0.c6DXdKUG_B2dgWzsEkvB7pnF9tuohli0RILi6sZ41_Zhwbe-JGMDTvx4L7OvW5vj_4Xvm8ZjGkPKEX9k0gioIORiKkZgpgK-OdAERpbWs8xvJhmZ60gKWh9ZqpeE2rNp3wmgqazselHMUyQ9mi8ZsaflGYCN-0uAnIicpsYO7BaaGPkMODbEi0V7j4W0KacrdMWblamNnf_cNiQDHhcqV-cdlbbnjoPKCcTYPtUz3m-G31617J8U0gCDpRV5IsTky_LZgXdN66PUvy6XH2BuT2XGur9fACVPSLrJGV3xJ53GeW0a-OmRtOxo5BnC2Vlj3yltqilIPvsmGhjvfbyyybFRNA7Cgx9WYcCn_9QT7eE2NKqBytv36LCO9ExiNSBtPMWPT91XlfUz409PTgyXJu5I2jZXE0clOas9ztTn_40rLTX6tQKCnHGCoLKM-YTH8dJ63ti1xEFsPLdQLMRljhMO3hN8fV9WrKgTF494YTtF7BEz2JcutVy3hTYEAE5FKWITjyzNJ5c2aGypvF0oh4tVcQmIBw65jYwBXVWVmci4b1S1aQG3FCAO2cUhUHvzmkPQ6nreDVVlzXxo8hxe6TNoU1ZBnmdA5hoESf-UaxxeC4fcusDmJWNsk9nG_CDGneA2rtrirLZsrgX3LlMbDRJetPs-D__lyrwWbjuf_a8'


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
  revalidatePath('read')
  return {message: "Name created!"};
}

export async function mutateName(name: string, points: string) {
  const endpoint = 'https://api-us-east-1-shared-usea1-02.hygraph.com/v2/clsnkcosn0v9001w60dp36wv4/master'
  const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MDgwMjI0MTYsImF1ZCI6WyJodHRwczovL2FwaS11cy1lYXN0LTEtc2hhcmVkLXVzZWExLTAyLmh5Z3JhcGguY29tL3YyL2Nsc25rY29zbjB2OTAwMXc2MGRwMzZ3djQvbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQtdXMtZWFzdC0xLXNoYXJlZC11c2VhMS0wMi5oeWdyYXBoLmNvbS8iLCJzdWIiOiJiZjQ0M2NhOS05MTM4LTRiMmItODcwMS00ZWZhOTM4NWFkOTAiLCJqdGkiOiJjbHNua2czaXMwZjU1MDFsZ2I1a3RmM3RqIn0.c6DXdKUG_B2dgWzsEkvB7pnF9tuohli0RILi6sZ41_Zhwbe-JGMDTvx4L7OvW5vj_4Xvm8ZjGkPKEX9k0gioIORiKkZgpgK-OdAERpbWs8xvJhmZ60gKWh9ZqpeE2rNp3wmgqazselHMUyQ9mi8ZsaflGYCN-0uAnIicpsYO7BaaGPkMODbEi0V7j4W0KacrdMWblamNnf_cNiQDHhcqV-cdlbbnjoPKCcTYPtUz3m-G31617J8U0gCDpRV5IsTky_LZgXdN66PUvy6XH2BuT2XGur9fACVPSLrJGV3xJ53GeW0a-OmRtOxo5BnC2Vlj3yltqilIPvsmGhjvfbyyybFRNA7Cgx9WYcCn_9QT7eE2NKqBytv36LCO9ExiNSBtPMWPT91XlfUz409PTgyXJu5I2jZXE0clOas9ztTn_40rLTX6tQKCnHGCoLKM-YTH8dJ63ti1xEFsPLdQLMRljhMO3hN8fV9WrKgTF494YTtF7BEz2JcutVy3hTYEAE5FKWITjyzNJ5c2aGypvF0oh4tVcQmIBw65jYwBXVWVmci4b1S1aQG3FCAO2cUhUHvzmkPQ6nreDVVlzXxo8hxe6TNoU1ZBnmdA5hoESf-UaxxeC4fcusDmJWNsk9nG_CDGneA2rtrirLZsrgX3LlMbDRJetPs-D__lyrwWbjuf_a8'


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

  const endpoint = 'https://api-us-east-1-shared-usea1-02.hygraph.com/v2/clsnkcosn0v9001w60dp36wv4/master'
  const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MDgwMjI0MTYsImF1ZCI6WyJodHRwczovL2FwaS11cy1lYXN0LTEtc2hhcmVkLXVzZWExLTAyLmh5Z3JhcGguY29tL3YyL2Nsc25rY29zbjB2OTAwMXc2MGRwMzZ3djQvbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQtdXMtZWFzdC0xLXNoYXJlZC11c2VhMS0wMi5oeWdyYXBoLmNvbS8iLCJzdWIiOiJiZjQ0M2NhOS05MTM4LTRiMmItODcwMS00ZWZhOTM4NWFkOTAiLCJqdGkiOiJjbHNua2czaXMwZjU1MDFsZ2I1a3RmM3RqIn0.c6DXdKUG_B2dgWzsEkvB7pnF9tuohli0RILi6sZ41_Zhwbe-JGMDTvx4L7OvW5vj_4Xvm8ZjGkPKEX9k0gioIORiKkZgpgK-OdAERpbWs8xvJhmZ60gKWh9ZqpeE2rNp3wmgqazselHMUyQ9mi8ZsaflGYCN-0uAnIicpsYO7BaaGPkMODbEi0V7j4W0KacrdMWblamNnf_cNiQDHhcqV-cdlbbnjoPKCcTYPtUz3m-G31617J8U0gCDpRV5IsTky_LZgXdN66PUvy6XH2BuT2XGur9fACVPSLrJGV3xJ53GeW0a-OmRtOxo5BnC2Vlj3yltqilIPvsmGhjvfbyyybFRNA7Cgx9WYcCn_9QT7eE2NKqBytv36LCO9ExiNSBtPMWPT91XlfUz409PTgyXJu5I2jZXE0clOas9ztTn_40rLTX6tQKCnHGCoLKM-YTH8dJ63ti1xEFsPLdQLMRljhMO3hN8fV9WrKgTF494YTtF7BEz2JcutVy3hTYEAE5FKWITjyzNJ5c2aGypvF0oh4tVcQmIBw65jYwBXVWVmci4b1S1aQG3FCAO2cUhUHvzmkPQ6nreDVVlzXxo8hxe6TNoU1ZBnmdA5hoESf-UaxxeC4fcusDmJWNsk9nG_CDGneA2rtrirLZsrgX3LlMbDRJetPs-D__lyrwWbjuf_a8'

  
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