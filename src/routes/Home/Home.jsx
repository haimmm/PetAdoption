import AuthContext from "context/AutoContext";
import { useContext } from "react";
import "./Home.css"
import video from 'resources/bgvideo.mp4';
import { Button } from "components";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const buttonStyle = {
    color: "white",
    bgcolor: "black",
  }

  const renderWelcomeMessage = (user) => {
    return (
      <div className="welcomeMessage">
        <h1>{user ? `Welcome back ${user.name} !` : `Welcome to pet adoption`}</h1>
        <p>Many pets are waiting to be adopted</p>
        <Button styles={buttonStyle} onClick={() => navigate('/search')}>Adopt now</Button>
      </div>
    );  
  }

  return (
    <div className="home">
      <video autoPlay loop muted>
        <source src={video} type="video/mp4"/>
      </video>
      {renderWelcomeMessage(user)}
    </div>
  );
}
  
  export default Home;

