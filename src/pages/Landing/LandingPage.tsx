import { Button } from '@mui/material'
import { useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { NavigateFunction, useNavigate } from 'react-router-dom';


export default function LandingPage() {

  const { logout, isAuthenticated } = useAuth();
  const navigate: NavigateFunction = useNavigate();


  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  },[isAuthenticated, navigate]);


  return (
    <div>
      <Button onClick={logout}>Logout</Button>
    </div>
  )
}