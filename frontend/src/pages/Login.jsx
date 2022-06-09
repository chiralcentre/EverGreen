import {
  Flex, Button, Heading, Input, Link, Box,
  FormControl, FormErrorMessage, Alert, AlertIcon,
  AlertDescription
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import AppBar from '../components/AppBar'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import pineBackground from '../assets/pine_tree_fog.jpg'
import UserContext from '../context/UserContext'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [requestData, setRequestData] = useState('')
  //const [context, setContext] = useContext(UserContext)
  const loginInfo = { "email": email, "password": password }
  const navigate = useNavigate()

  const isValidEmail = email === '' || email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
  const fieldsEmpty = email === '' || password === ''

  if (requestData.key) {
    navigate(`../user/${email.split("@")[0]}`)
  }

  const firstKey = Object.keys(requestData)[0]
  const errorMessage = requestData[firstKey]

  function handleClick() {
    if (!(!isValidEmail || fieldsEmpty)) {
      PostRequest(loginInfo)
    }
  }

  function PostRequest(info) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(info)
    }
    fetch('https://ever-green-production.herokuapp.com/dj-rest-auth/login/', requestOptions)
      .then(response => response.json())
      .then(data => setRequestData(data))
  }

  return (
    <Box h="100%" bgImage={pineBackground} bgSize="cover">
      <AppBar />
      <Flex h="85vh" alignItems="center" justifyContent="center" >
        <Flex direction="column" bg="rgba(237,242,247,0.8)" p={12} rounded={6} boxShadow="lg">
          <Heading mb={9} alignSelf="center">Log in</Heading>
          <FormControl isInvalid={!isValidEmail}>
            <Input
              border="1px"
              borderColor="gray.400"
              placeholder="Email"
              type="email"
              variant="filled"
              onChange={e => setEmail(e.target.value)}
            />
            {!isValidEmail ? <FormErrorMessage>Invalid Email.</FormErrorMessage> : null}
          </FormControl>
          <Input
            border="1px"
            borderColor="gray.400"
            placeholder="Password"
            mb={9}
            mt={3}
            type="password"
            variant="filled"
            onChange={e => setPassword(e.target.value)}
          />
          <Button colorScheme="teal" mb={3} onClick={() => handleClick()}>Log in</Button>
          <Link fontSize="s" >Forgot your password?</Link>
          <Link fontSize="s" as={RouterLink} to='../signup'>Sign Up</Link>
        </Flex>
      </Flex>
      {errorMessage ? (
        <Alert status="error" h="8.7vh">
          <AlertIcon />
          <AlertDescription> {errorMessage}  </AlertDescription>
        </Alert>
      ) : <Box h="8.7vh"></Box>}
    </Box>
  )
}

export default Login
