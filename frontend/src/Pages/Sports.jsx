import {
  Heading,
  Text,
  SimpleGrid,
  Box,
  Grid,
  GridItem,
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CardComponent from "../components/CardComponent";
import { sportsURL } from "../apiRequest";
import Footer from "../components/Footer";
import MainSmallerCards from "../components/MainSmallerCards";
import { useSelector } from "react-redux";

export default function Sports() {
  const [firstTopNews, setFirstTopNews] = useState({});
  const [otherTopNews, setOtherTopNews] = useState([]);
  const [cricket, setCricket] = useState([]);
  const [football, setFootball] = useState([]);
  const [basketball, setBasketball] = useState([]);
  const [extraSports, setExtraSports] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const search = useSelector(state=>state.search)

  const fetchrenderData = async () => {
    setLoading(true);
    try {
      let res = await fetch(`${sportsURL}`);
      let data = await res.json();
      console.log(data);
      const mainSectionDataArr = data.filter((item)=>{ return search.toLowerCase()==="" ? item : item.title.toLowerCase().includes(search) }).filter((item) =>
        item.category === "top-news" ? true : false
      );
      setFirstTopNews(mainSectionDataArr[0]);
      setOtherTopNews(mainSectionDataArr.slice(1, 5));
      setCricket(
        data.filter((item)=>{ return search.toLowerCase()==="" ? item : item.title.toLowerCase().includes(search) }).filter((item) => (item.category === "cricket" ? true : false))
      );
      setFootball(
        data.filter((item)=>{ return search.toLowerCase()==="" ? item : item.title.toLowerCase().includes(search) }).filter((item) => (item.category === "football" ? true : false))
      );
      setBasketball(
        data.filter((item)=>{ return search.toLowerCase()==="" ? item : item.title.toLowerCase().includes(search) }).filter((item) => (item.category === "basketball" ? true : false))
      );
      setExtraSports(
        data.filter((item)=>{ return search.toLowerCase()==="" ? item : item.title.toLowerCase().includes(search) }).filter((item) => (item.category === "extra-sports" ? true : false))
      );
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    fetchrenderData();
  }, [search]);

  return (
    <>
      <Navbar />
      {loading ? (
        <Heading>Loading...</Heading>
      ) : error ? (
        <Heading>Error...</Heading>
      ) : (
        <>
          { firstTopNews && otherTopNews && <Heading
            as="h1"
            size="xl"
            ml={["10px", "50px", "100px"]}
            textDecoration="underline"
          >
            Morning Headlines
          </Heading>}
          { firstTopNews && otherTopNews && <Grid
            h={["auto", "auto", "400px"]}
            templateRows={[
              "repeat(2, 1fr)",
              "repeat(2, 1fr)",
              "repeat(2, 1fr)",
            ]} // Adjusting row count for responsiveness
            templateColumns={[
              "repeat(1, 1fr)",
              "repeat(2, 1fr)",
              "repeat(4, 1fr)",
            ]} // Adjusting column count for responsiveness
            gap={4}
            px={["10px", "50px", "100px"]}
            py={["10px", "20px", "30px"]}
          >
            <GridItem
              rowSpan={[1, 1, 2]}
              colSpan={[1, 1, 2]}
              overflow="hidden"
              cursor={"pointer"}
              borderRadius={"10px"}
              backgroundImage={`url(${firstTopNews.urlToImage})`}
              // backgroundImage={"url(https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg)"}
              backgroundSize="cover"
              backgroundPosition="center"
            >
              <Text
                position={"relative"}
                top={"70%"}
                noOfLines={3}
                maxW="calc(100% - 40px)"
                p={"10px"}
                color={"white"}
                fontWeight={"bold"}
                fontSize={["16px", "20px", "28px"]}
              >
                {firstTopNews?.title}
              </Text>
            </GridItem>

            {otherTopNews?.map((item, index) => {
              return <MainSmallerCards item={item} key={index} />;
            })}
          </Grid>}

          <Box as="section" py="5" bg="gray.100">
            <Heading
              as="h1"
              size="xl"
              ml={["10px", "50px", "100px"]}
              mb="5"
              textDecoration="underline"
            >
              Cricket
            </Heading>
            <SimpleGrid
              columns={[1, 2, 4]}
              spacing="20px"
              px={["10px", "50px", "100px"]}
            >
              {cricket?.map((newsItem, index) => {
                return <CardComponent newsItem={newsItem} key={index} />;
              })}
            </SimpleGrid>
          </Box>

          <Box as="section" py="5" bg="gray.100">
            <Heading
              as="h1"
              size="xl"
              ml={["10px", "50px", "100px"]}
              mb="5"
              textDecoration="underline"
            >
              Football
            </Heading>
            <SimpleGrid
              columns={[1, 2, 4]}
              spacing="20px"
              px={["10px", "50px", "100px"]}
            >
              {football?.map((newsItem, index) => {
                return <CardComponent newsItem={newsItem} key={index} />;
              })}
            </SimpleGrid>
          </Box>

          <Box as="section" py="5" bg="gray.100">
            <Heading
              as="h1"
              size="xl"
              ml={["10px", "50px", "100px"]}
              mb="5"
              textDecoration="underline"
            >
              Basketball
            </Heading>
            <SimpleGrid
              columns={[1, 2, 4]}
              spacing="20px"
              px={["10px", "50px", "100px"]}
            >
              {basketball?.map((newsItem, index) => {
                return <CardComponent newsItem={newsItem} key={index} />;
              })}
            </SimpleGrid>
          </Box>

          <Box as="section" py="5" bg="gray.100">
            <Heading
              as="h1"
              size="xl"
              ml={["10px", "50px", "100px"]}
              mb="5"
              textDecoration="underline"
            >
              Extra Sports
            </Heading>

            <SimpleGrid
              columns={[1, 2, 4]}
              spacing="20px"
              px={["10px", "50px", "100px"]}
            >
              {extraSports?.map((newsItem, index) => {
                return <CardComponent newsItem={newsItem} key={index} />;
              })}
            </SimpleGrid>
          </Box>
        </>
      )}
      <Footer />
    </>
  );
}
