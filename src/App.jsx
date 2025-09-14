import { useState } from "react";
import "./App.css";
import { Container, Row, Button, Tab, Tabs } from "react-bootstrap";
import Customer from "./Components/Customer/Customer";

function App() {
    // const [count, setCount] = useState(0);

    const [dataCustomer, setDataCustomer] = useState();

    /**
     * metoda handleRegister přijímá data z komponenty Customer.jsx a ukládá je do stavu dataCustomer
     */
    const handleRegister = (values) => {
        console.log(
            "Vstup -> handleRegister přijímá data z komponenty Customer.jsx a ukládá je do stavu dataCustomer"
        );
        setDataCustomer(values);
        console.log(
            "Vstup -> dataCustomer ... Nyní by registrace měla být v pořádku."
        );
        console.log(values);
    };

    return (
        <>
            <Container>
                <h1 className='m-5'>Košík plný ovoce</h1>

                <Tabs
                    defaultActiveKey='tab1'
                    id='TabOffCan'
                    className='mb-2 rounded-0 '>
                    {/* ---------------------------------------------------------------------- */}
                    <Tab
                        eventKey='tab1'
                        title='Vítejte v našem obchodě ->'
                        className=''>
                        <div className='m-5'>
                            <div className='justify-content-center my-5'>
                                Vítejte v našem obchodě s ovocem. Ve čtyřech
                                jednoduchých krocích jsi objednáte své oblíbené
                                ovoce, které Vám dovezeme až domů.
                            </div>
                            <div className='justify-content-center mb-3'>
                                Je to velmi jednoduché. Po úspěšné registraci
                                můžete přejít k výběru ovoce, objednávce a
                                platbě.
                            </div>
                            <div className='justify-content-center mb-3'>
                                Nyní, pro pokračování prosím klikněte na záložku
                                "1.Registrace nakupujícího" a pak už jen
                                vybírejte své oblíbené lahodné kousky.
                            </div>
                            <div className='justify-content-center my-5'>
                                Těšíme se na vaši návštěvu!
                            </div>
                        </div>
                    </Tab>
                    {/* ---------------------------------------------------------------------- */}
                    <Tab
                        eventKey='tab2'
                        title='1. Registrace nakupujícího'
                        className=''>
                        <Customer setDataCustomer={handleRegister}></Customer>
                    </Tab>
                    {/* ---------------------------------------------------------------------- */}
                    <Tab eventKey='tab3' title='2. Výběr ovoce' className=''>
                        <div className='row justify-content-center mb-3'>
                            Výběr zboží
                        </div>
                    </Tab>
                    {/* ---------------------------------------------------------------------- */}
                    <Tab eventKey='tab4' title='3. Objednávka' className=''>
                        <div className='row justify-content-center mb-3'>
                            Výběr zboží
                        </div>
                    </Tab>
                    {/* ---------------------------------------------------------------------- */}
                    <Tab eventKey='tab5' title='4. Platba' className=''>
                        <div className='row justify-content-center mb-3'>
                            Výběr zboží
                        </div>
                    </Tab>
                    {/* ---------------------------------------------------------------------- */}
                </Tabs>
            </Container>
        </>
    );
}

export default App;
