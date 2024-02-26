import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Box,
  Heading,
  Image,
  Text,
  Button,
  Flex,
  Card,
  CardHeader,
  CardBody,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  useToast,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faThumbsUp, faShare} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp,faInstagram ,faTwitter,faFacebook, faXTwitter} from '@fortawesome/free-brands-svg-icons';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import "../index.css";
import { baseURL } from "../apiRequest";
import Footer from "./Footer";
export default function SingleNewsPage() {
  const { category, id } = useParams();
  const [singleNews, setSingleNews] = useState([]);
  const [comment, setComment] = useState("");
  const toast = useToast();
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [colorLike, setColorLike] = useState("#74C0FC");
  const [colorComment, setColorComment] = useState("lightblue");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const navigate = useNavigate() ;
  const [ loggedInUser, setLoggedInUser ] = useState({}) ;
  ///// userparams
  useEffect(() => {
    let localStorageUser = JSON.parse(localStorage.getItem('user')) || {} ;
    setLoggedInUser(localStorageUser) ;
    axios
      .get(`${baseURL}/${category}/${id}`)
      .then((res) => res.data)
      .then((data) => setSingleNews(data));
   
  }, []);

  const handleInputComment = async (e) => {
    e.preventDefault();
    if( !loggedInUser.id ){
      toast({
        title: "Login First",
        description: "Please Login to Add Comment",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      setTimeout(() => {
        navigate("/login");
      }, 1500);
      
    }else{
      if(comment!=""){
        axios
          .get(`${baseURL}/${category}/${id}`)
          .then((res) => res.data)
          .then((data) => {
            const updateComment = [
              ...data.comments,
              { user: loggedInUser.username, comment: comment },
            ];
            axios
              .patch(`${baseURL}/${category}/${id}`, {
                comments: updateComment,
              })
              .then((response) => {
                // Check if status code is in the range 200-299
                console.log(response);
                if (response.status >= 200 && response.status < 300) {
                  console.log("User comment updated successfully");
                  setSingleNews(response.data);
                } else {
                  throw new Error("Failed to update user bookmark");
                }
              })
              .catch((error) => {
                console.error("Error updating user bookmark:", error);
              });
          })
          .catch((err) => {
            console.error(err);
          });
        setComment("");
        }
    }
  
  
  };
  const handleShare = () => {
    if (selectedIcon) {
      toast({
        title: "Message Sent Successfully",
        description: `Your message has been sent .`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "No Icon Selected",
        description: "Please select an icon before sharing.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    }
    onClose();
  };
  const handleIconClick = (icon) => {
    setSelectedIcon(icon === selectedIcon ? null : icon);
  };
  function splitContentIntoParts(content, numParts) {
    const words = content.split(" ");
    const wordsPerPart = Math.ceil(words.length / numParts);
    const parts = [];

    for (let i = 0; i < numParts; i++) {
      const start = i * wordsPerPart;
      const end = (i + 1) * wordsPerPart;
      let part = words.slice(start, end).join(" ");

      // Ensure the line ends with a dot
      if (!part.trim().endsWith(".")) {
        part += ",";
      }

      parts.push(part);
    }

    return parts;
  }
  const handleLike = () => {
    setColorLike((prev) => (prev === "blue" ? "#74C0FC" : "blue"));
  };
  const handleComment = () => {
    setColorComment((prev) => (prev === "blue" ? "lightblue" : "blue"));
  };

  return (
    <>
      <Navbar />
      <Card borderRadius="md" height={"auto"} marginTop={"12px"}>
        <Flex direction="column" m="auto" >
          <CardHeader boxShadow={" rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;"}>
            <Heading as="h2" size="md" mb="2" color={"blue"}>
              {singleNews.title}
            </Heading>
            <Text>{singleNews.description}</Text>
          </CardHeader>
          <CardBody>
            <Flex flexDirection={"column"}>
              <Text
                fontSize={"large"}
                fontWeight={"500"}
                borderLeft={"3px solid red"}
                paddingLeft={"5px"}
                marginBottom={"5px"}
              >
                {singleNews.author ? singleNews.author : "pavan"} ---BBCNEWS
              </Text>
              <Image
                src={singleNews.urlToImage}
                alt="News Image"
                borderRadius="md"
                objectFit="cover"
                w={"70%"}
                h={"50%"}
                margin={"auto"}
              />
              <Text fontFamily={"serif"}>
                {singleNews.content && (
                  <>
                    {splitContentIntoParts(singleNews.content, 3).map(
                      (part, index) => (
                        <Text key={index} padding={"3px"}>
                          {part.trim().endsWith(",")
                            ? part.trim()
                            : part.trim() + "."}{" "}
                        </Text>
                      )
                    )}
                  </>
                )}
              </Text>
            </Flex>
          </CardBody>

          <Flex align="center" mt="4" gap={'16px'} marginBottom={'200px'} justify={'center'}>
            <Button
              flex="1"
             
              backgroundColor={"white"}
              _hover={"backgroundColor:none"}
              onClick={handleLike}
              border={'1px solid'}
            >
              <FontAwesomeIcon
                icon={faThumbsUp}
                size="2xl"
                style={{color: colorLike }}
                
              />
            </Button>
            <Popover>
              <PopoverTrigger>
                <Button
                  flex="1"
                  backgroundColor={"white"}
                  _hover={"backgroundColor:none"}
                  border={'1px solid'}
                >
                  <FontAwesomeIcon
                    icon={faComment}
                    size="2xl"
                    style={{ color: "#74C0FC",}}
                 
                  />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                width={"90vw"}
                backgroundColor={"white"}
                color="black"
                fontFamily={'serif'}
                border={'1px solid'}
              >
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Comments</PopoverHeader>
                <PopoverBody>
                  {singleNews && singleNews.comments ? (
                    singleNews.comments.map((obj) => (
                      <Box key={obj.id}>
                        <Text fontSize="md">{obj.user}</Text>
                        <Text>{obj.comment}</Text>
                      </Box>
                    ))
                  ) : (
                    <Text>No comments </Text>
                  )}
                  <InputGroup size="md" >
                    <Input
                      pr="4.5rem"
                      type="text"
                      border={'1px solid black'}
                      placeholder="Enter comment.."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      
                    />
                    <InputRightElement width="4.5rem">
                      <Button
                        h="1.75rem"
                        size="sm"
                        backgroundColor={'rgba(0,220,225)'}
                        onClick={handleInputComment}
                      >
                        Add
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </PopoverBody>
              </PopoverContent>
            </Popover>
            <Button flex="1" onClick={onOpen}  backgroundColor={"white"}
                  _hover={"backgroundColor:none"} border={'1px solid'}>
            <FontAwesomeIcon icon={faShare} style={{color: "#74C0FC",}} size="2xl"/>
            </Button>
            <AlertDialog
              motionPreset="slideInBottom"
              leastDestructiveRef={cancelRef}
              onClose={onClose}
              isOpen={isOpen}
              isCentered
             
            >
              <AlertDialogOverlay  />

              <AlertDialogContent height={'50vh'} >
                <AlertDialogHeader>Share</AlertDialogHeader>
                <AlertDialogCloseButton />
                <AlertDialogBody>
                <div style={{ display: 'flex', justifyContent: 'space-around', height:'30px' }}>
              <FontAwesomeIcon
                icon={faInstagram}
                style={{
                  color: selectedIcon === faInstagram ? "#8A2BE2" : "#000",
                  fontSize: selectedIcon === faInstagram ? "40px" : "30px",
                  transform: selectedIcon === faInstagram ? "scale(1.2)" : "none",
                  transition: "all 0.3s ease-in-out"
                }}
                onClick={() => handleIconClick(faInstagram)}
              />
              <FontAwesomeIcon
                icon={faWhatsapp}
                style={{
                  color: selectedIcon === faWhatsapp ? "rgb(7, 94, 84)" : "#000",
                  fontSize: selectedIcon === faWhatsapp ? "40px" : "30px",
                  transform: selectedIcon === faWhatsapp ? "scale(1.2)" : "none",
                  transition: "all 0.3s ease-in-out"
                }}
                onClick={() => handleIconClick(faWhatsapp)}
              />
             
              <FontAwesomeIcon
                icon={faXTwitter}
                style={{
                  color: selectedIcon === faTwitter ? "#000" : "#000",
                  fontSize: selectedIcon === faTwitter ? "40px" : "30px",
                  transform: selectedIcon === faTwitter ? "scale(1.2)" : "none",
                  transition: "all 0.3s ease-in-out"
                }}
                onClick={() => handleIconClick(faTwitter)}
              />
              <FontAwesomeIcon
                icon={faFacebook}
                style={{
                  color: selectedIcon === faFacebook ? "#316FF6" : "#000",
                  fontSize: selectedIcon === faFacebook ? "40px" : "30px",
                  transform: selectedIcon === faFacebook ? "scale(1.2)" : "none",
                  transition: "all 0.3s ease-in-out"
                }}
                onClick={() => handleIconClick(faFacebook)}
              />
            </div>
                <Button onClick={handleShare} mt={4} >Share</Button>
                  
                </AlertDialogBody>
                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onClose}>
                    No
                  </Button>
                 
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </Flex>
        </Flex>
      </Card>
  <Footer/>

    </>
  );
}
