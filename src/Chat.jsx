/* eslint-disable react/prop-types */
import React, { useRef } from 'react'

export default function Chat({controller}) {
  const msg = useRef("");

  function send(e){
        e.preventDefault();
         
        if(msg.current.value === ""){return null}
        controller(msg.current.value);
        msg.current.value ="";
  }

  return (
<div className="fixed bottom-7 w-full flex items-center justify-center ">
  <form onSubmit={send} className="relative w-4/5 max-w-3xl flex justify-center items-center bg-slate-800 rounded-lg">
    <textarea
      ref={msg}
      className="rounded-lg py-3 px-4 bg-slate-800 outline-none text-white w-4/5"
      type="text"
      placeholder="What is on your mind?"
    />
    <input
      type="submit"
      value="Ask"
      className="ask text-white py-1 px-3 bg-coral-red rounded-lg absolute right-4 top-2"
    />
  </form>
</div>

  )
}
