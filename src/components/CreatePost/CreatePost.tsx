import { Image, Button, CloseButton, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useDisclosure } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { BsFillImageFill } from "react-icons/bs";
import { usePreviewImg } from "../../hooks/usePreviewImg";

export const CreatePost = () => {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [caption, setCaption] = useState("")
    const imageRef = useRef<HTMLInputElement>(null)
    const { selectedFile, handleImageChange, setSelectedFile } = usePreviewImg()

	return (
		<>
			<div onClick={onOpen} style={{ cursor: 'pointer' }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
			</div>
            <Modal isOpen={isOpen} onClose={onClose} size='xl'>
				<ModalOverlay />

				<ModalContent bg={"white"} border={"1px solid gray"}>
					<ModalHeader>Create Post</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<Textarea placeholder='Post caption...' 
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                        />

						<Input type='file' hidden ref={imageRef} onChange={handleImageChange}/>

						<BsFillImageFill
                            onClick={() => imageRef.current?.click()}
							style={{ marginTop: "15px", marginLeft: "5px", cursor: "pointer" }}
							size={16}
						/>

                        {selectedFile && (
                        <Flex mt={5} w={"full"} position={"relative"} justifyContent={"center"}>
                            <Image src={selectedFile} alt='Selected img' />
                            <CloseButton
                            position={"absolute"}
                            top={2}
                            right={2}
                            onClick={() => {
                                setSelectedFile(null);
                            }}
                            />
                        </Flex>
                        )}

					</ModalBody>

					<ModalFooter>
						<Button mr={3}>Post</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

