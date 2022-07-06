import "./Pet.css"
import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "context/AutoContext";
import { Button } from "components";
import petApi from "utils/PetServerAPI";
import { useFetch } from "hooks/useFetch";

const Pet = () => {
    const { id } = useParams();
    const { user, refresh } = useContext(AuthContext); 
    const { data, isLoading, error, fetchData } = useFetch();
    const navigate = useNavigate();
    
    useEffect(() =>{
        fetchData(async () => {
            const pet = (await petApi.getPetById(id)).data;
            return {
                pet,
                isAvailable: pet.status === 'available', 
                isAdopted: pet.status === 'adopted',
                isSaved: !!user.pets.saved.find(petId => petId === id),
                isUserOwner: !!((user.pets.adopted.find(petId => petId === id)) ||
                            (user.pets.fostered.find(petId => petId === id)))
            }
        });
    },[user]);

    const handleSave = isSaved => {
        console.log("saved button clicked with: ", isSaved);
        fetchData(async () => {
            const response = await (isSaved ? petApi.unsave(id) : petApi.save(id));
            !error && await refresh();
        });
    }
    const handleReturn = () => {
        console.log("return button clicked");
        fetchData(async () => {
            await petApi.return(id);
            !error && await refresh();
        });
    }
    const handleFoster = () => {
        console.log("foster button clicked");
        fetchData(async () => {
            await petApi.adopt(id, "fostered");
            !error && await refresh();
        });
    }
    const handleAdopt = () => {
        console.log("adopt button clicked");
        fetchData(async () => {
            await petApi.adopt(id, "adopted");
            !error && await refresh();
        });
    }

    const renderButtons = () => {
        const {isUserOwner, isSaved, isAvailable, isAdopted} = data;
        const buttonsColor = {bgcolor:"#EF2F88"}

        return (
            <div className="buttons">
                {isUserOwner &&
                    <Button styles={buttonsColor} onClick={() => !isLoading && handleReturn ()}>Return</Button>}
                {isAvailable && 
                    <Button  styles={buttonsColor} onClick={() => !isLoading && handleFoster()}>Foster</Button>}
                {!isAdopted && (isAvailable || isUserOwner) && 
                    <Button  styles={buttonsColor} onClick={() => !isLoading && handleAdopt()}>Adopt</Button>}
                {(user?.permissions.includes("admin")) && 
                    <Button  styles={buttonsColor} onClick={()=>navigate(`/addPet?id=${data.pet._id}`)}>Edit</Button>}
                    
                    <Button  styles={buttonsColor} onClick={()=> !isLoading && handleSave(isSaved)}>{isSaved ? "Unsave" : "Save"}</Button>
            </div>
        );
    }

    return (
        <div className="pet">
            {data && 
                <div className="petProperties">
                    <div className="imageContainer">
                        <img src={data.pet.image} alt={data.pet.name}></img>
                    </div>
                    <h1>{data.pet.name}</h1>
                    <div><span>Type:</span> {data.pet.type}</div>
                    <div><span>Bread:</span> {data.pet.bread}</div>
                    <div><span>Height / Weight:</span> {data.pet.height} / {data.pet.weight}</div>
                    <div><span>Color:</span> {data.pet.color}</div>
                    <div><span>Hypoallergenic:</span> {data.pet.hypoallergenic ? "Yes" : "No"}</div>
                    <div><span>Dietary restrictions:</span> {data.pet.diet}</div>
                    <div><span>Status:</span> {data.pet.status}</div>
                    <div><span>Bio:</span> {data.pet.bio}</div>
                    {renderButtons()}
                </div>
            }
            {error && <div className="error">{error}</div>}
            {isLoading && <div>Loading...</div>}
        </div>
    );
}

export default Pet;

// setCb(() => async () => {
//     const userPets = await petApi.getPetsByUserId(user.id);
//     const ownedPet = userPets.adopted.find(pet => pet.id === id) || userPets.fostered.find(pet => pet.id === id);
//     const savedPet = userPets.saved.find(pet => pet.id === id)
//     const pet = ownedPet || savedPet || await petApi.getPetById(user.id);
//     return {
//         pet,
//         isOwned: Boolean(ownedPet),
//         isSaved: Boolean(savedPet)
//     }
// });



// const userPets = await petApi.getPetsByUserId(user.id);
// const ownedPet = userPets.adopted.find(pet => pet.id === id) || userPets.fostered.find(pet => pet.id === id);
// const savedPet = userPets.saved.find(pet => pet.id === id)
// const pet = ownedPet || savedPet || await petApi.getPetById(user.id);
// return {
//     pet,
//     isOwned: Boolean(ownedPet),
//     isSaved: Boolean(savedPet)
// }