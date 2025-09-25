import RobotProfileImage from '../assets/robot.png'
import UserProfileImage from '../assets/user.png'
import './ChatMessage.css';

export default function ChatMessage({ message, sender}) {
  return (
    <div className={sender === 'robot' ? "robot-message" : "user-message"}>
      {sender === 'robot' && <img className="chat-icon" src={RobotProfileImage} />}
      
      <div className="chat-message">
        {message}
      </div>
      {sender === 'user' && <img className="chat-icon" src={UserProfileImage} />}
    </div>
  );
}