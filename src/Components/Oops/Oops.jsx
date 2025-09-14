import React from "react";
import "./Oops.css";
import { useState } from "react";
import { Offcanvas, Container, Row, Col, Button } from "react-bootstrap";

function Oops({ show, handleClose }) {
    return (
        <>
            <Offcanvas
                show={show}
                onHide={handleClose}
                placement={"bottom"}
                className='oops-font-color oops-background-color p-3'>
                <Container className='p-0 h-100 oops-block flex-column '>
                    {/* d-flex justify-content-center */}
                    <Offcanvas.Header className='m-0 p-0 pt-4'>
                        <Offcanvas.Title className='w-100'>
                            <h1 className='fs-1 fw-bold text-center'>
                                Ooops ...
                            </h1>
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body className='m-0 p-0 d-flex flex-column font3 fs-6'>
                        <p className='m-0 p-0 text-center'>
                            U nás je to stejné jako v obchodě. Nejdříve si
                            vezmete košík (
                            <span className='text-danger'>
                                zaregistrujete se
                            </span>
                            ) a pak do košíku můžete přidávat zboží.
                        </p>
                        <p className='m-0 p-0 text-center'>
                            Pokud chcete přidat zboží do košíku, musíte být
                            nejdříve zaregistrovaní.
                        </p>
                    </Offcanvas.Body>
                    <Col className='m-0 p-0 pt-2 d-flex justify-content-center '>
                        <Button
                            type='submit'
                            className='n-button-send  rounded-5 px-4 py-2 fw-bold'
                            onClick={handleClose}>
                            Rozumím ... jdu se zaregistrovat
                        </Button>
                    </Col>
                </Container>
            </Offcanvas>
        </>
    );
}
export default Oops;
