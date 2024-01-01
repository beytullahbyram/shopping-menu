import { Offcanvas, Stack } from 'react-bootstrap'
import { useShoppingCard } from '../context/ShoppingCardContex'
import storeItems from "../data/item.json"
import { formatCurrency } from '../utils/formatCurrency'
import { CardItem } from './CardItem'
type ShoppingCardProps = {
    isOpen: boolean
}

export function ShoppingCard({ isOpen }: ShoppingCardProps) {
    const { closeCard, cardItems } = useShoppingCard();
    return (
        <Offcanvas show={isOpen} placement='end' onHide={closeCard}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Card</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3}>
                    {cardItems.map(item => (
                        <CardItem key={item.id} {...item} />
                    ))}
                    <div className="ms-auto fw-bold fs-5">
                        Total{" "}
                        {formatCurrency(
                            cardItems.reduce((total, cartItem) => {
                                const item = storeItems.find(i => i.id === cartItem.id)
                                return total + (item?.price || 0) * cartItem.quantity
                            }, 0)
                        )}
                    </div>
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    )
}
