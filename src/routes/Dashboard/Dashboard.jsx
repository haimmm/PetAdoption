import { Button } from "components";
import { useFetch } from "hooks/useFetch";
import { useValue } from "hooks/useValue";
import { Link } from "react-router-dom";
import petApi from "utils/PetServerAPI";
import "./Dashboard.css"

const Dashboard = () =>{
    const { data, isLoading, error, fetchData } = useFetch();

    const initValues = {
        database: "users",
        type: "all",

    }
    const [selects, setSelects, resetSelects] = useValue({...initValues});

    const handleFind = () => {
        const {database, type} = selects;
        fetchData(async () => {
            if(database === "users"){
                let users = await petApi.getAllUsers();
                if(type === "admins")
                    users = users.data.filter(user => user.permissions.includes("admin"));
                return users;
            }else{ //pets
                const queries = {};
                if(type !== 'all') queries.type = type;
                const pets = await petApi.getPetsByQueries(queries);
                console.log("cats: ", pets);
                return pets;
            }
        });
    }

   

    return (
        <>
            <h1>Admin Dashboard</h1>
            <div className="filters">
                <div>
                    <label>Database: </label>
                    <select name="database" value={selects.database} onChange={e => resetSelects({database:e.target.value, type: "all"})}>
                        <option value="users">users</option>
                        <option value="pets">Pets</option>
                    </select>
                </div>
                <div>
                    <label>type: </label>
                    <select name="type" value={selects.type} onChange={setSelects}>
                        <option value="all">All</option>
                        {
                        selects.database === "users" ?
                        <option value="admins">Admins</option>
                        :<>
                        <option value="dog">Dogs</option>
                        <option value="cat">Cats</option>
                        </>
                        }
                    </select>
                </div>
                <Button color="#EF2F88" onClick={e => !isLoading && handleFind()}>FIND</Button>
            </div>
            {error && <div className="error">{error}</div>}
            {isLoading && <div>Loading data...</div>}
            <ul className="list">
                {data?.map(instance => (
                    <li key={instance._id}>
                        <Link  to={`/${selects.database}/${instance._id}`}>{instance.name}</Link>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default Dashboard;

    // const handleDbSelect = e => {
    //     setDbSelect(e.target.value);
    // }
    // const handleTypeSelect = e => {
    //     setTypeSelect(e.target.value);
    // }

    // const handleFind = () => {
    //     //fetch data and fill the list...
    //     switch (dbSelect){
    //         case "users":
    //             //get all users from server
    //             setList(typeSelect === "all" ? fakeUsers : fakeUsers.filter(user => user.permissions.includes("admin")));
    //             break;
    //         case "pets":
    //             //can send query to server...
    //             setList(fakePets);
    //         default:
    //             throw new Error("admin dashboard: unsupported db type");
    //     }
    // } 


// {/* <select value={dbSelect} onChange={handleDbSelect}>
// <option value="users">users</option>
// <option value="pets">Pets</option>
// </select> */}