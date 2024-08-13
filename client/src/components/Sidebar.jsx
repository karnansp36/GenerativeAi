import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Context } from '../context/Context'

export default function Sidebar() {

    const {onSent,previousPrompt, setRecentPrompt , newChat} = useContext(Context);

    const loadprompt = async (prompt) =>{
        setRecentPrompt(prompt);
        await onSent(prompt)
    }

  return (
    <div>
      <div className='inline-flex clear-end flex-col justify-between items-center min-h-screen bg-slate-200 '>
            <div className='w-full mt-10 px-5 flex justify-evenly flex-col items-center'>
                <img className='w-10  block ml-3 cursor-pointer ' src={assets.menu_icon} alt="menu icon" />
                <div onClick={() =>{newChat()}} className='mt-9 mx-2 w-full inline-flex items-center gap-3 p-2 bg-slate-100 rounded-3xl'>
                    <img className='w-4 ' src={assets.plus_icon} alt="plus icon" />
                    <p className=' text-lg'>New Chat</p>
                </div>
                <div className='mt-8 flex w-full flex-col items-center '>
                    <p className='text-lg '>Recent</p>
                    {previousPrompt.map((item, index)=>{
                        return(
                            <div onClick={()=>loadprompt(item)} className='w-full inline-flex  mt-8 items-center'>
                                <img className='w-5' src={assets.message_icon} alt="" />
                                <p>{item.slice(0, 18)}...</p>
                            </div>

                        )

                    })}
                </div>
            </div>
            <div className='w-48 h-48 flex flex-col justify-evenly items-center'>
                <div className=' flex justify-evenly w-2/3 items-center '>
                    <img className='w-8  ' src={assets.question_icon} alt="" />
                    <p>Help</p>
                </div>
                <div className='flex justify-evenly w-2/3 items-center'>
                    <img className='w-8 ' src={assets.history_icon} alt="" />
                    <p>Activity</p>
                </div>
                <div className='flex justify-evenly w-2/3 items-center'>
                    <img className='w-8 ' src={assets.setting_icon} alt="" />
                    <p>Settings</p>
                </div>
            </div>
      </div>
    </div>
  )
}
