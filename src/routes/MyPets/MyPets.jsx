import { PetCard } from "components";
import AuthContext from "context/AutoContext";
import { useFetch } from "hooks/useFetch";
import { useContext, useEffect, useState } from "react";
import petApi from "utils/PetServerAPI";
import "./MyPets.css"
import ToggleButtons from "./ToggleButtons";


const MyPets = () => {
    const { user } = useContext(AuthContext);
    const [toggler, setToggler] = useState("myPets");
    const { data, isLoading, error, fetchData } = useFetch();

    useEffect(()=>{
        fetchData(async () => {
            const userPets = (await petApi.getPetsByUserId(user.id)).data;
            return {
                myPets: [...userPets.adopted, ...userPets.fostered],
                savedPets: userPets.saved
            };
        });
    },[]);

    return (
        <div className="myPets">
            <ToggleButtons {...{toggler, setToggler}}/>
            <div className="cardsContainer">
                {   (data?.[toggler].length) ?
                        data[toggler].map(pet => (
                            <PetCard pet={pet} key={pet._id}/>
                        ))
                        :<h1>{!isLoading && "You don't have any pets."}</h1>
                }
            </div>
            {error && <div className="error">{error}</div>}
            {isLoading && <div>Loading pets...</div>}
        </div>
    );
}

export default MyPets;