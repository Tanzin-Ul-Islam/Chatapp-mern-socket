import React, { useEffect } from 'react';

export default function Chat() {
    useEffect(() => {
        new WebSocket('ws://localhost:5001')
    }, []);
    return (
        <div className='flex flex-col bg-blue-200 w-2/3 p-2'>
            <div className='flex-grow'>Chatting with</div>
            <form action="">
                <div className='flex gap-2'>
                    <input type="text" placeholder='Type message here...' className='bg-white outline-blue-300 border p-2 flex-grow rounded-sm' />

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