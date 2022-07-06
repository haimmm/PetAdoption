import './App.css';
import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import {Line, Nav, NavItem } from 'layouts';
import { AddPet, Dashboard, Home, MyPets, Profile, Search, User } from "routes"
import AuthContext from 'context/AutoContext';
import { useAuth } from 'hooks/useAuth';
import { useState } from 'react';
import { Footer, LoginModal } from 'components';
import Pet from 'routes/Pet/Pet';


function App() {
  const auth = useAuth();
  const user = auth.user;
  const [modal, setModal] = useState(false);

  return (
    <>
    { user === undefined ?
      <div>Loading website...</div>
      :<div className="App">
            <Nav>
                <Line>
                  <NavItem><NavLink to="/home">Home</NavLink></NavItem>
                  <NavItem><NavLink to="/search">Search</NavLink></NavItem>
                  {user &&
                    <>
                      <NavItem><NavLink to="/profile">Profile</NavLink></NavItem>
                      <NavItem><NavLink to="/myPets">My Pets</NavLink></NavItem>
                      {user.permissions.includes('admin') &&
                        <>
                          <NavItem><NavLink to="/addPet">Add Pet</NavLink></NavItem>
                          <NavItem><NavLink to="/dashboard">Dashboard</NavLink></NavItem>
                        </>
                      }
                    </>
                  }
                </Line>
                {user ? 
                  <NavItem><NavLink to="/home" onClick={() => auth.logOut()}>Sign Out</NavLink></NavItem>
                  :<NavItem><NavLink to="/home" onClick={() => setModal(true)}>Login</NavLink></NavItem>
                }
            </Nav>
            <AuthContext.Provider value={auth}>
                <Routes>
                  <Route path="/home" element={<Home/>} />
                  <Route path="/profile" element={<Profile/>} />
                  <Route path="/search" element={<Search/>} />
                  <Route path="/myPets" element={<MyPets/>} />
                  <Route path={"/addPet"} element={user?.permissions.includes('admin') ? <AddPet/>:<Navigate to="/home"/>} /> 
                  <Route path={"/dashboard"} element={user?.permissions.includes('admin') ? <Dashboard/>:<Navigate to="/home"/>} />
                  <Route path={"/pets/:id"} element={<Pet/>} />
                  <Route path={"/users/:id"} element={<User/>} />
                  <Route path="/*" element={<Navigate to="/home"/>} />
                </Routes>
                <LoginModal {...{modal, setModal}}/>
            </AuthContext.Provider>
            <Footer/>
      </div>
    }
    </>
  );
}

export default App;

/** TODO:
 * fix footer
 * fix loading issue on nested api calls
 * import more MUI components
 * ask for current password on password change
 */


//  {user && <NavItem><NavLink to="/profile">Profile</NavLink></NavItem>}
//  {user && <NavItem><NavLink to="/myPets">My Pets</NavLink></NavItem>}
//  {user && <NavItem><NavLink to="/addPet">Add Pet</NavLink></NavItem>}
//  {user && <NavItem><NavLink to="/dashboard">Dashboard</NavLink></NavItem>}