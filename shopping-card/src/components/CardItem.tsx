import { Button, Stack } from "react-bootstrap";
import { useShoppingCard } from "../context/ShoppingCardContex"
import storeItems from "../data/item.json"
import { formatCurrency } from "../utils/formatCurrency";
type CardItemProps = {
    id: number,
    quantity: number
}
export function CardItem({ id, quantity }: CardItemProps) {
    const { removeFromCard } = useShoppingCard();
    const item = storeItems.find(item => item.id === id)
    if (item == null) return null



    return (
        <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
            <img src={item.imgUrl} style={{ width: 125, height: 75, objectFit: "cover" }} />
            <div className="me-auto">
                <div>
                    {item.name}{" "}
                    {quantity > 1 && (
                        <span className="text-muted" style={{ fontSize: ".65rem" }}>
                            x{quantity}
                        </span>

                    )}
                </div>
                <div className="text-muted" style={{ fontSize: ".75rem" }}>
                    {formatCurrency(item.price)}
                </div>
            </div>
            <div>
                {formatCurrency(item.price * quantity)}
            </div>
            <Button
                variant="outline-danger" size="sm" onClick={() => removeFromCard(item.id)}>&times;</Button>
        </Stack>
    )
}
