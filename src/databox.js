import React, { useEffect, useState,useRef } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import './data-box.css';
import hackerImage from './hacker.png';
import gamerImage from './gamer.png';
import girlImage from './girl.png';
import womanImage from './woman.png';
import manImage from './man.png';
import manImage1 from './man1.png';
import womanImage1 from './woman1.png';
import womanImage2 from './woman2.png';
import rabbitImage from './rabbit.png';
import defaultAvatarImage from './logo.png'
import { useLocation } from 'react-router-dom';
import { throttle } from 'lodash';

const socket = io('https://campusbackend.onrender.com');
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

const DataBox = () => {
  const location = useLocation();
  const {selectedOption } = location.state;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userScrolled, setUserScrolled] = useState(false);
  const dataBoxRef = useRef(null);
  const type=selectedOption;
  const prevScrollPositionRef= useRef(0); // new addition 1/7/2023
  useEffect(() => {
    fetchData();

    socket.on('chat message', (message) => {
      setData((prevData) => [...prevData, message]);
      if (!userScrolled) {
        scrollToBottom();
      }
    });
  //  const interval = setInterval(fetchData, 1000); ////added this
   // scrollToBottom();
    return () => {
      socket.off('chat message');
    //  clearInterval(interval); //// and thiss......
    };
  },[data]);// ,userScrolled removed this 
const handleScroll = () => {
  if (dataBoxRef.current) {
    const { scrollTop, scrollHeight, clientHeight } = dataBoxRef.current;
    const isAtBottom = Math.ceil(scrollTop + clientHeight ) >=scrollHeight;
    setUserScrolled(!isAtBottom);
  }
};

useEffect(() => {
  scrollToBottom();

  const handleScrollThrottled = throttle(handleScroll, 200);

  if (dataBoxRef.current) {
    dataBoxRef.current.addEventListener('scroll', handleScrollThrottled);

    return () => {
      dataBoxRef.current.removeEventListener('scroll', handleScrollThrottled);
    };
  }
}, []);


  const fetchData = async () => {
    try {
      const response = await axios.get('https://campusbackend.onrender.com/api/getAll',{
      params: {
        input:type // Pass the input value as a query parameter
      }
    });
     setData(response.data.map((item) => ({ ...item, avatarId: item.avatarimg })));
    setIsLoading(false);
    const isAtBottom = dataBoxRef.current
      && Math.ceil(dataBoxRef.current.scrollTop + dataBoxRef.current.clientHeight) >= dataBoxRef.current.scrollHeight;
    if (isAtBottom) {
      scrollToBottom();
    }
      } catch (error) {
    console.error('Error retrieving data:', error);
    setIsLoading(false);
  }
  };

  const scrollToBottom = () => {
    if (dataBoxRef.current) {
    const { scrollTop, scrollHeight, clientHeight } = dataBoxRef.current;
    const isAtBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
    if (isAtBottom) {
      dataBoxRef.current.scrollTop = scrollHeight;
    }
  }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
const reveresedData = [...data].reverse();
  return (
    <div>
       <h2>Welcome to {selectedOption} group chat</h2>
       <div className="template">
    <div className="data-box" ref={dataBoxRef} id="data-box">
     
      {reversedData.length > 0 ? (
        <ul>
          {reversedData.map((item) => (
            <li key={item.id}> <div className="message-content">
               <img
                  src={avatars.find((avatar) => avatar.id === item.avatarId)?.image || defaultAvatarImage}
                  alt="Avatar"
                  className="avatar-image"
                />
           <p className="message-sender">{item.username}</p>
            <p className="message-text">{item.message}</p>
          </div></li>
          ))}
        </ul>
      ) : (
        <p>No data available</p>
      )}
    </div></div></div>
  );
};

export default DataBox;
