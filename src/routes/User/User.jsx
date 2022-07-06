import { useFetch } from "hooks/useFetch";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import petApi from "utils/PetServerAPI";
import "./User.css"

const User = () => {
    const { id } = useParams();
    const { data, isLoading, error, fetchData } = useFetch();

    useEffect(() =>{
        //find user by id
        fetchData(async () => {
            return await petApi.getUser(id);
        })
    },[]);

    return (
        <>
            { data &&
                <div className="user">
                    <h1>{data.name}</h1>
                    <p>{data.bio}</p>
                    <h3>Contact info:</h3>
                    <div>{data.email}</div>
                    <div>{data.phone}</div>
                </div>
            }
            {error && <div className="error">{error}</div>}
            {isLoading && <div>Loading data...</div>}
        </>
    );

}

export default User;