import { Button } from '@mui/material'
import "./Login.scss"

type Props = {}

export default function Login({}: Props) {
  return (
    <div className='login-container'>
        <Button variant='contained'>Login Button</Button>
    </div>
  )
}