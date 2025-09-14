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
    //     '^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$';

    // Email Validation as per RFC2822 standards.
    //[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    // Email Validation as per RFC2822 standards .... upravený pro CHROME
    const EMAIL_REGEX = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/;
    // const EMAIL_REGEX =
    //     /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

    //const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-z]{2,4}/;
    //const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-z]{2,4}/;

    // Alfanumerické znaky + diakritika
    //    const PLAIN_TEXT_REGEX.source = "^[a-zA-Z0-9À-ž\\s\\-]+$";
    //const PLAIN_TEXT_REGEX = "^[\\w\\-\\s\\-]+$";

    const PLAIN_TEXT_REGEX = /^[a-zA-Z0-9À-ž\s]+$/;
    // \s\.\-\/
    // Alfanumerické znaky + diakritika
    const STREET_REGEX = /^[a-zA-Z0-9À-ž\.\/\-\s]+$/;

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
        const ev = event;
        const form = event.currentTarget;
        //event.preventDefault();

        console.log("Vstup -> handleSubmit");
        console.log(form);
        console.log(ev);

        // console.log(EMAIL_REGEX);
        // console.log(EMAIL_REGEX.source);
        console.log(dataForm);

        try {
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
                console.log("Chyba ve formuláři !");
                return false;
            }
        } catch (error) {
            // event.preventDefault();
            // event.stopPropagation();
            //console.log("Chyba ve formuláři !");
            //return false;
        }

        console.log("Odesílám formulář !");
        //setValidated(true);

        let tmp = { ...dataForm, isValid: true };
        console.log(tmp);
        //setDataCustomer(tmp);
    };

    /**
     * metoda handleInputForm
     */
    const handleInputForm = (e) => {
        //console.log("Vstup -> handleInputForm");
        const [val, name, id] = [e.target.value, e.target.name, e.target.id];
        //        console.log(val + " - " + name + " - " + id);
        let tmp = { ...dataForm, [name]: val };
        setDataForm(tmp);
        console.log(tmp);
    };

    //        <Form noValidate validated={validated}  onInvalid={handleSubmit}>

    return (
        <>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                {/* Nový řádek */}
                <Row>
                    {/* ------------------ FIRST NAME ------------------ */}
                    <Form.Group as={Col} md='6'>
                        <FloatingLabel
                            controlId='idFirstName'
                            label='jméno'
                            className='mb-3 text-warning'>
                            <Form.Control
                                className='bg-white'
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
                            label='příjmení'
                            className='mb-3'>
                            <Form.Control
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
                            label='telefonní číslo'
                            className='mb-3'>
                            <Form.Control
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
                            label='platná emailová adresa'
                            className='mb-3'>
                            <Form.Control
                                type='text'
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
                            label='Ulice'
                            className='mb-3'>
                            <Form.Control
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
                            label='Město'
                            className='mb-3'>
                            <Form.Control
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
                            label='PSČ'
                            className='mb-3'>
                            <Form.Control
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

                <Button type='submit'>Výběr zboží</Button>
            </Form>
        </>
    );
}

export default Customer;
