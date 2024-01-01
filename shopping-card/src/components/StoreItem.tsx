import { Button, Card } from 'react-bootstrap'
import { useShoppingCard } from '../context/ShoppingCardContex'
import { formatCurrency } from '../utils/formatCurrency'

type StoreItemProps = {
    id: number,
    name: string,
    price: number,
    imgUrl: string,
}

export function StoreItem({ id, name, price, imgUrl }: StoreItemProps) {
    const {
        getItemQuantity,
        increaseCardQuantity,
        decreaseCardQuantity,
        removeFromCard
    } = useShoppingCard();

    const quantity = getItemQuantity(id);
    console.log(quantity);
    
    return (
        <>
            <Card className='h-100'>
                <Card.Img
                    variant='top'
                    src={imgUrl}
                    height={200}
                    style={{ objectFit: "cover" }}
                />
                <Card.Body>
                    <Card.Title className='d-flex justify-content-between align-items-baseline'>
                        <span className='fs-2'>{name}</span>
                        <span className='ms-2 text-muted'>{formatCurrency(price)}</span>
                    </Card.Title>
                    <div className='mt-auto'>
                        {
                            quantity === 0
                                ? (
                                    <Button
                                        className='w-100'
                                        onClick={() => increaseCardQuantity(id)}
                                    >+ Add to card</Button>
                                )
                                : <div
                                    className='d-flex align-items-center flex-column'
                                    style={{ gap: ".5rem" }}>
                                    <div
                                        className='d-flex align-items-center justify-content-center'
                                        style={{ gap: ".5rem" }}>

                                        <Button onClick={() => decreaseCardQuantity(id)}>-</Button>

                                        <span className='fs-3'>
                                            {quantity} in card
                                        </span>

                                        <Button onClick={() => increaseCardQuantity(id)}> +</Button>

                                    </div>
                                    <Button variant='danger' size='sm' onClick={() => removeFromCard(id)}>Remove</Button>

                                </div>
                        }
                    </div>
                </Card.Body>
            </Card >
        </>
    )
}
