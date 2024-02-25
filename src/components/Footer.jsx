import { Box, Center, Divider, Flex, Square, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <Box
        style={{ backgroundColor: "#1a1a1a" }}
        w="100%"
        px={20}
        py={6}
        color="white"
      >
        Explore the BBC
        <Divider mt={"8px"} />
        <Flex color="white" justify="space-around" wrap={"wrap"} px={4} py={2}>
          <Box w={{ base: "100px", md: "180px" }} mb={2} fontSize={"14px"}>
            <Link to={"/"}>Home</Link>
          </Box>
          <Box w={{ base: "100px", md: "180px" }} mb={2} fontSize={"14px"}>
            <Link to={"/general"}>General</Link>
          </Box>
          <Box w={{ base: "100px", md: "180px" }} mb={2} fontSize={"14px"}>
            <Link to={"/sports"}>Sports</Link>
          </Box>
          <Box w={{ base: "100px", md: "180px" }} mb={2} fontSize={"14px"}>
            <Link to={"/entertainment"}>Entertainment</Link>
          </Box>
          <Box w={{ base: "100px", md: "180px" }} mb={2} fontSize={"14px"}>
            <Link to={"/politics"}>Politics</Link>
          </Box>
          <Box w={{ base: "100px", md: "180px" }} mb={2} fontSize={"14px"}>
            <Link to={"/business"}>Business</Link>
          </Box>
          <Box w={{ base: "100px", md: "180px" }} mb={2} fontSize={"14px"}>
            <Link to={"/health"}>Health</Link>
          </Box>
          <Box w={{ base: "100px", md: "180px" }} mb={2} fontSize={"14px"}>
            <Link to={"/science"}>Science</Link>
          </Box>
          <Box w={{ base: "100px", md: "180px" }} mb={2} fontSize={"14px"}>
            <Link to={"/technology"}>Technology</Link>
          </Box>
          <Box w={{ base: "100px", md: "180px" }} mb={2} fontSize={"14px"}>
            <Link to={"/"}>Culture</Link>
          </Box>
          <Box w={{ base: "100px", md: "180px" }} mb={2} fontSize={"14px"}>
            <Link to={"/health"}>Health</Link>
          </Box>
          <Box w={{ base: "100px", md: "180px" }} mb={2} fontSize={"14px"}>
            <Link to={"/"}>Future</Link>
          </Box>
          <Box w={{ base: "100px", md: "180px" }} mb={2} fontSize={"14px"}>
            <Link to={"/"}>World</Link>
          </Box>
          <Box w={{ base: "100px", md: "180px" }} mb={2} fontSize={"14px"}>
            <Link to={"/"}>Weather</Link>
          </Box>
        </Flex>
        <Divider />
        <Flex color="white" justify="space-around" wrap={"wrap"} px={4} py={2}>
          <Box w={{ base: "50px", md: "100px" }} fontSize={"10px"}>
            About the BBC
          </Box>
          <Link to={"/contact"}>
            <Box w={{ base: "50px", md: "100px" }} fontSize={"10px"}>
              Contact the BBC
            </Box>
          </Link>
          <Box w={{ base: "50px", md: "100px" }} fontSize={"10px"}>
            Terms of Use
          </Box>
          <Box w={{ base: "50px", md: "100px" }} fontSize={"10px"}>
            Privacy Policy
          </Box>
          <Box w={{ base: "50px", md: "100px" }} fontSize={"10px"}>
            Cookies
          </Box>
          <Box w={{ base: "50px", md: "100px" }} fontSize={"10px"}>
            Accessibility Help
          </Box>
          <Box w={{ base: "50px", md: "100px" }} fontSize={"10px"}>
            Parental Guidance
          </Box>
          <Box w={{ base: "50px", md: "100px" }} fontSize={"10px"}>
            BBC emails for you
          </Box>
          <Box w={{ base: "50px", md: "100px" }} fontSize={"10px"}>
            Advertise with us
          </Box>
          <Box w={{ base: "50px", md: "100px" }} fontSize={"10px"}>
            Don&apos;t sell info
          </Box>
        </Flex>
        <Text fontSize={"12px"} color="white" px={4}>
          {" "}
          Copyright © 2024 BBC. The BBC is not responsible for the content of
          external sites. Read about our approach to external linking.
        </Text>
      </Box>
    </>
  );
}
