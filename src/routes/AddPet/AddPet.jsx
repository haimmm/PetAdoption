import { Button } from "components";
import { useFetch } from "hooks/useFetch";
import { useValue } from "hooks/useValue";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { allFieldsValidator } from "utils/validators";
import petApi from "utils/PetServerAPI";
import "./AddPet.css"
import { FormControl, Grid, IconButton, Input, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";

const AddPet = () =>{
    const [searchParams,setSearchParams] = useSearchParams();
    const { data, isLoading, error, fetchData } = useFetch();
    const initValues = {
        type:"dog",
        status:"available",
        hypoallergenic: false,
        name:"",
        bread:"",
        height:"",
        weight:"",
        color:"",
        diet:"",
        bio:"",
        file:""
    }
    const [values, setValues, reset] = useValue({...initValues});
    
    useEffect(() =>{
        const petId = searchParams.get("id");
        if(petId){
            fetchData(async () => {
                const data = await petApi.getPetById(petId);
                reset({...data});
                return data;
            });
        }
    },[searchParams]);

    const handleButton = e => {
        if(!isLoading){
            fetchData(async () => {
                allFieldsValidator(values);
                await (data ? petApi.updatePet(values) : petApi.addPet(values));
                reset({...initValues});
                setSearchParams("");
            }, '/home');
        } 
    }

    const formStyles = {
        maxWidth:"400px"
    }

    return (
        <form>
            <Grid container sx={formStyles} spacing={3}>
                    <Grid item xs={12} sx={{ textAlign:"center"}}>
                        <h1>{data ? 'Edit':"Add"} Pet</h1>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl sx={{ width: 150 }}>
                            <InputLabel>Type</InputLabel>
                            <Select name="type" label="type" value={values.type} onChange={setValues} >
                                <MenuItem value="dog">Dog</MenuItem>
                                <MenuItem value="cat">Cat</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl sx={{ width: 150 }}>
                            <InputLabel>Hypoallergenic</InputLabel>
                            <Select name="hypoallergenic" label="hypoallergenic" value={values.hypoallergenic} onChange={setValues} >
                                <MenuItem value={false}>No</MenuItem>
                                <MenuItem value={true}>Yes</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid  item xs={12}>
                        <TextField
                            fullWidth
                            variant="standard"
                            size="small"
                            label="Name"
                            name="name"
                            type="text"
                            value={values.name}
                            onChange={setValues}
                        />
                    </Grid>
                    <Grid  item xs={12}>
                        <TextField
                            fullWidth
                            variant="standard"
                            size="small"
                            label="Bread"
                            name="bread"
                            type="text"
                            value={values.bread}
                            onChange={setValues}
                        />
                    </Grid>
                    <Grid  item xs={12}>
                        <TextField
                            fullWidth
                            variant="standard"
                            size="small"
                            label="Height(cm)"
                            name="height"
                            type="number"
                            value={values.height}
                            onChange={setValues}
                        />
                    </Grid>
                    <Grid  item xs={12}>
                        <TextField
                            fullWidth
                            variant="standard"
                            size="small"
                            label="Weight(kg)"
                            name="weight"
                            type="number"
                            value={values.weight}
                            onChange={setValues}
                        />
                    </Grid>
                    <Grid  item xs={12}>
                        <TextField
                            fullWidth
                            variant="standard"
                            size="small"
                            label="Color"
                            name="color"
                            type="text"
                            value={values.color}
                            onChange={setValues}
                        />
                    </Grid>
                    <Grid  item xs={12}>
                        <TextField
                            fullWidth
                            variant="standard"
                            size="small"
                            label="Diet"
                            name="diet"
                            type="text"
                            value={values.diet}
                            onChange={setValues}
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
                            value={values.bio}
                            onChange={setValues}
                        />  
                    </Grid>
                    <Grid item xs={12} sx={{ textAlign:"center"}}>
                        <label htmlFor="icon-button-file">
                            <Input sx={{display:'none'}} accept="image/*" id="icon-button-file" type="file" name="file" onChange={setValues} />
                            <IconButton color="primary" aria-label="upload picture" component="span">
                                Upload image
                                <PhotoCamera />
                            </IconButton>
                        </label>
                    </Grid>
                    <Grid item xs={12} sx={{ textAlign:"center"}}>
                        <Button color="#EF2F88" onClick={handleButton}>{data ? "Save changes" : "Add new pet"}</Button>
                    </Grid>
            </Grid>
            {error && <div className="error">{error}</div>}
            {isLoading && <div className="loading">Saving pet...</div>}
        </form>
    );

}

export default AddPet;


// <div className="AddContainer">
//             <h1>{data ? 'Edit':"Add"} Pet</h1>
//             <div>
//                 <label>Type</label>
//                 <select name="type" value={values.type} onChange={setValues}>
//                     <option value="dog">Dog</option>
//                     <option value="cat">Cat</option>
//                 </select>
//             </div>
//             <div>
//                 <label>Status</label>
//                 <select name="status" value={values.status} onChange={setValues}>
//                     <option value="available">Available</option>
//                     <option value="adopted">Adopted</option>
//                     <option value="fostered">Fostered</option>
//                 </select>
//             </div>
//             <div>
//                 <label>Hypoallergenic</label>
//                 <select name="status" value={values.hypoallergenic} onChange={setValues}>
//                     <option value={false}>No</option>
//                     <option value={true}>Yes</option>
//                 </select>
//             </div>
//             <div>
//                 <label>Name:</label>
//                 <input type="text" name="name" value={values.name} onChange={setValues}/>
//             </div>
//             <div>
//                 <label>Bread:</label>
//                 <input type="text" name="bread" value={values.bread} onChange={setValues}/>
//             </div>
//             <div>
//                 <label>Height (cm):</label>
//                 <input type="number" name="height" value={values.height} onChange={setValues}/>
//             </div>
//             <div>
//                 <label>Weight (kg):</label>
//                 <input type="number" name="weight" value={values.weight} onChange={setValues}/>
//             </div>
//             <div>
//                 <label>Color:</label>
//                 <input type="text" name="color" value={values.color} onChange={setValues}/>
//             </div>
//             <div>
//                 <label>Diet:</label>
//                 <input type="text" name="diet" value={values.diet} onChange={setValues}/>
//             </div>
//             <div>
//                 <label>Bio:</label>
//                 <input type="text" name="bio" value={values.bio} onChange={setValues}/>
//             </div>
//             <div>
//                 <input type="file" name="file" onChange={setValues} accept="image/*" />
//             </div>
//             {error && <div className="error">{error}</div>}
//             {isLoading && <div className="loading">Saving pet...</div>}
//             <Button color="#EF2F88" onClick={handleButton}>{data ? "Save changes" : "Add new pet"}</Button>           
//         </div>