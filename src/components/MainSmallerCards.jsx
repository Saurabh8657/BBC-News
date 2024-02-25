import { GridItem, Text } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function MainSmallerCards({item}) {
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate(`/${item.category_section}/${item.id}`);
  };
  return (<>
    <GridItem
        rowSpan={1} colSpan={1}
        overflow="hidden"
        cursor={"pointer"}
        borderRadius={"5px"}
        backgroundImage={`url(${item.urlToImage})`}
        backgroundSize="cover"
        backgroundPosition="center"
        onClick={handleNavigation}
    >
        <Text position={"relative"} top={"60%"} noOfLines={3} maxW="calc(100% - 40px)" p={"10px"} color={"white"} fontWeight={"bold"} fontSize={["12px", "16px", "18px"]} > 
          {item.title}
        </Text>
    </GridItem>
  </>
  )
}
