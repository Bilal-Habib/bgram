import { useToast } from '@chakra-ui/react'
import React from 'react'

export const useShowToast = () => {
    const toast = useToast()

    const showToast = (title: string, description: string, status: "info" | "warning" | "success" | "error" | "loading" | undefined) => {
        toast({
            title: title,
            description: description,
            status: status,
            duration: 3000,
            isClosable: true,
        })
    }

    return showToast
}
