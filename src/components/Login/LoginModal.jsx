import "./Login.css"
import { Modal, Box } from '@mui/material';
import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "400px",
  bgcolor: 'white',
  border: '1px solid #000',
  boxShadow: 24,
};

const headerActiveStyle = {
  background: "#3528ebaf",
  opacity: "1"
}

const LoginModal =(props) => {
  const [mode, setMode] = useState("login");

  const handleModalClose = () => props.setModal(false);

  return (
      <Modal open={props.modal} onClose={handleModalClose}>
        <Box sx={modalStyle}>
          <div className="modalHeader">
            <div onClick={() => setMode("login")} style={mode==="login" ? headerActiveStyle:null}>Login</div>
            <div onClick={() => setMode("register")} style={mode==="register" ? headerActiveStyle:null}>Register</div>
          </div>
          {mode === "login" ? 
            <LoginForm closeModal={handleModalClose}/>
            :<RegisterForm closeModal={handleModalClose}/>}
        </Box>
      </Modal>
  );
}

export default LoginModal;