import { useToast } from '@chakra-ui/react'
import { useCallback } from 'react'

export const useShowToast = () => {
    const toast = useToast()

    // useCallback is used to prevent infinite loop, by  caching the function
	const showToast = useCallback(
		(title: string, description: string, status: "info" | "warning" | "success" | "error" | "loading" | undefined) => {
			toast({
				title: title,
				description: description,
				status: status,
				duration: 3000,
				isClosable: true,
			});
		},
		[toast]
	);

    return showToast
}
