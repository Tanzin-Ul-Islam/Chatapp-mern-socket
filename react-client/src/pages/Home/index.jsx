import React, { useContext, useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import Chat from '../../components/Chat'
import axios from '../../config/axios.config';
import api from '../../config/api.json';
import { DataContext } from '../../ContextProvider';
import Landing from '../../components/Landing';
import { useNavigate } from 'react-router-dom';
export default function Home() {
  const { chattingWith, setMessageList, setToken, setName, setUserId } = useContext(DataContext);
  const [ws, setWs] = useState(null);
  const [userList, setUserList] = useState([]);
  const [activeUserList, setActiveUserList] = useState([]);
  const navigate = useNavigate();
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
      console.log('message', parsedJson);
      setMessageList(prevState => ([...prevState, { ...parsedJson.message }]))
    }
  }

  async function logout() {
    await axios.post('/auth/logout').then(response => {
      setWs(null)
      setToken(null);
      setName(null);
      setUserId(null);
      navigate('/sign-in');
      localStorage.clear();
    })
  }

  useEffect(() => {
    getAllUser();
    const ws = new WebSocket('ws://localhost:5001');
    setWs(ws);
    ws.addEventListener('message', handleMessage);
  }, []);

  return (
    <div className='flex h-screen'>
      <Sidebar userList={userList} activeUserList={activeUserList} logout={logout} />
      {
        chattingWith?._id ? <Chat ws={ws} /> : <Landing />
      }

    </div>
  )
}


