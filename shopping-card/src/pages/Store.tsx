import { Col, Row } from "react-bootstrap"
import storeItems from "../data/item.json"
import { StoreItem } from "../components/StoreItem"

export function Store() {
  return (
    <>
      <Row md={2} xs={1} lg={3} className="g-3">
        {storeItems.map(item => {
          return <Col key={item.id}>
            <StoreItem  {...item} />
          </Col>
        })}
      </Row>

    </>
  )
}
