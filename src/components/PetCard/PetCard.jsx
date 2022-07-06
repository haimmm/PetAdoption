import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button } from 'components';
import { useNavigate } from 'react-router-dom';



const PetCard = ({ pet }) => {
  const navigate = useNavigate();
    return (
        <Card sx={{ width: "200px", bgcolor:"#F7F7F7", textAlign:"center"}}>
        <CardMedia
          component="img"
          height="auto"
          image={pet.image}
          alt="pet image"
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {pet.name}
          </Typography>
        </CardContent>
        <CardActions >
            <Button color="#EF2F88" onClick={()=>navigate(`/pets/${pet._id}`)} styles={{margin:"0 auto"}}>MORE INFO</Button>
        </CardActions>
      </Card>
    );
}

export default PetCard;


//F7F7F7