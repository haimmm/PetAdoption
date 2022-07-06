//import "./Login.css"
import { Button } from "components";
import { useValue } from "hooks/useValue";
import { loginValidator } from "utils/validators";
import { useFetch } from "hooks/useFetch";
import { useContext, useEffect } from "react";
import AuthContext from "context/AutoContext";
import { Grid, TextField } from "@mui/material";

const LoginForm =({ closeModal }) => {
    const { login } = useContext(AuthContext);
    const { data, isLoading, error, fetchData } = useFetch();

    const initValues = {
      email: "",
      password: ""
    }

    const [formValues, setFormValues] = useValue({...initValues});
    
    const handleLogin = () => {
        if(!isLoading){
            fetchData(async () => {
                loginValidator(formValues);
                return login(formValues);
            });
        }
    }

    useEffect(() => {
        data && closeModal();
    },[data]);

    const formStyles = {
        padding:"20px"
    }

    return (
        <form>
            <Grid container sx={formStyles} spacing={3}>
                <Grid item xs={12} sx={{ textAlign:"center"}}>
                    <TextField
                        size="small"
                        label="Email"
                        name="email"
                        value={formValues.emeil}
                        onChange={setFormValues}
                    />
                </Grid>
                <Grid item xs={12} sx={{ textAlign:"center"}}>
                    <TextField
                        size="small"
                        label="Password"
                        name="password"
                        type="password"
                        value={formValues.password}
                        onChange={setFormValues}
                    />
                </Grid>
                <Grid item xs={12} sx={{ textAlign:"center"}}>
                    <Button color="#F47340" onClick={handleLogin}>Login</Button>
                </Grid>
                <Grid item xs={12}>
                    {error && <div className="error">{error}</div>}
                    {isLoading && <div className="loading">Loading...</div>}
            </Grid>
            </Grid>
        </form>
    );
  }

  export default LoginForm;

//   <form className="modalBody">
//   <div>
//       <label>Email:</label>
//       <input type="text" name="email" value={formValues.email} onChange={setFormValues}/>
//   </div>
//   <div>
//       <label>Password:</label>
//       <input type="password" name="password" value={formValues.password} onChange={setFormValues}/>
//   </div>
//   <div className="indicators">
//       {error && <div className="error">{error}</div>}
//       {isLoading && <div className="loading">Loading...</div>}
//   </div>
//   <Button color="#F47340" onClick={handleLogin}> Login</Button>
// </form>