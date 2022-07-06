import { Button } from "components";
import AuthContext from "context/AutoContext";
import { useFetch } from "hooks/useFetch";
import { useValue } from "hooks/useValue";
import { useContext, useEffect } from "react";
import { registerValidator } from "utils/validators";
import TextField from '@mui/material/TextField';
import { Grid } from "@mui/material";
//import "./Login.css"

const RegisterForm =({ closeModal }) => {
    const { register } = useContext(AuthContext);
    const { data, isLoading, error, fetchData } = useFetch();
    const initValues = {
      email: "",
      password: "",
      passwordConfirm: "",
      name: "",
      phone: "",
      permissions: ["user"]
    }

    const [formValues, setFormValues] = useValue({...initValues}, "object");
    
    const handleRegister = () => {
        if(!isLoading){
            fetchData(async () => {
                registerValidator(formValues);
                return register(formValues);
            });
        }
    }

    useEffect(() => {
        data && closeModal();
    },[data]);

    const formStyles = {
        padding:"10px"
    }

    return ( 
    <form>
        <Grid container sx={formStyles} spacing={3}>
            <Grid item xs={12} md={6}>
                <TextField
                    fullWidth
                    size="small"
                    label="Name"
                    name="name"
                    value={formValues.name}
                    onChange={setFormValues}
                />
            </Grid>
            <Grid item xs={12} md={6} >
                <TextField
                    fullWidth
                    size="small"
                    label="Email"
                    name="email"
                    value={formValues.email}
                    onChange={setFormValues}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    size="small"
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                    value={formValues.password}
                    onChange={setFormValues}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    fullWidth
                    size="small"
                    label="Confirm password"
                    name="passwordConfirm"
                    type="password"
                    value={formValues.passwordConfirm}
                    onChange={setFormValues}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    fullWidth
                    size="small"
                    label="Phone"
                    name="phone"
                    value={formValues.phone}
                    onChange={setFormValues}
                />
            </Grid>
            <Grid item xs={12} md={6} sx={{ textAlign:"center"}}>
                <Button color="#F47340" onClick={handleRegister}>Register</Button>
            </Grid>
            <Grid item xs={12}>
                {error && <div className="error">{error}</div>}
                {isLoading && <div className="loading">Loading...</div>}
            </Grid>
        </Grid>
    </form>
    );
  }
  export default RegisterForm;

