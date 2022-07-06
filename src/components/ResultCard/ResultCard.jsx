
import { Link } from "react-router-dom";
import "./ResultCard.css"

const ResultCard = ({ pet }) => {
    return (
        <div className="container">
            <img src={"data:image/*;base64,"+pet.image} alt={pet.name}/>
            <h3 className="name">{pet.name}</h3>
            <div className="status">{pet.status}</div>
            <Link to={`/pets/${pet._id}`}>More Info</Link>
        </div>
    );
}

export default ResultCard;
//pet.image