import { Button, ResultCard } from "components";
import { useFetch } from "hooks/useFetch";
import { useValue } from "hooks/useValue";
import petApi from "utils/PetServerAPI";
import { removeEmptyProps, isEmpty } from "utils/helpers"
import "./Search.css"
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";


const Search = () => {
    const { data, isLoading, error, fetchData } = useFetch();
    const [searchParams, setSearchParams] = useSearchParams();
    const initValues = {
        type: "",
        status: "",
        name: "",
        minHeight: "",
        maxHeight: "",
        minWeight: "",
        maxWeight: ""
    }
    const [formValues, setFormValues, resetForm] = useValue({...initValues});
    
    useEffect(() =>{
        const queriesInit = {...initValues};
        for(const pair of searchParams.entries()) {
            const [key,value] = pair;
            if(key in initValues)  queriesInit[key] = value;
            }
            if(!isEmpty(queriesInit)){ 
                handleSearch(queriesInit);
                resetForm(queriesInit);
        }
    },[]);

    const handleSearch = (values=formValues) => {
        const queries = removeEmptyProps(values);
        setSearchParams(queries);
        fetchData(async () => await petApi.getPetsByQueries(queries));
    }

    const formStyles = {
        maxWidth:"500px"
    }

    return (
        <div className="SearchContainer">
            <form>
                <Grid container sx={formStyles} spacing={3}>
                    <Grid item xs={12} sx={{ textAlign:"center"}}>
                        <h1>Search for a pet</h1>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="standard"
                            size="small"
                            label="name"
                            name="name"
                            value={formValues.name}
                            onChange={setFormValues}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl sx={{ width: 150 }}>
                            <InputLabel>Type</InputLabel>
                            <Select name="type" label="type" value={formValues.type} onChange={setFormValues} >
                                <MenuItem value="">All</MenuItem>
                                <MenuItem value="dog">Dog</MenuItem>
                                <MenuItem value="cat">Cat</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl sx={{ width: 150}}>
                            <InputLabel>Status</InputLabel>
                            <Select name="status" label="status" value={formValues.status} onChange={setFormValues} >
                                <MenuItem value="">All</MenuItem>
                                <MenuItem value="available">Available</MenuItem>
                                <MenuItem value="adopted">Adopted</MenuItem>
                                <MenuItem value="fostered">Fostered</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid  item xs={12} md={6}>
                        <TextField
                            fullWidth
                            variant="standard"
                            size="small"
                            label="Min height(cm)"
                            name="minHeight"
                            type="number"
                            value={formValues.minHeight}
                            onChange={setFormValues}
                        />
                    </Grid>
                    <Grid  item xs={12} md={6}>
                        <TextField
                            fullWidth
                            variant="standard"
                            size="small"
                            label="Max Height (cm)"
                            name="maxHeight"
                            type="number"
                            value={formValues.maxHeight}
                            onChange={setFormValues}
                        />
                    </Grid>
                    <Grid  item xs={12} md={6}>
                        <TextField
                            fullWidth
                            variant="standard"
                            size="small"
                            label="Min Weight (kg)"
                            name="minWeight"
                            type="number"
                            value={formValues.minWeight}
                            onChange={setFormValues}
                        />
                    </Grid>
                    <Grid  item xs={12} md={6}>
                        <TextField
                            fullWidth
                            variant="standard"
                            size="small"
                            label="Max Weight (kg)"
                            name="maxWeight"
                            type="number"
                            value={formValues.maxWeight}
                            onChange={setFormValues}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ textAlign:"center"}}>
                        <Button color="#EF2F88" onClick={() => !isLoading && handleSearch()}>SEARCH</Button>
                    </Grid>
                </Grid>
            </form>
            

            {error && <div className="error">{error}</div>}
            {isLoading && <div>Loading pets...</div>}

            <ul className="resultsList">
                {!isLoading && data?.map(pet => (
                    <ResultCard key={pet._id} pet={pet}></ResultCard>
                ))}
            </ul>
        </div>

    );
}

export default Search;