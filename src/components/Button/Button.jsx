import MUIbutton from '@mui/material/Button'


const Button = ({ children, onClick, styles }) => {
    const buttonStyle = {
        ...styles,
    }
    buttonStyle["&.MuiButtonBase-root:hover"] = {
      color: buttonStyle.bgcolor,
      bgcolor: buttonStyle.color
    }

    return <MUIbutton variant="contained" sx={buttonStyle} onClick={onClick}>{children}</MUIbutton>
}

export default Button;

// "&.MuiButtonBase-root:hover": {
//   color: 
// }