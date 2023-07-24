import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../ContextProvider';
export default function Chat({ ws }) {
    const { userId, chattingWith, messageList, setMessageList, } = useContext(DataContext)

    const [message, setMessage] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        try {
            ws.send(JSON.stringify({
                message: {
                    recipient: chattingWith._id,
                    text: message,
                }
            }));
            setMessageList(prevState => ([...prevState, { message: message, receiver: chattingWith._id, sender: userId, }]))
            setMessage("");
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='flex flex-col bg-blue-200 w-2/3 p-2'>
            <div className='flex-grow'>
                <h3 style={{ fontWeight: '600', paddingBottom: '10px' }}>Chatting with  {chattingWith?.userName}</h3>
                <div className={'overflow-y-scroll'}>
                    {
                        messageList.map((el, index) => {
                            return (
                                <div className={(el?.sender === userId ? 'text-right' : 'text-left')}>
                                    <div key={el + index} className={'text-left inline-block p-5 m-2 rounded-md text-sm ' + (el?.sender === userId ? 'bg-blue-400' : 'bg-white text-gray-500')}>
                                        {el?.message}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className='flex gap-2'>
                    <input type="text" placeholder='Type message here...' className='bg-white outline-blue-300 border p-2 flex-grow rounded-sm' value={message} onChange={(e) => { setMessage(e.target.value) }} />
                    <button type='submit' className='bg-blue-500 p-2 text-white rounded-sm'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                        </svg>
                    </button>
                </div>
            </form>
        </div>
    )
}
