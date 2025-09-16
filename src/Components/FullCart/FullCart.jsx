import React from "react";
import "./FullCart.css";
import {useState, useContext} from "react";
import {DataContext} from "../../GlobalContext";
import {Container, Col, Button, Card, ListGroup} from "react-bootstrap";
import {FiPlusSquare, FiMinusSquare} from "react-icons/fi";
import {CiSquareRemove} from "react-icons/ci";
import {MdOutlineRemoveShoppingCart} from "react-icons/md";
function FullCart() {
    const D = useContext(DataContext);

    /**
     * metoda handleKlik
     */

    const calculate = (productPrice, countProducts) => {
        if (!D.dataCurrencyRates) return;
        let rat = D.dataCurrencyRates[D.selectedCurrency || 0];
        let result = (productPrice * countProducts) / (rat?.rate / rat?.amount);
        return `${Number(result).toFixed(2)} ${rat.currencyCode}`;
    };

    const removeProduct = (id) => {
        let tmp = new Map(D.dataShoppingCart);
        tmp.delete(id);
        D.setDataShoppingCart(tmp);
    };

    // const increaseProduct = (id) => {
    //     let tmp = new Map(D.dataShoppingCart);
    //     let volume = tmp.get(id);
    //     volume++;
    //     tmp.set(id, volume);
    //     D.setDataShoppingCart(tmp);
    // };

    const increaseProduct = (id) => {
        D.setDataShoppingCart((prev) => {
            const tmp = new Map(prev); // kopie předchozí mapy
            let volume = tmp.get(id) ?? 0; // pokud tam není, tak začni od 0
            tmp.set(id, volume + 1);
            return tmp;
        });
    };

    const decreaseProduct = (id) => {
        let tmp = new Map(D.dataShoppingCart);
        let volume = tmp.get(id);
        volume = volume > 0 ? --volume : 0;
        tmp.set(id, volume);
        D.setDataShoppingCart(tmp);
    };

    return (
        <>
            {!isNaN(D.dataShoppingCart) && (
                <Container>
                    <Col>
                        <h1>Košík je prázdný</h1>
                    </Col>
                </Container>
            )}

            {isNaN(D.dataShoppingCart) && (
                <Col className=''>
                    {Array.from(D.dataShoppingCart.entries()).map(([id, countProducts]) => {
                        let product = D.dataProduct?.find((x) => x.id === id);
                        return (
                            <Card key={id} className='w-100 m-1 p-1'>
                                <Card.Body>
                                    <Col md={12} className='d-flex w-100 '>
                                        <Col md={2} className='p-1'>
                                            <Card.Img
                                                variant='left'
                                                className='object-fit card-img '
                                                src={"./image/products/" + product?.img}
                                            />
                                        </Col>
                                        <Col md={5} className='p-1 ps-3 pt-3'>
                                            <Card.Title>{product?.name}</Card.Title>
                                            <Card.Text>{product?.desc}</Card.Text>
                                        </Col>
                                        <Col md={4} className='p-1 ps-3 pt-3'>
                                            <Card.Text className='m-0 d-flex justify-content-end'>
                                                {`${Number(product?.price).toFixed(2)} Kč`}
                                            </Card.Text>
                                            <Card.Text className='m-0 d-flex justify-content-end'>
                                                {`${countProducts} ks/bal   ${Number(
                                                    product?.price * countProducts
                                                ).toFixed(2)} Kč`}
                                            </Card.Text>
                                            <Card.Text className='m-0 d-flex justify-content-end'>
                                                {calculate(product?.price, countProducts)}
                                            </Card.Text>
                                        </Col>
                                        <Col md={1} className='d-flex flex-column'>
                                            <Card.Text className='m-0 p-0 d-flex align-content-center justify-content-center flex-wrap icon-plus w-100 h-100'>
                                                <FiPlusSquare className='p-0 m-0' onClick={() => increaseProduct(id)} />
                                            </Card.Text>
                                            <Card.Text className='m-0 d-flex align-content-center justify-content-center flex-wrap icon-minus w-100 h-100'>
                                                <FiMinusSquare
                                                    className='p-0 m-0 fw-5'
                                                    onClick={() => decreaseProduct(id)}
                                                />
                                            </Card.Text>
                                            <Card.Text className='m-0 d-flex align-content-center justify-content-center flex-wrap icon-remove w-100 h-100'>
                                                <MdOutlineRemoveShoppingCart
                                                    className='p-0 m-0 '
                                                    onClick={() => removeProduct(id)}
                                                />
                                            </Card.Text>
                                        </Col>
                                    </Col>
                                </Card.Body>
                            </Card>
                        );
                    })}
                </Col>
            )}
        </>
    );
}

export default FullCart;
