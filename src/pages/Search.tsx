import { Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { useSearchUser } from "../hooks/useSearchUser";
import { useRef } from "react";
import {SuggestedUser} from "../components/SuggestedUsers/SuggestedUser";

export const Search = () => {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const {isLoading, user, getUserProfile, setUser} = useSearchUser()
  const searchRef = useRef<HTMLInputElement>(null);

  const handleSearchUser = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchRef.current) {
      getUserProfile(searchRef.current.value);
    }
  }

	return (
		<>
			<div onClick={onOpen} style={{ cursor: 'pointer' }}>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
					<path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
				</svg>
			</div>
			<Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInLeft'>
				<ModalOverlay />
				<ModalContent bg={"white"} border={"1px solid gray"} maxW={"400px"}>
					<ModalHeader>Search user</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<form onSubmit={handleSearchUser}>
							<FormControl>
								<FormLabel>Username</FormLabel>
								<Input placeholder='e.g. bilalhabib' ref={searchRef} />
							</FormControl>

							<Flex w={"full"} justifyContent={"flex-end"}>
								<Button type='submit' ml={"auto"} size={"sm"} my={4} isLoading={isLoading}>
									Search
								</Button>
							</Flex>
						</form>
						{user && <SuggestedUser user={user} setUser={setUser} />}
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};