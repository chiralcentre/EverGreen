import { Image, Box, Flex, IconButton, Link, Text } from '@chakra-ui/react'
import { AiOutlineLike, AiOutlineDislike, AiFillLike, AiFillDislike } from 'react-icons/ai'
import { useState, useEffect } from 'react'
import AddReply from './AddReply'

const Card = (props) => {
  const [isLikeActive, setIsLikeActive] = useState(false)
  const [isDislikeActive, setIsDislikeActive] = useState(false)
  const [isReplyActive, setIsReplyActive] = useState(false)
  const isComment = props.post
  const isPost = !isComment
  const isCommentReply = isComment && props.parent != null

  const [userObj, setUserObj] = useState('')
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Authorization': 'Token ' + localStorage.getItem('key') } // localStorage will break
    }
    fetch('https://ever-green-production.herokuapp.com/stockmarket/users/?search='
      + props.name, requestOptions)
      .then(response => response.json())
      .then(data => setUserObj(data[0]))
  }, [])

  const profileUrl = userObj.profilePicture ?
    userObj.profilePicture :
    "https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg"

  return (
    <>
      <Flex border="1px" bg="whiteAlpha.900" mb="1">
        <Box w="70px" >
          <Image w="60px" h="60px" mt="5px" ml="5px" src={profileUrl} />
        </Box>
        <Box w="calc(100% - 70px)" >
          <Box borderBottom="1px" borderColor="gray.400">
            {props.name},
            {" " + new Date(props.date).toLocaleDateString()},
            {(isComment ? " Comment id: " : " Post id: ") + props.id}
            {isCommentReply ? " | Replying to comment id: " + props.parent : null}
          </Box>
          <Box minH="120" >
            <Text as="b" fontSize="xl">{isPost ? "Title: " + props.title + " " : null}</Text>
            <Text whiteSpace="pre-wrap">{props.content}</Text>
          </Box>
          <Box borderTop="1px" borderColor="gray.400">
            {isLikeActive ? props.likes + 1 : props.likes}
            <IconButton
              _focus={{ outline: "none" }}
              bg="None"
              aria-label="Likes"
              size="sm"
              icon={!isLikeActive ? <AiOutlineLike size="22" /> : <AiFillLike size="22" />}
              onClick={() => {
                setIsLikeActive(!isLikeActive)
                setIsDislikeActive(false)
              }}
            />
            {isDislikeActive ? props.dislikes + 1 : props.dislikes}
            <IconButton
              _focus={{ outline: "none" }}
              bg="None"
              aria-label="Dislikes"
              size="sm"
              icon={!isDislikeActive ? <AiOutlineDislike size="22" /> : <AiFillDislike size="22" />}
              onClick={() => {
                setIsDislikeActive(!isDislikeActive)
                setIsLikeActive(false)
              }}
            />
            <Link onClick={() => { setIsReplyActive(!isReplyActive) }}>Reply</Link>
            {isReplyActive ? <AddReply {...props} /> : null}
          </Box>
        </Box>
      </Flex>
      <Flex>
        <Box w="30px"></Box>
        <Box w="calc(100% - 30px)">
          {props.comments ? props.comments.map(obj => <Card {...obj} key={obj.id} />) : null}
        </Box>
      </Flex>
    </>
  )
}

export default Card
