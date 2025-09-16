import React from "react";

import { useState, useContext } from "react";
import { DataContext } from "./../../GlobalContext";

import "./SelectGoods.css";
import { Container, Row, Col, Button, Card, Form } from "react-bootstrap";

function SelectGoods() {
    const D = useContext(DataContext);

    const [countProducts, setCountProducts] = useState({});

    /**
     * metoda handleSetCount
     */
    const handleSetCount = (e) => {
        console.log("Vstup -> handleSetCount");

        const [val, name, id] = [e.target.value, e.target.name, e.target.id];
        let tmp = { ...countProducts, [id]: val };

        console.log("countProducts");
        console.log(tmp);
        setCountProducts(tmp);
    };

    return (
        isNaN(D.dataProduct) &&
        D.dataProduct.map((i) => {
            const [PricePart1, PricePart2] = Number(i.price)
                .toFixed(2)
                .split(".");
            return (
                <Card
                    style={{ width: "18rem", height: "30rem" }}
                    key={i.id}
                    className='m-2 color-white color-text card-shadow '>
                    <Col md='12' className='d-flex w-100 h-50 p-3'>
                        <Card.Img
                            variant='top'
                            className='m-auto'
                            src={"./image/products/" + i.img}
                        />
                    </Col>
                    <Card.Body
                        as={Col}
                        md='12'
                        className='h-50 d-flex align-items-stretch flex-column m-0 p-0'>
                        <Card.Title className='d-flex justify-content-center fw-bold text-wrap font5'>
                            {i.name}
                        </Card.Title>

                        <Card.Text className='font2'>{i.desc}</Card.Text>

                        <h3 className='mt-auto font3'>
                            {PricePart1}
                            <small className='decimal-part'>
                                .{PricePart2}
                            </small>
                            <span className='currency'> Kč</span>
                        </h3>
                    </Card.Body>

                    <Card.Footer className='d-flex h-25 e m-0 pb-2 border1 color-white '>
                        <Col
                            md='4'
                            className='d-flex align-items-center flex-column '>
                            <small className='font1 text-center text-dark'>
                                Počet ks.
                            </small>
                            <Form.Control
                                className='text-center h-100 color-white border-1 m-1 font4'
                                type='number'
                                min={0}
                                max={100}
                                name='countProduct'
                                id={i.id}
                                onChange={handleSetCount}
                                value={countProducts[i.id] || ""}
                                //required
                                //pattern={PLAIN_TEXT_REGEX.source}
                                placeholder='0'
                            />
                        </Col>
                        <Col md='8' className=' '>
                            <Button
                                variant=''
                                className='ms-5 mt-4 but-add card-shadow'
                                onClick={() =>
                                    D.addToCart(i, countProducts[i.id])
                                }>
                                {/* d-flex align-items-center
                                    justify-content-center  */}
                                Do košíku
                            </Button>
                        </Col>
                    </Card.Footer>
                </Card>
            );
        })
    );
}

export default SelectGoods;
