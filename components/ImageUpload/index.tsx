/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { AttachmentIcon } from "@chakra-ui/icons";

export interface SelectedImageProps {
  file: File;
  preview: string;
  comment: string;
}

interface ImageUploadProps {
  onSelect: (data: SelectedImageProps) => void;
  isSelected: boolean;
}
const ImageUpload: React.FC<ImageUploadProps> = ({ onSelect, isSelected }) => {
  const [comment, setComment] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let inputValue = e.target.value;
    setComment(inputValue);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        onSelect({
          file: file,
          preview: reader.result as string,
          comment: comment,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box>
      <FormControl>
        <FormLabel />
        {!isSelected && (
          <>
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              display="none"
              id="image-input"
            />
            <label htmlFor="image-input">
              <Flex
                borderWidth="1px"
                borderRadius="lg"
                p="4"
                boxShadow="md"
                height={200}
                cursor={"pointer"}
                minWidth="max-content"
                alignItems="center"
                justifyContent="center"
              >
                <AttachmentIcon mr="2" /> Upload Image
              </Flex>
            </label>
          </>
        )}
        <Textarea
          mt="4"
          value={comment}
          onChange={handleInputChange}
          placeholder="Write a comment here"
        />
      </FormControl>
    </Box>
  );
};

export default ImageUpload;
