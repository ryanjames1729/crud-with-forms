'use client'

import Footer from "./components/Footer";
import { useState } from "react";
import { getNames, postName, mutateName, deleteName } from "./components/Results";


export default function Home() {

  // useState destructuring: [state, setState] = useState(initialState)
  // explain the useState hook
  // useState is a Hook that lets you add React state to function components.
  // It returns a pair of values: the current state and a function that updates it.
  // This is why we write const [count, setCount] = useState(). This is similar to this.state.count and this.setState in a class, except you get them in a pair.
  const [create, setCreate] = useState(false);
  const [update, setUpdate] = useState(false);
  const [del, setDelete] = useState(false);  // use del instead of delete
  const [read, setRead] = useState(true);

  // these variables are used to store the form data from the user and then send to the API.
  const [usernames, setUsernames] = useState([])
  const [postUpdate, setPostUpdate] = useState('')
  const [readName, setReadName] = useState('')

  const [createName, setCreateName] = useState('')
  const [createScore, setCreateScore] = useState('')

  const [updateName, setUpdateName] = useState('')
  const [updateScore, setUpdateScore] = useState('')

  const [delName, setDelName] = useState('')
  // end of variables used for taking form data from the user

  


  return (
    <>
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex flex-col">
        <h1 className="text-4xl font-bold text-center lg:text-6xl">
          Welcome to the CRUD App
        </h1>
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
         As a CS teacher, one of my achievements is to teach students how to manage data correctly using Create, Read, Update, and Delete (CRUD) operations. This app is a simple demonstration of how to use CRUD operations in a web application.
         But, for me as a web developer, these are operations that I set up at the beginning of a project and don't think about again until I need to add a new feature.
         So, I decided I need to create this sandbox app to play around with these operations so that I can get better at building them in the NextJS 14 App Router wtih GraphQl Queries and Mutations.
        </p>
        
        <div className="flex flex-row items-center justify-center mt-2">

        <label className="inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" id="create" name="create" value="create" checked={create} onChange={() => {
            setCreate(!create)
            setUpdate(false)
            setDelete(false)
            setRead(false)
            create ? setRead(true) : setRead(false)
            setUsernames([])
          }}/>
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Create | </span>
        </label>

        <label className="inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" id="create" name="create" value="create" checked={update} onChange={() => {
            setCreate(false)
            setUpdate(!update)
            setDelete(false)
            setRead(false)
            update ? setRead(true) : setRead(false)
            setUsernames([])
          }}/>
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Update | </span>
        </label>

        <label className="inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" id="create" name="create" value="create" checked={del} onChange={() => {
            setCreate(false)
            setUpdate(false)
            setDelete(!del)
            setRead(false)
            del ? setRead(true) : setRead(false)
            setUsernames([])
          }}/>
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Delete | </span>
        </label>

        <label className="inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" id="create" name="create" value="create" checked={read} onChange={() => {
            setCreate(false)
            setUpdate(false)
            setDelete(false)
            setRead(true)
            setPostUpdate('')
          }}/>
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Read</span>
        </label>
        </div>

        { create && (
          <form className="flex flex-col items-center justify-center" onSubmit={ (event) => {
            event.preventDefault()
            console.log(createName, createScore)
            const names = postName(createName, createScore) 
            names.then((data: any) => {
              console.log(data)
              setPostUpdate('Your post has been sent!');
              setCreateName('');
              setCreateScore('');
          })
        }
          }>
            <label htmlFor="create" className="flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-center lg:text-4xl">Create</span>
              <input type="text" name="createName" id="createName" placeholder="Create Name goes here" className="w-96 h-12 p-4 mt-4 border border-gray-300 rounded-lg dark:border-gray-700 text-slate-700" value={createName} onChange={e => {setCreateName(e.target.value)}}/>
              <input type="text" name="createScore" id="createScore" placeholder="Create Score goes here" className="w-96 h-12 p-4 mt-4 border border-gray-300 rounded-lg dark:border-gray-700 text-slate-700" value={createScore} onChange={e => {setCreateScore(e.target.value)}}/>
              <button type="submit" className="w-96 h-12 mt-4 bg-blue-500 rounded-lg text-white">Create</button>
            </label>
          </form>
        )}

        { update && (
          <form className="flex flex-col items-center justify-center" onSubmit={ (event) => {
            event.preventDefault()
            console.log(updateName, updateScore)
            const names = mutateName(updateName, updateScore)
            names.then((data: any) => {
              console.log(data)
              setPostUpdate('Your update has been sent!');
              setUpdateName('');
              setUpdateScore('');
          })}}>
            <label htmlFor="update" className="flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-center lg:text-4xl">Update</span>
              <input type="text" name="updateName" id="updateName" placeholder="Update Name goes here" className="w-96 h-12 p-4 mt-4 border border-gray-300 rounded-lg dark:border-gray-700 text-slate-700" value={updateName} onChange={e => {setUpdateName(e.target.value)}}/>
              <input type="text" name="updateScore" id="updateScore" placeholder="Update Score goes here" className="w-96 h-12 p-4 mt-4 border border-gray-300 rounded-lg dark:border-gray-700 text-slate-700" value={updateScore} onChange={e => {setUpdateScore(e.target.value)}}/>
              <button type="submit" className="w-96 h-12 mt-4 bg-blue-500 rounded-lg text-white">Update</button>
            </label>
          </form>
        )}

        { del && (
          <form className="flex flex-col items-center justify-center" onSubmit={(event) => {
            event.preventDefault()
            console.log(delName)
            const names = deleteName(delName)
            names.then((data: any) => {
              console.log('data', data)
              setPostUpdate('Your delete has been sent!');
              setDelName('');
          })
          }}>
            <label htmlFor="delete" className="flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-center lg:text-4xl">Delete</span>
              <input type="text" name="deleteName" id="deleteName" placeholder="Delete Name goes here" className="text-slate-700 w-96 h-12 p-4 mt-4 border border-gray-300 rounded-lg dark:border-gray-700" value={delName} onChange={e => {setDelName(e.target.value)}}/>
              <span className="w-96 h-12 p-4 mt-4"></span>
              <button type="submit" className="w-96 h-12 mt-4 bg-blue-500 rounded-lg text-white">Delete</button>
            </label>
          </form>
        )}

        { read && (
            <form className="flex flex-col items-center justify-center" onSubmit={(event) => {
              event.preventDefault()
              const names = getNames(readName) // pass in form data as parameter
              names.then((data: any) => {
                setUsernames(data);
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
        )}

        {/* Messaging for user will be displayed using the state variables postUpdate and usernames. */}
        {usernames && usernames.length > 0 ? 
          <div className="flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-center lg:text-4xl">Usernames</span>
            {usernames.map((user: any) => {
            return (
            <div key={user.id} className="mt-2 p-2 min-w-full border-solid rounded-md border-white border-2 flex flex-col items-center justify-center">
              <p>{user.name}</p>
              <p>{user.points}</p>
            </div>
            )})}
            </div> : void 0
        }      

        {postUpdate && postUpdate.length > 0 ? <p>{postUpdate}</p> : null}
        
        
        


        
      </div>
    </main>
    <Footer />
    </>
  );
}
