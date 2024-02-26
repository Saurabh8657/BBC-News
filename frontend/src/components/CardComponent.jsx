import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { addNewsToBookmark, dashBoardURL } from "../apiRequest";

export default function CardComponent({newsItem}) {
  const bookmark  = useSelector( state => state.bookmark ) ;
  const [bookMarkData,setBookmarkData]=useState([]);
  const isAuth=useSelector(state=>state.login.isAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleNavigation = () => {
    navigate(`/${newsItem.category_section}/${newsItem.id}`);
  };

  const handleAddBookMark = async() => {
    
    let user=JSON.parse(localStorage.getItem('user')) ;
      const response= await axios.get(`https://bcc-news-backend.onrender.com/dashboard/${user.id}`)
      const addbookmark=response.data.bookmark
     
      console.log(response.data);
   
    if(isAuth){
      dispatch({type:"ADD_TO_BOOKMARK",payload:newsItem}) ;
    
      if (addbookmark?.some(item => item.id === newsItem.id && item.category_section === newsItem.category_section)) {
        alert("Already bookmarked")
      } else{
        // user.bookmark = [...user.bookmark,newsItem] ;
        // localStorage.setItem('user', JSON.stringify(user)) ;
        
        addNewsToBookmark([...addbookmark,newsItem],user.id) ;
        console.log([...addbookmark,newsItem])
      }
      
    }else{
      navigate("/login");
    }
  }
 
  return (
    <>
      <Box
        key={newsItem.id}
        bg="white"
        shadow="md"
        borderRadius="md"
        overflow="hidden"
        borderBottom={"2px solid blue"}
        cursor={"pointer"}
      >
        <Image
          src={newsItem.urlToImage}
          alt={newsItem.title}
          objectFit="cover"
          width="100%"
          height="200px"
          onClick={handleNavigation}
        />
        <Box p="6" onClick={handleNavigation}>
          <Box height={'120px'}>
          <Heading as="h3" size="md" mb="2" noOfLines={2}>
            {newsItem.title}
          </Heading>
          <Text fontSize="sm" color="gray.600" noOfLines={3}>
            {newsItem.description}
          </Text>
          </Box>
        </Box>
        <Button bgColor={'rgba(0,0,0,0.8)'} color={"white"} size={"sm"} position={"relative"} left={"60%"} top={"-10px"} _hover={{transform: "scale(1.05)"}} onClick={handleAddBookMark}>
          Book Mark
        </Button>
      </Box>
    </>
  );
}
