import React, { useReducer } from 'react'
import run from './com'
import Chat from './Chat';

function deposit(current,action){
         const dummy = [...current];
         console.log(dummy);
         if(action.type === "user"){
              const user_chat = [
                                 ...dummy,
                                      {
                                        user:action.payload,
                                        ai:""
                                      }
                                ];

              return user_chat
         }
         else if (action.type === "ai") {
          const size = dummy.length - 1;
          if (size >= 0) {
            dummy[size].ai = Array.isArray(action.payload)
              ? action.payload
              : [action.payload];
          }
          return dummy;
        }
        return dummy;
      }


function App() {
  const [chat,up_chat] = useReducer(deposit,[{
    user:"",
    ai:["Welcome to Dark's Bot!"],
  }]);

  function chat_controller(msg){

      const user_q = msg;

      if(user==="") return;
      up_chat(
        {
          type:"user",
          payload:user_q
        }
      )

      ai(user_q);
  }

  async function ai(query){
    
    const response = await run(query);
    const ai_r = response.split(/(```.*?```|\*\*.*?\*\*)/g).filter(item => item.trim() !== "")
    up_chat(
      {
        type:"ai",
        payload:ai_r
      }
    );

  }


  return (
    <div className='absolute w-full flex justify-center'>
     <div className='mainchat w-[700px] mt-5 p-10 mb-24'>
         {
             chat.length>0 &&
              chat.map((history,index) => 
                   <div key={index}>
                           {history.user && <pre className='userchat'>{history.user}</pre>}

                           <pre className='aichat'>
                            {history.ai.length===0?
                              <h1>Loading...</h1>:
                              
                              (history.ai.map((items, index) => (
                                  <div key={index}>
                                    {items.includes('```') ? (
                                      <pre className="code">{items.replace(/```/g, '')}</pre>
                                    ) : items.includes('**') ? (
                                      <pre className="head">{items.replace(/\*\*/g, '')}</pre>
                                    ) : items.includes('`') ? (
                                      <pre>{items.replace(/`/g, '')}</pre>
                                    ) :(
                                      <pre>{items}</pre>
                                    )}
                                  </div>
                                ))
                            )
                           }</pre>
                   </div>
                   )     
         }
    </div>
    <Chat controller={chat_controller}/>
    </div>
  )
}

export default App
