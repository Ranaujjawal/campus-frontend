import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './main.css';
import hackerImage from './hacker.png';
import gamerImage from './gamer.png';
import girlImage from './girl.png';
import womanImage from './woman.png';
import manImage from './man.png';
import manImage1 from './man1.png';
import womanImage1 from './woman1.png';
import womanImage2 from './woman2.png';
import rabbitImage from './rabbit.png';
import gmailIcon from './gmail.png';
import logo from './logo.png'
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
const Main = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedAvatarId, setSelectedAvatarId] = useState(1);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedAvatar = avatars.find((avatar) => avatar.id === selectedAvatarId);
    // Redirect to a specific page with the selected option value in the URL
    if (!selectedAvatarId) {
      // Handle the case when no avatar is selected
      alert("Please select an avatar");
      return;
    }
    // Check if college is selected
  if (!selectedOption) {
    alert('Please select a college');
    return;
  }
  
  // Check if username length is less than 3
  if (username.length < 3) {
    alert('Username should be at least 3 characters long');
    return;
  }

    navigate(`/App`, { state: { username, selectedOption,avatarId: selectedAvatar.id } });
  };
  const handleAvatarChange = (event) => {
    const selectedAvatarId = parseInt(event.target.value);
    setSelectedAvatarId(selectedAvatarId);
  };
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className='main'>
       <div className="main-container">
      <div className="heading">
        <h1><img src={logo} alt="Gmail" className="logo-icon" /></h1>
        <h1>Campus Diary</h1>
        <h4>
          Feel free to chat! 😁 Just select your college and username and have fun 🙃 with your college friends. 
          Remember 😆 no one is junior or senior here.
        </h4>
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="avatar-section">
            <h5 className='avatar-heading'>Select Avatar:</h5>
            <div className="avatar-options">
              {avatars.map((avatar) => (
                <label key={avatar.id} className="avatar-option">
                  <input
                    type="radio"
                    name="avatar"
                    value={avatar.id}
                    checked={selectedAvatarId === avatar.id}
                    onChange={handleAvatarChange}
                    required
                  />
                  <img src={avatar.image} alt={avatar.name} />
                </label>
              ))}
            </div>
          </div>
          <div className="input-section">
            <select value={selectedOption} onChange={handleSelectChange} required>
              <option value="">Select your College</option>
              <option value="NIT Agartala">NIT Agartala</option>
              <option value="NIT Delhi">NIT Delhi</option>
              <option value="IIT Guwahati">IIT Guwahati</option>
            </select>
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Enter your username 😉"
              required
            />
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
      <div className="footer"><p >If you want to add your college, mail us at <a href="mailto:ranaujjawal692@gmail.com"> <img src={gmailIcon} alt="Gmail" className="gmail-icon" /></a></p>

</div>
    </div>
    </div>
  );
};

export default Main;
