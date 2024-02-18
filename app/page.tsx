'use client'

import Image from "next/image";
import Footer from "./components/Footer";
import { useState } from "react";
//import { getNames } from "./api/route";
import { GraphQLClient } from 'graphql-request';
import { getNames } from "./components/Results";


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

  //const usernames = getNames()
  const [usernames, setUsernames] = useState([])
  const [readName, setReadName] = useState('')

  const [createName, setCreateName] = useState('')
  const [createScore, setCreateScore] = useState('')


  return (
    <>
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex flex-col">
        <h1 className="text-4xl font-bold text-center lg:text-6xl">
          Welcome to the CRUD App
        </h1>
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et luctus mi mauris vel elit. Donec ac metus nec justo ultricies congue. Donec mi orci, sollicitudin in lacinia ut, tincidunt sed enim. Sed et felis ut nunc porttitor mattis. Sed eu turpis libero. Nunc ultrices.
        </p>
        
        <div className="flex flex-row items-center justify-center">

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
          }}/>
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Read</span>
        </label>
        </div>

        { create && (
          <form className="flex flex-col items-center justify-center" onSubmit={ (event) => {
            event.preventDefault()
            console.log(createName, createScore)
          //   const names = getNames(createName) 
          //   names.then((data: any) => {
          //     setUsernames(data);
          //     setCreateName('');
          //     setCreateScore('');
          // })
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
          <form className="flex flex-col items-center justify-center">
            <label htmlFor="create" className="flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-center lg:text-4xl">Update</span>
              <input type="text" name="updateName" id="updateName" placeholder="Update Name goes here" className="w-96 h-12 p-4 mt-4 border border-gray-300 rounded-lg dark:border-gray-700 text-slate-700"/>
              <input type="text" name="updateScore" id="updateScore" placeholder="Update Score goes here" className="w-96 h-12 p-4 mt-4 border border-gray-300 rounded-lg dark:border-gray-700 text-slate-700"/>
              <button type="submit" className="w-96 h-12 mt-4 bg-blue-500 rounded-lg text-white">Update</button>
            </label>
          </form>
        )}

        { del && (
          <form className="flex flex-col items-center justify-center">
            <label htmlFor="create" className="flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-center lg:text-4xl">Delete</span>
              <input type="text" name="deleteName" id="deleteName" placeholder="Delete Name goes here" className="w-96 h-12 p-4 mt-4 border border-gray-300 rounded-lg dark:border-gray-700"/>
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
            <label htmlFor="create" className="flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-center lg:text-4xl">Read</span>
              <input type="text" name="readName" id="readName" placeholder="Read Name goes here" className="w-96 h-12 p-4 mt-4 border border-gray-300 rounded-lg dark:border-gray-700 text-slate-700" value={readName} onChange={e => setReadName(e.target.value)}/>
              <span className="w-96 h-12 p-4 mt-4"></span>
              <button type="submit" className="w-96 h-12 mt-4 bg-blue-500 rounded-lg text-white">Read</button>
            </label>
          </form>
        )}

            
        {usernames.map((user: any) => {
          return (
            <div key={user.id} className="flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-center lg:text-4xl">Usernames</span>
              <p>{user.name}</p>
              <p>{user.points}</p>
            </div>
          )
        })}
        
        
        


        
      </div>
    </main>
    <Footer />
    </>
  );
}
