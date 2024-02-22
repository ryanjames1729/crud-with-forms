'use client'
import React, { Suspense, useState } from 'react';

import { getNames } from '../actions';

export default function CreateForm () {
    
    const [readName, setReadName] = useState('');
    const [usernames, setUsernames] = useState([]);

    return (
      <>
        <form className="flex flex-col items-center justify-center" 
        onSubmit={async (event) => {
            event.preventDefault()
            const names = getNames(readName) // pass in form data as parameter
            // names.then((data: any) => {
            //   setUsernames(data);
            //   setReadName('');
            // });
            setUsernames(await names);
          }}
          >
          <label htmlFor="read" className="flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-center lg:text-4xl">Read</span>
            <input type="text" name="readName" id="readName" placeholder="Read Name goes here" className="w-96 h-12 p-4 mt-4 border border-gray-300 rounded-lg dark:border-gray-700 text-slate-700" value={readName} onChange={e => setReadName(e.target.value)}/>
            <span className="w-96 h-12 p-4 mt-4"></span>
            <button type="submit" className="w-96 h-12 mt-4 bg-blue-500 rounded-lg text-white">Read</button>
          </label>
        </form>
        <Suspense fallback={<div>Loading...</div>}>
          <div>
          <div className="flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-center lg:text-4xl">Usernames</span>
            {usernames.map((user: any) => {
            return (
            <div key={user.id} className="mt-2 p-2 min-w-full border-solid rounded-md border-white border-2 flex flex-col items-center justify-center">
              <p>{user.name}</p>
              <p>{user.points}</p>
            </div>
            )})}
            </div>
          </div>
        </Suspense>
        </>
    )
}