import { Flex, Button, Heading, Input, Link, Box } from '@chakra-ui/react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import AppBar from '../components/AppBar'
import { useState } from 'react'

const SignUp = () => {
  const [email, setEmail] = useState()
  const [newPassword, setNewPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()
  const obj = { "email": email, "newPassword": newPassword, "confirmPassword": confirmPassword }
  const navigate = useNavigate()

  return (
    <Box height="100%" bg="gray.300">
      <AppBar />
      <Flex height="85vh" alignItems="center" justifyContent="center">
        <Flex direction="column" bg="gray.100" p={12} rounded={6} boxShadow="lg">
          <Heading alignSelf="center" mb={9}>Sign Up</Heading>
          <Input
            border="1px"
            borderColor="gray.400"
            placeholder="New Email"
            variant="filled"
            mb={3}
            type="email"
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            border="1px"
            borderColor="gray.400"
            placeholder="New Password"
            variant="filled"
            mb={3}
            type="password"
            onChange={e => setNewPassword(e.target.value)}
          />
          <Input
            border="1px"
            borderColor="gray.400"
            placeholder="Confirm Password"
            variant="filled"
            mb={9}
            type="password"
            onChange={e => setConfirmPassword(e.target.value)}
          />
          <Button colorScheme="blue" mb={3}
            onClick={() => navigate(-1)}>Sign Up</Button>
          <Link fontSize="s" as={RouterLink} to='../login'>Back</Link>
        </Flex>
      </Flex>
      <Box h="8.7vh"></Box>
    </Box>
  )
}

export default SignUp
