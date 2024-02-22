'use server'

import { GraphQLClient } from "graphql-request";
import { useState } from "react";

const [readName, setReadName] = useState('');

async function getNames(name: string) {
  const endpoint = process.env.GRAPHQL_PUBLIC_ENDPOINT;
  const graphQLClient = new GraphQLClient(endpoint || '');
  
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

export default async function CreateForm(){
    <form className="flex flex-col items-center justify-center" onSubmit={(event) => {
        event.preventDefault()
        const names = getNames(readName) // pass in form data as parameter
        names.then((data: any) => {
          //setUsernames(data);
          setReadName('');
        });
      }}>
      <label htmlFor="read" className="flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-center lg:text-4xl">Read</span>
        <input type="text" name="readName" id="readName" placeholder="Read Name goes here" className="w-96 h-12 p-4 mt-4 border border-gray-300 rounded-lg dark:border-gray-700 text-slate-700" value={readName} onChange={e => setReadName(e.target.value)}/>
        <span className="w-96 h-12 p-4 mt-4"></span>
        <button type="submit" className="w-96 h-12 mt-4 bg-blue-500 rounded-lg text-white">Read</button>
      </label>
    </form>
}