import React from "react";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { AttachmentIcon } from "@chakra-ui/icons";

export interface SelectedImageProps {
  file: File | null;
  preview: string | null;
  comment: string | null;
}

interface ImageFormProps {
  onSelect: (data: SelectedImageProps) => void;
  selectedImage: SelectedImageProps;
}
const ImageForm: React.FC<ImageFormProps> = ({ onSelect, selectedImage }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onSelect({
      ...selectedImage,
      comment: e.target.value,
    });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Url = e.target?.result as string;
        onSelect({
          ...selectedImage,
          file: file,
          preview: base64Url,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box>
      <FormControl>
        <FormLabel />
        {!selectedImage?.file && (
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
          onChange={handleInputChange}
          placeholder="Write a comment here"
        />
      </FormControl>
    </Box>
  );
};

export default ImageForm;
