import React, { useContext, useEffect } from 'react'
import { DataContext } from '../../ContextProvider';

export default function Sidebar({ userList, activeUserList }) {
  const { userId } = useContext(DataContext)
  function checkStatus(id) {
    const isActive = activeUserList.some(el => (el.id == id));
    return isActive ? "Online" : "Offline";
  }

  return (
    <div className='bg-blue-300 w-1/3'>
      {
        userList.map(el => {
          if (userId !== el._id) {
            return (
              <>
                <p>{el?.userName}</p>
                <p>{checkStatus(el._id)}</p>
                <hr />
              </>
            )
          }
        })
      }
    </div>
  )
}
