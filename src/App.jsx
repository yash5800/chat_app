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
         else if(action.type === "ai"){
              const size = dummy.length-1;
              if(size >= 0){
                  dummy[size].ai = action.payload;
              }

              return dummy;
         }

         return [...dummy];
}

function App() {
  const [chat,up_chat] = useReducer(deposit,[{
    user:"",
    ai:"Welcome to Dark's Bot!",
  }]);

  function chat_controller(msg){

      const user_q = msg;
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
    up_chat(
      {
        type:"ai",
        payload:response
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
                           {history.user!==""&&
                            <pre className='userchat'>{history.user}</pre>}
                           <pre className='aichat'>{history.ai===""?<h1>Loading...</h1>
                           :history.ai
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
