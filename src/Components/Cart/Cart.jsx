import React from "react";
import "./Cart.css";
import { useState, useContext } from "react";
import { DataContext } from "./../../GlobalContext";
import { Container, Col, Button, Card, ListGroup } from "react-bootstrap";

function Cart() {
    const D = useContext(DataContext);

    // <p>{D.dataShoppingCart[0]}</p>;

    /**
     * metoda handleKlik
     */
    const handleKlik = () => {
        console.log("Vstup -> handleKlik");
        console.log(D.dataShoppingCart);
    };

    // <p>{props.dataShoppingCart[0]}</p>;

    // <Button onClick={handleKlik}>Klikni</Button>
    return (
        <>
            {!isNaN(D.dataShoppingCart) && (
                <Container>
                    <Col>
                        <h1>Košík je prázdný</h1>
                        <Button onClick={handleKlik}>Klikni</Button>
                    </Col>
                </Container>
            )}

            {isNaN(D.dataShoppingCart) && (
                <Col className='mt-3'>
                    {Array.from(D.dataShoppingCart.entries()).map(
                        ([id, countProducts]) => {
                            let product = D.dataProduct?.find(
                                (x) => x.id === id
                            );
                            return (
                                <Card key={id} className='w-100 m-1 p-1'>
                                    <Card.Body>
                                        <Col md={12} className='d-flex w-100 '>
                                            <Col md={2} className='p-1'>
                                                <Card.Img
                                                    variant='left'
                                                    className='object-fit card-img '
                                                    src={
                                                        "./image/products/" +
                                                        product?.img
                                                    }
                                                />
                                            </Col>
                                            <Col
                                                md={5}
                                                className='d p-1 ps-3 pt-3'>
                                                <Card.Title>
                                                    {product?.name}
                                                </Card.Title>
                                                <Card.Text>
                                                    {product?.desc}
                                                </Card.Text>
                                            </Col>
                                            <Col
                                                md={5}
                                                className='d p-1 ps-3 pt-3'>
                                                <Card.Text>
                                                    <p className='c m-0 d-flex justify-content-end'>{`${Number(
                                                        product?.price
                                                    ).toFixed(2)} Kč`}</p>
                                                    <p className='c m-0 d-flex justify-content-end'>
                                                        {`${countProducts} ks/bal   ${Number(
                                                            product?.price *
                                                                countProducts
                                                        ).toFixed(2)} Kč`}
                                                    </p>
                                                </Card.Text>
                                            </Col>
                                        </Col>
                                    </Card.Body>
                                </Card>
                            );
                        }
                    )}
                </Col>
            )}
        </>
    );
}

export default Cart;

// isNaN(D.dataShoppingCart) &&
// D.dataShoppingCart.map((i) => {
//     const [PricePart1, PricePart2] = Number(i.price)
//         .toFixed(2)
//         .split(".");
//     return (
//         <Container>
//             <Col>
//                 <h1>Košík je prázdný</h1>
//             </Col>
//         </Container>
//     );
// })
