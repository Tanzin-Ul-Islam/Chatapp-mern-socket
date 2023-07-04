import React, { useEffect } from 'react'
import Sidebar from '../../components/Sidebar'
import Chat from '../../components/Chat'
import axios from '../../config/axios.config';
import api from '../../config/api.json';
export default function Home() {
  async function test() {
    await axios.get(api.auth.test).then(response => {
      console.log(response)
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
