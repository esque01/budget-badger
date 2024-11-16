import { Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { NavigateFunction, useNavigate } from 'react-router-dom';


export default function LandingPage() {

  const { logout, isAuthenticated } = useAuth();
  const navigate: NavigateFunction = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);


  useEffect(() => {
    if (!isAuthenticated) {
      setIsLoading(true);
      navigate("/");
    }
    else {
      setIsLoading(false);
    }
  },[isAuthenticated, navigate]);

  
  if (isLoading) {
    return <>Loading...</>
  }

  return (
    <div>
      <Button onClick={logout}>Logout</Button>
    </div>
  )
}