import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState } from 'react';

export default function ToggleButtons({toggler, setToggler}) {

    const handleAlignment = (event, newAlignment) => {
      newAlignment && setToggler(newAlignment)
    };
  
    return (
      <ToggleButtonGroup
        value={toggler}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
      >
        <ToggleButton value="myPets" >
          <div>My Pets</div>
        </ToggleButton>
        <ToggleButton value="savedPets" >
        <div>Saved Pets</div>
        </ToggleButton>
      </ToggleButtonGroup>
    );
  }