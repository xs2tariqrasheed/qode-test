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
  Spinner,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import ImageForm, { SelectedImageProps } from "@/components/ImageForm";

import { AddIcon } from "@chakra-ui/icons";

interface ImageData {
  id: number;
  comment: string;
}

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] =
    useState<SelectedImageProps | null>();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const fetchData = async () => {
    try {
      setLoading(false);
      const response = await fetch("/api/images");
      const data = await response.json();
      setImages(data?.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [images]);

  const handleModelClose = () => {
    setSelectedImage(null);
    onClose();
  };

  const handleSave = async () => {
    setSubmitting(true);
    const data = {
      id: selectedImage?.preview, // as base64 image url
      comment: selectedImage?.comment,
    };

    try {
      await fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify(data),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      });
    } catch (error) {
      console.error("Error uploading image:", error);
    }
    await fetchData();
    setSubmitting(false);
    handleModelClose();
  };

  return (
    <>
      {images?.length > 0 ? (
        <div style={{ padding: 40 }}>
          <Heading>Images</Heading>
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
              >
                <Image
                  width={"100%"}
                  objectFit="cover"
                  src={`${image?.id}`}
                  alt="Image"
                />
                <Text mt="2" color="gray.600">
                  {image?.comment}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </div>
      ) : (
        <SimpleGrid mt="8" columns={5} spacing={10}>
          <Flex
            onClick={onOpen}
            borderWidth="1px"
            borderRadius="lg"
            m="4"
            height={320}
            boxShadow="md"
            cursor={"pointer"}
            minWidth="max-content"
            alignItems="center"
            justifyContent="center"
          >
            <AddIcon />
          </Flex>
        </SimpleGrid>
      )}
      <Modal
        onOverlayClick={handleModelClose}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={handleModelClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Form</ModalHeader>
          <ModalCloseButton />
          {(!selectedImage?.file || !selectedImage.comment) && (
            <Alert status="warning">
              Please select an image and input the comment.
            </Alert>
          )}
          {selectedImage?.preview && (
            <Box m="4" position="relative">
              <Image
                width="100%"
                objectFit="cover"
                src={selectedImage?.preview}
                alt={selectedImage?.comment || ""}
              />
            </Box>
          )}
          <ModalBody pb={6}>
            <ImageForm
              onSelect={(selected: SelectedImageProps | null) => {
                setSelectedImage(selected);
              }}
              selectedImage={
                selectedImage || { file: null, preview: null, comment: null }
              }
            />
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={handleSave}
              isDisabled={
                loading || !selectedImage?.preview || !selectedImage.comment
              }
              isLoading={loading}
              colorScheme="blue"
              mr={3}
            >
              {submitting ? <Spinner size="sm" /> : "Save"}
            </Button>
            <Button onClick={handleModelClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
