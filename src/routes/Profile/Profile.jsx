import { Button, Grid, TextField } from "@mui/material";
import AuthContext from "context/AutoContext";
import { useFetch } from "hooks/useFetch";
import { useValue } from "hooks/useValue";
import { useContext, useEffect } from "react";
import { removeEmptyProps } from "utils/helpers"
import petApi from "utils/PetServerAPI";
import { userProfileValidator } from "utils/validators";
//import "./Profile.css"


const Profile = () => {
    const { user, refresh } = useContext(AuthContext);
    const { isLoading, error, fetchData } = useFetch();

    const initValues = {
        email: "",
        name: "",
        phone: "",
        currentPassword: "",
        newPassword: "",
        bio: ""
    }
    const [profileValues, setProfilesValues, formReset] = useValue({...initValues});
    
    const handleSave = () => {
        if(!isLoading){
            fetchData(async () => {
                const updates = removeEmptyProps(profileValues);
                userProfileValidator(updates);
                await petApi.updateUser(user.id, updates);
                await refresh();
            }, '/home');
        }
    }

    useEffect(() => {
        fetchData(async () => {
            const profile = (await petApi.getUser(user.id)).data;
            formReset({
                ...initValues,
                email: profile.email,
                name: profile.name,
                phone: profile.phone,
                bio: profile.bio
            });
        });
    },[]);

    const formStyles = {
        maxWidth:"400px"
    }

    return (
        <>
            { !profileValues.email ? 
                <div>Loading user profile...</div> 
                :<Grid container sx={formStyles} spacing={3}>
                    <Grid item xs={12} sx={{ textAlign:"center"}}>
                        <h1>Profile</h1>
                    </Grid>
                    <Grid item xs={12} >
                        <TextField
                            variant="standard"
                            size="small"
                            label="Email"
                            name="email"
                            type="text"
                            value={profileValues.email}
                            onChange={setProfilesValues}
                        />  
                    </Grid>
                    <Grid item xs={12} >
                        <TextField
                            variant="standard"
                            size="small"
                            label="Name"
                            name="name"
                            type="text"
                            value={profileValues.name}
                            onChange={setProfilesValues}
                        />  
                    </Grid>
                    <Grid item xs={12} >
                        <TextField
                            variant="standard"
                            size="small"
                            label="Phone"
                            name="phone"
                            type="tel"
                            value={profileValues.phone}
                            onChange={setProfilesValues}
                        />  
                    </Grid>
                    <Grid item xs={12} >
                        <TextField
                            variant="standard"
                            size="small"
                            label="Current Password"
                            name="password"
                            type="password"
                            value={profileValues.password}
                            onChange={setProfilesValues}
                        />  
                    </Grid>
                    <Grid item xs={12} >
                        <TextField
                            variant="standard"
                            size="small"
                            label="New Password"
                            name="newPassword"
                            type="password"
                            value={profileValues.newPassword}
                            onChange={setProfilesValues}
                        />  
                    </Grid>
                    <Grid item xs={12} >
                        <TextField
                            multiline
                            rows={5}
                            fullWidth
                            size="small"
                            label="Bio"
                            name="bio"
                            type="text"
                            value={profileValues.bio}
                            onChange={setProfilesValues}
                        />  
                    </Grid>
                    <Grid item xs={12}>
                    <Button variant="contained"  onClick={handleSave}>SAVE</Button>
                    </Grid>
                </Grid>
            }
            {error && <div className="error">{error}</div>}
        </>
    );
}

export default Profile;