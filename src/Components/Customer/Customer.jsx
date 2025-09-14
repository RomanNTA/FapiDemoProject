import React from "react";
import { useState } from "react";
import "./Customer.css";
import {
    Form,
    Col,
    Row,
    FloatingLabel,
    InputGroup,
    Button,
} from "react-bootstrap";

function Customer({ setDataCustomer }) {
    // const EMAIL_REGEX =
    const EMAIL_REGEX = /\b[\w\.-]+@([\w\.-]+\.\w{2,4}\b)/;

    // Alfanumerické znaky + diakritika + mezera
    const PLAIN_TEXT_REGEX = /^[a-zA-Z0-9À-ž\s]+$/;

    // Alfanumerické znaky + diakritika + mezera + pomlčka a lomítko
    const STREET_REGEX = /^[a-zA-Z0-9À-ž\s-/]+$/;

    // Telefonní číslo 9 číslic
    const PHONE_REGEX = /^\d{9}$/;

    // PSČ 5 číslic
    const ZIPCODE_REGEX = /^\d{5}$/;

    const [dataForm, setDataForm] = useState({
        isValid: false,
        email: "",
        firstName: "",
        lastName: "",
        phone: 0,
        street: "",
        city: "",
        zipCode: 0,
    });

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;

        try {
            if (form.checkValidity() === false) {
                console.log("Chyba ve formuláři !");
            } else {
                let tmp = { ...dataForm, isValid: true };
                console.log(tmp);
                setDataCustomer(tmp);
            }
        } catch (error) {
            console.log("Vyjímka ve formuláři !");
            console.log(error);
        }

        console.log("Odesílám formulář !");
        setValidated(true);
    };

    /**
     * metoda handleInputForm
     */
    const handleInputForm = (e) => {
        const [val, name, id] = [e.target.value, e.target.name, e.target.id];
        let tmp = { ...dataForm, [name]: val };
        setDataForm(tmp);
    };

    //        <Form noValidate validated={validated}  onInvalid={handleSubmit}>

    return (
        <>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                {/* Nový řádek */}

                <Row>
                    {/* ------------------ FIRST NAME ------------------ */}
                    <Form.Group as={Col} md='6' className=''>
                        <FloatingLabel
                            controlId='idFirstName'
                            label='&nbsp;&nbsp;&nbsp;jméno'
                            className='mb-3 text-warning'>
                            <Form.Control
                                className='bg-white rounded-5 ps-4'
                                type='text'
                                name='firstName'
                                onChange={handleInputForm}
                                value={dataForm.firstName || ""}
                                required
                                pattern={PLAIN_TEXT_REGEX.source}
                                placeholder='' // musí být uvedený prázdný !!!!!!!!
                            />
                            <Form.Control.Feedback type='invalid'>
                                Zadejte platné jméno (pouze alfanumerické znaky
                                a diakritika).
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>
                    {/* ------------------ LAST NAME ------------------ */}
                    <Form.Group as={Col} md='6'>
                        <FloatingLabel
                            controlId='idLastName'
                            label='&nbsp;&nbsp;&nbsp;příjmení'
                            className='mb-3'>
                            <Form.Control
                                className='bg-white rounded-5 ps-4'
                                type='text'
                                name='lastName'
                                onChange={handleInputForm}
                                value={dataForm.lastName || ""}
                                required
                                pattern={PLAIN_TEXT_REGEX.source}
                                placeholder='' // musí být uvedený prázdný !!!!!!!!
                            />
                            <Form.Control.Feedback type='invalid'>
                                Prosím, zadejte příjmení (pouze alfanumerické
                                znaky a diakritika).
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>
                </Row>
                {/* Nový řádek */}
                <Row>
                    {/* ------------------ PHONE ------------------ */}
                    <Form.Group as={Col} md='3'>
                        <FloatingLabel
                            controlId='idPhone'
                            label='&nbsp;&nbsp;&nbsp;telefonní číslo'
                            className='mb-3'>
                            <Form.Control
                                className='bg-white rounded-5 ps-4'
                                type='text'
                                name='phone'
                                min={0}
                                required
                                pattern={PHONE_REGEX.source}
                                onChange={handleInputForm}
                                value={dataForm.phone || ""}
                                placeholder='' // musí být uvedený prázdný !!!!!!!!
                            />
                            <Form.Control.Feedback type='invalid'>
                                Prosím, zadejte telefonní číslo (9 čísel).
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>
                    {/* ------------------ EMAIL ------------------ */}
                    <Form.Group as={Col} md='9'>
                        <FloatingLabel
                            controlId='idEmail'
                            label='&nbsp;&nbsp;&nbsp;platná emailová adresa'
                            className='mb-3'>
                            <Form.Control
                                className='bg-white rounded-5 ps-4'
                                type='email'
                                name='email'
                                onChange={handleInputForm}
                                required
                                pattern={EMAIL_REGEX.source}
                                //pattern={EMAIL_REGEX}
                                value={dataForm.email || ""}
                                placeholder='' // musí být uvedený prázdný !!!!!!!!
                            />
                            <Form.Control.Feedback type='invalid'>
                                Prosím, zadejte platný email.
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>
                    {/* ------------------ ADRESA - ULICE ------------------ */}
                </Row>

                <Row>
                    <Form.Group as={Col} md='5'>
                        <FloatingLabel
                            controlId='idStreet'
                            label='&nbsp;&nbsp;&nbsp;Ulice'
                            className='mb-3'>
                            <Form.Control
                                className='bg-white rounded-5 ps-4'
                                type='text'
                                name='street'
                                required
                                onChange={handleInputForm}
                                value={dataForm.street || ""}
                                pattern={STREET_REGEX.source}
                                placeholder='' // musí být uvedený prázdný !!!!!!!!
                            />
                            <Form.Control.Feedback type='invalid'>
                                Prosím, zadejte ulici a čísla. např. "Dlouhá
                                12/2020".
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>
                    {/* ------------------ ADRESA - MĚSTO ------------------ */}
                    <Form.Group as={Col} md='5'>
                        <FloatingLabel
                            controlId='idCity'
                            label='&nbsp;&nbsp;&nbsp;Město'
                            className='mb-3'>
                            <Form.Control
                                className='bg-white rounded-5 ps-4'
                                type='text'
                                name='city'
                                required
                                onChange={handleInputForm}
                                value={dataForm.city || ""}
                                pattern={STREET_REGEX.source}
                                placeholder='' // musí být uvedený prázdný !!!!!!!!
                            />
                            <Form.Control.Feedback type='invalid'>
                                Prosím, zadejte město (jen alfanumerické znaky).
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>
                    {/* ------------------ ADRESA - PSČ ------------------ */}
                    <Form.Group as={Col} md='2'>
                        <FloatingLabel
                            controlId='idZipCode'
                            label='&nbsp;&nbsp;&nbsp;PSČ'
                            className='mb-3'>
                            <Form.Control
                                className='bg-white rounded-5 ps-4'
                                type='text'
                                name='zipCode'
                                required
                                onChange={handleInputForm}
                                value={dataForm.zipCode || ""}
                                pattern={ZIPCODE_REGEX.source}
                                placeholder='' // musí být uvedený prázdný !!!!!!!!
                            />
                            <Form.Control.Feedback type='invalid'>
                                Prosím, zadejte směrovací číslo (5 čísel bez
                                mezer).
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>
                </Row>

                <Col className='d-flex justify-content-center m-5'>
                    <Button
                        type='submit'
                        className='n-button-send  rounded-5 px-4 py-2 fw-bold'>
                        Mám hotovo ... ukaž mi ovoce
                    </Button>
                </Col>
            </Form>
        </>
    );
}

export default Customer;
