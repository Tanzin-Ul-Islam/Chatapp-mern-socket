import React, { useEffect } from 'react'
import Sidebar from '../../components/Sidebar'
import Chat from '../../components/Chat'
import axios from '../../config/axios.config';
import api from '../../config/api.json';
export default function Home() {
  async function test() {
    await axios.get(api.auth.test, { withCredentials: true }).then(response => {
      console.log(response)
    }).catch(error=>{
      console.log(error);
    })
  }
  useEffect(() => {
    test()
  }, [])
  return (
    <div className='flex h-screen'>
      <Sidebar />
      <Chat />
    </div>
  )
}
