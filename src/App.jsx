import { useState, createContext } from "react";
import { DataContext } from "./GlobalContext";
import "./App.css";
import { Container, Row, Button, Tab, Tabs, Col } from "react-bootstrap";
import Customer from "./Components/Customer/Customer";
import Opening from "./Components/Opening/Opening";
import SelectGoods from "./Components/SelectGoods/SelectGoods";
import OffCanvasExample from "./Components/Oops/Oops";
import Cart from "./Components/Cart/Cart";
import LoadCurrencyRates from "./Functions/LoadCurrencyRates";
import Summary from "./Components/Summary/Summary";
import SelectRates from "./Components/SelectRates/SelectRates";

import rawData from "./productData.json";

/**
 * Komponenta App - hlavní komponenta aplikace
 */
function App() {
    //
    const [activeTab, setActiveTab] = useState("tab1");
    const [dataCustomer, setDataCustomer] = useState({});
    const [dataProduct, setDataProduct] = useState(rawData.products);
    const [dataShoppingCart, setDataShoppingCart] = useState(new Map());
    const [showOops, setShowOops] = useState(false);
    const [dataCurrencyRates, setDataCurrencyRates] = useState({});

    /**
     * metoda handleRegister přijímá data z komponenty Customer.jsx a ukládá je do stavu dataCustomer
     */
    const handleRegister = async (values) => {
        console.log(
            "Vstup -> handleRegister přijímá data z komponenty Customer.jsx a ukládá je do stavu dataCustomer"
        );
        setDataCustomer(values);
        console.log(
            "Vstup -> dataCustomer ... Nyní by registrace měla být v pořádku."
        );
        console.log(values);

        // Nabídneme uživateli přechod na další záložku
        setActiveTab("tab3");
    };

    /**
     * metoda addToCart přidá vybrané zboží do košíku
     */
    const addToCart = (product, countProducts) => {
        console.log("Vstup -> addToCart přidá vybrané zboží do košíku");
        console.log(product);
        console.log(countProducts);

        // přišla nula počet nebo null, NaN
        if (!Number.parseInt(countProducts)) {
            console.log("addToCart : přišla nula počet nebo null, NaN");
            console.log(product);
            return;
        }

        // Je registrovaný ? Můžeme vložit do košíku ?
        if (isNaN(dataCustomer) && !dataCustomer.isValid) {
            console.log(
                "addToCart : Je registrovaný ? Můžeme vložit do košíku ?"
            );
            console.log(dataCustomer);
            setShowOops(true);
            return;
        }

        console.log(product);
        console.log(countProducts);
        console.log(dataShoppingCart);

        // přidání do košíku. Pokud je již obsažena položka, přičteme
        setDataShoppingCart((prev) => {
            const newStatus = new Map(prev);
            newStatus.set(
                product.id,
                Number.parseInt(newStatus.get(product.id) || 0) +
                    Number.parseInt(countProducts || 0)
            );
            console.log(newStatus);
            return newStatus;
        });

        console.log(
            `Přidáno do košíku ${product.id}: ${product.name} - ${countProducts} ks/bal.`
        );

        SelectRates();
        console.log(newStatus);
    };

    const handleCloseOops = () => {
        setShowOops(false);
    };

    /**
     * DataContextValues - hodnoty, které budou dostupné v rámci DataContext
     * Musí být na konci ... až po inicializaci všech objektů !!!
     */
    const DataContextValues = {
        dataCustomer,
        setDataCustomer,
        dataProduct,
        setDataProduct,
        dataShoppingCart,
        setDataShoppingCart,

        addToCart,
    };

    /**
     * Render hlavní komponenty App
     */
    return (
        <>
            <Container className=''>
                <Row className='justify-content-center'>
                    <h1 className='mt-4 mb-3 border-h1 font-header'>
                        Máme pro Vás košík plný ovoce
                    </h1>
                </Row>
            </Container>

            <DataContext.Provider value={DataContextValues}>
                <Container>
                    <Tabs
                        defaultActiveKey='tab1'
                        id='Pages'
                        className='b mt-2 rounded-0 justify-content-center  pb-3'
                        activeKey={activeTab}
                        onSelect={(k) => setActiveTab(k)}>
                        {/* ---------------------------------------------------------------------- */}
                        <Tab
                            eventKey='tab1'
                            title='Vítejte !!!'
                            className='n-tabs'>
                            <Opening />
                        </Tab>
                        {/* ---------------------------------------------------------------------- */}
                        <Tab
                            eventKey='tab2'
                            title='1. Registrace nakupujícího'
                            className='n-tabs pt-5'>
                            <Customer setDataCustomer={handleRegister} />
                        </Tab>
                        {/* ---------------------------------------------------------------------- */}
                        <Tab
                            eventKey='tab3'
                            title='2. Výběr ovoce'
                            className=''>
                            <div className='row justify-content-center mb-3'>
                                <SelectGoods />
                            </div>
                        </Tab>
                        {/* ---------------------------------------------------------------------- */}
                        <Tab
                            eventKey='tab4'
                            title='3. Objednávka'
                            className='my-2'>
                            <h3>Rekapitulace objednávky</h3>
                            <div className='row justify-content-center mb-3'>
                                <Col md={6} className='b'>
                                    <Cart />
                                </Col>
                                <Col md={6} className='c'>
                                    <Summary />
                                </Col>
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
                <OffCanvasExample
                    show={showOops}
                    handleClose={handleCloseOops}
                />
            </DataContext.Provider>

            {/* mt-auto py-3 bg-light */}

            <footer className='bg-light '>
                <Container>
                    <span className='text-muted'>
                        FAPI - Ukázkový projekt - verze 1.0.0 <br />
                        Autor : Roman Slíva
                    </span>
                </Container>
            </footer>
        </>
    );
}

export default App;
