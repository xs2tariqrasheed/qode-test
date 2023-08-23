import {
  Box,
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Image,
  useDisclosure,
  SimpleGrid,
  Flex,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import Loader from "@/components/Loader";
import ImageUpload, { SelectedImageProps } from "@/components/ImageUpload";

import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { getAllImageData, isValidImageUrl } from "@/utils/helper";

interface ImageData {
  id: number;
  imageUrl: string;
  comment: string;
}

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isImageSelected, setIsImageSelected] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] =
    useState<SelectedImageProps | null>();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const imageData = getAllImageData();

  useEffect(() => {
    setLoading(true);
    fetch("/api/get-all-images")
      .then((response) => response.json())
      .then((data) => setImages(data?.images))
      .catch((error) => console.error("Error fetching data:", error))
      .finally(() => setLoading(false));
  }, []);

  const handleModelClose = () => {
    setSelectedImage(null);
    setIsImageSelected(false);
  };

  const handleSave = async () => {
    const imageUrl = selectedImage?.preview;
    const comment = selectedImage?.comment;

    try {
      const res = await fetch("/api/upload-Image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageUrl, comment }),
      });
      const data = await res.json();
      console.log("Post API Response", data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <>
      <Loader isLoading={loading} />;
      {images?.length > 0 && (
        <div style={{ padding: 40 }}>
          <Heading>Image Gallery</Heading>
          <SimpleGrid mt="8" columns={5} spacing={10}>
            <Flex
              onClick={onOpen}
              borderWidth="1px"
              borderRadius="lg"
              p="4"
              boxShadow="md"
              cursor={"pointer"}
              minWidth="max-content"
              alignItems="center"
              justifyContent="center"
            >
              <AddIcon />
            </Flex>
            {images?.map((image) => (
              <Box
                key={image.id}
                borderWidth="1px"
                borderRadius="lg"
                p="4"
                boxShadow="md"
                cursor={"pointer"}
              >
                <Image
                  width={"100%"}
                  objectFit="cover"
                  src={image?.imageUrl}
                  alt={image?.comment}
                />
                <Text mt="2" color="gray.600">
                  {image?.comment}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </div>
      )}
      <Modal
        onOverlayClick={handleModelClose}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={() => {
          handleModelClose();
          onClose();
        }}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Image</ModalHeader>
          <ModalCloseButton />
          {selectedImage?.preview && (
            <Box m="4" position="relative">
              <DeleteIcon
                onClick={handleModelClose}
                height={6}
                width={6}
                color={"red"}
                position="absolute"
                top={0}
                cursor="pointer"
                right={0}
              />
              <Image
                width="100%"
                objectFit="cover"
                src={selectedImage?.preview}
                alt={selectedImage?.comment}
              />
            </Box>
          )}
          <ModalBody pb={6}>
            <ImageUpload
              onSelect={(selected) => {
                setSelectedImage(selected);
                setIsImageSelected(true);
              }}
              isSelected={isImageSelected}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={handleSave}
              isDisabled={loading || !isImageSelected}
              isLoading={loading}
              colorScheme="blue"
              mr={3}
            >
              Save
            </Button>
            <Button
              onClick={() => {
                onClose();
                handleModelClose();
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
