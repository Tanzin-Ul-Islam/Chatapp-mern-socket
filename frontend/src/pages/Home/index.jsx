import React, { useContext, useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import Chat from '../../components/Chat'
import axios from '../../config/axios.config';
import api from '../../config/api.json';
import { DataContext } from '../../ContextProvider';
import Landing from '../../components/Landing'
export default function Home() {
  const { chattingWith, setMessageList } = useContext(DataContext);
  const [ws, setWs] = useState(null);
  const [userList, setUserList] = useState([]);
  const [activeUserList, setActiveUserList] = useState([]);

  async function getAllUser() {
    try {
      await axios.get(api.user.getAllUserUrl).then(response => {
        const data = response.data.users;
        setUserList(data);
      }).catch(error => {
        console.log(error);
      })
    } catch (error) {
      console.log(error);
    }
  }

  function getUniqueListBy(list) {
    const newArr = [...new Map(list.map(item => [item['id'], item])).values()];
    return newArr;
  }

  function handleMessage(e) {
    const parsedJson = JSON.parse(e.data);
    if ('online' in parsedJson) {
      const activeUserList = parsedJson.online[0];
      const uniqueActiveUserList = getUniqueListBy(activeUserList)
      setActiveUserList(uniqueActiveUserList);
    } else {
      setMessageList(prevState => ([...prevState, { text: parsedJson.message, isOur: false }]))
    }
  }

  useEffect(() => {
    getAllUser();
    const ws = new WebSocket('ws://localhost:5001');
    setWs(ws);
    ws.addEventListener('message', handleMessage);
  }, []);

  return (
    <div className='flex h-screen'>
      <Sidebar userList={userList} activeUserList={activeUserList} />
      {
        chattingWith?._id ? <Chat ws={ws} /> : <Landing />
      }

    </div>
  )
}
