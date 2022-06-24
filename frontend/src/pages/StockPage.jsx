import { SymbolInfo } from 'react-tradingview-embed'
import { useState } from 'react'
import { Box, Flex, IconButton, Spacer, Text } from '@chakra-ui/react'
import AppBar from '../components/AppBar'
import { useParams } from 'react-router-dom'
import StockTabs from '../components/Stocks/StockTabs'
import Posts from '../components/Posts/Posts'
import AddPost from '../components/Posts/AddPost'
import background from '../assets/oak_wood_texture.jpg'
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs'

const StockPage = () => {
  const { ticker } = useParams()
  const [isBookmarked, setIsBookmarked] = useState(false)
  return (
    <Box bgImage={background} bgSize="contain" bgPos="center" >
      <AppBar />
      <Box margin="auto" w="95%">
        <Box h="5"></Box>
        <Flex boxShadow="lg" bg="white">
          <Box w="calc(100% - 40px)">
            <SymbolInfo widgetProps={{ symbol: ticker, colorTheme: "light", width: "100%" }} />
          </Box>
          <Box w="40px" >
            <IconButton
              ml="7px"
              colorScheme="yellow"
              aria-label="Bookmark"
              size="sm"
              icon={!isBookmarked ? <BsBookmark size="28" /> : <BsBookmarkFill size="28" />}
              onClick={() => setIsBookmarked(!isBookmarked)}
            />
          </Box>
        </Flex>
      </Box>
      <Box h="10"></Box>
      <StockTabs />
      <Box h="5"></Box>
      <Flex mt="10" mb="5">
        <Text
          p="2"
          bg="green.600"
          roundedRight="20"
          fontSize="4xl"
          color="white"
          boxShadow="xl"
          fontWeight="thin"
        >
          Posts & Comments:
        </Text>
      </Flex>
      {localStorage.getItem('key') ?
        <AddPost /> :
        <Flex >
          <Spacer />
          <Text mb="10" bg="whiteAlpha.700" p="2" rounded="5" fontSize="4xl" color="red">
            ***Please log in to add / view posts & comments.***
          </Text>
          <Spacer />
        </Flex>}
      {localStorage.getItem('key') ? <Posts /> : null}
    </Box>
  )
}

export default StockPage
