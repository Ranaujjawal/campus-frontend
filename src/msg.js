import React, { useState,useRef,useEffect } from 'react';
import Axios from 'axios';
import './msg.css';
import hackerImage from './hacker.png';
import gamerImage from './gamer.png';
import girlImage from './girl.png';
import womanImage from './woman.png';
import manImage from './man.png';
import manImage1 from './man1.png';
import womanImage1 from './woman1.png';
import womanImage2 from './woman2.png';
import rabbitImage from './rabbit.png';
import sendImage from './message.png';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';
const socket = io('http://localhost:8000');
//import { useNavigate } from 'react-router-dom';

const avatars = [
  { id: 1, image:hackerImage },
  { id: 2, image:gamerImage },
  { id: 3, image:girlImage },
  { id: 4, image:womanImage },
  { id: 5, image:womanImage1 },
  { id: 6, image:womanImage2 },
  { id: 7, image:manImage },
  { id: 8, image:manImage1 },
  {id:9, image:rabbitImage},
];
function Form({onMessageSubmit}) {//{onMessageSubmit}
   // const history = useNavigate();
   const location = useLocation();
  const { username, selectedOption} = location.state;
  const avatarId = location.state?.avatarId;

  const avatar = avatars.find((avatar) => avatar.id === avatarId);

    const [message, setMessage] = useState("");
    const messageInputRef = useRef(null);
    const handleSubmit = (e) => {
        e.preventDefault();

       Axios.post('http://localhost:8000/api/post', {
            message:message,
            username:username,
            college:selectedOption,
            avatarimg:avatarId,
        })
        .then((response) => {
            console.log(response.data); // Handle success response from the server
            setMessage(''); 
            socket.emit('chat message', response.data);
            onMessageSubmit();
            //scrollMessageInputToBottom();
           // scrollDataBoxToBottom();// Clear the input field
      //  onMessageSubmit();
         //   history("/");
        })
        .catch(error => {
            console.log(error);
           // window.alert("Error!"); // Handle error response from the server
        });
        /*const handleSubmit = (e) => {
            e.preventDefault();
        
            // Send the message to the server via WebSocket
            socket.emit('message', message);
        
            // Clear the input field
            setMessage('');
          };*/
    };
    const scrollDataBoxToBottom = () => {
        const dataBox = document.getElementById('data-box');
        if (dataBox) {
          dataBox.scrollTop = dataBox.scrollHeight;
        }
      };
    const scrollMessageInputToBottom = () => {
        if (messageInputRef.current) {
          messageInputRef.current.scrollTop = messageInputRef.current.scrollHeight;
        }
      };
    
      useEffect(() => {
       // scrollMessageInputToBottom(); // Scroll message input to the bottom when component mounts
      }, []);
    return (
        <div className="msgform">
            <header className="form-header"> 
                <div className="logIn-form">
                    < form onSubmit={handleSubmit}>
                    <textarea
                         className="message-input"
                              placeholder="Say Hi! 🙋‍♂️"
                                  value={message}
                              onChange={(e) => {
                              setMessage(e.target.value);
                                     }}
          ref={messageInputRef}
        ></textarea>
                         <button type="submit" className='submit-button'> <img src={sendImage} alt="Submit"className='submit-icon' /></button>
                    </form>
                   
                </div>
            </header>
        </div>
    );
}

export default Form;
/* <h1>Welcome to the Next Page!</h1>
      <p>Your username is: {username}</p>
      <p>Your college is: {selectedOption}</p>
      <p>your avatar is:<img src={avatar.image} alt={avatar.name}/></p>*/