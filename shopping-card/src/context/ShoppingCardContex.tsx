import { ReactNode, createContext, useContext, useState } from "react";
import { ShoppingCard } from "../components/ShoppingCard";
import { useLocalStorage } from "../hooks/useLocalStorage";



type ShoppingCardProvider = {
    children: ReactNode
}

type ShoppingCardContext = {
    getItemQuantity: (id: number) => number,
    increaseCardQuantity: (id: number) => void,
    decreaseCardQuantity: (id: number) => void,
    removeFromCard: (id: number) => void,
    openCard: () => void,
    closeCard: () => void,
    cardQuantity: number,
    cardItems: CardItem[]
}

type CardItem = {
    id: number
    quantity: number
}

const ShoppingCardContext = createContext({} as ShoppingCardContext);
// eslint-disable-next-line react-refresh/only-export-components
export function useShoppingCard() {
    return useContext(ShoppingCardContext)
}


export function ShoppingCardProvider({ children }: ShoppingCardProvider) {

    const [cardItems, setCardItems] = useLocalStorage<CardItem[]>("shopping-card", [])

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const cardQuantity = cardItems.reduce((quantity, item) => item.quantity + quantity, 0)


    const openCard = () => setIsOpen(true)
    const closeCard = () => setIsOpen(false)

    //get
    function getItemQuantity(id: number) {
        return cardItems.find(item => item.id === id)?.quantity || 0
    }

    //++
    function increaseCardQuantity(id: number) {
        setCardItems(currItems => {
            if (currItems.find(item => item.id === id) == null) {
                return [...currItems, { id, quantity: 1 }]
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }

    //--
    function decreaseCardQuantity(id: number) {
        setCardItems(currItems => {
            if (currItems.find(item => item.id === id)?.quantity === 1) {
                return currItems.filter(item => item.id !== id)
            } else {
                return cardItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 }
                    } else {
                        return item
                    }
                })
            }

        })
    }

    //remove
    function removeFromCard(id: number) {
        setCardItems(currItems => {
            return currItems.filter(item => item.id !== id)
        })
    }



    return <ShoppingCardContext.Provider value={{
        getItemQuantity,
        increaseCardQuantity,
        decreaseCardQuantity,
        removeFromCard,
        cardItems,
        cardQuantity,
        openCard,
        closeCard
    }}>
        {children}
        <ShoppingCard isOpen={isOpen} />
    </ShoppingCardContext.Provider>
}
