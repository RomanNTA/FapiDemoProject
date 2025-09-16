import {useState} from "react";
import "./App.css";
import {DataContext} from "./GlobalContext";
import {Container, Row, Tab, Tabs, Col} from "react-bootstrap";
import Customer from "./Components/Customer/Customer";
import Opening from "./Components/Opening/Opening";
import SelectGoods from "./Components/SelectGoods/SelectGoods";
import Oops from "./Components/Oops/Oops";
import FullCart from "./Components/FullCart/FullCart";
import Summary from "./Components/Summary/Summary";
import LoadCurrencyRates from "./Components/LoadCurrencyRates/LoadCurrencyRates";

import rawData from "./productData.json"; // Zdroj dat

/**
 * Komponenta App - hlavní komponenta aplikace
 */
function App() {
    //
    const [activeTab, setActiveTab] = useState("tab1");
    const [dataCustomer, setDataCustomer] = useState({});
    const [dataProduct, setDataProduct] = useState(rawData.products); // Načítání dat (databáze) z JSON souboru
    const [dataShoppingCart, setDataShoppingCart] = useState(new Map());
    const [showOops, setShowOops] = useState(false);
    const [dataCurrencyRates, setDataCurrencyRates] = useState(null);
    const [selectedCurrency, setSelectedCurrency] = useState(0);

    /**
     * metoda handleRegister přijímá data z komponenty Customer.jsx a ukládá je do stavu dataCustomer
     */
    const handleRegister = async (values) => {
        setDataCustomer(values);
        setActiveTab("tab3");
    };

    /** *******************************************************************************
     * metoda addToCart přidá vybrané zboží do košíku
     */
    const addToCart = (product, countProducts) => {
        // přišla nula počet nebo null, NaN
        if (!Number.parseInt(countProducts)) return;

        // Je registrovaný ? Můžeme vložit do košíku ?
        if (isNaN(dataCustomer) && !dataCustomer.isValid) {
            setShowOops(true);
            return;
        }

        let newStatus;
        // přidání do košíku. Pokud je již obsažena položka, přičteme
        setDataShoppingCart((prev) => {
            const newStatus = new Map(prev);
            newStatus.set(
                product.id,
                Number.parseInt(newStatus.get(product.id) || 0) + Number.parseInt(countProducts || 0)
            );
            return newStatus;
        });
    };

    const handleCloseOops = () => {
        setShowOops(false);
    };

    /**
     * DataContextValues - hodnoty, které budou dostupné v rámci DataContext
     * Musí to být na konci ... až po inicializaci všech objektů !!!
     */
    const DataContextValues = {
        dataCustomer,
        setDataCustomer,
        dataProduct,
        setDataProduct,
        dataShoppingCart,
        setDataShoppingCart,

        dataCurrencyRates,
        setDataCurrencyRates,
        selectedCurrency,
        setSelectedCurrency,

        addToCart,
    };

    /**
     * Render hlavní komponenty App
     */
    return (
        <>
            <Container className=''>
                <Row className='justify-content-center'>
                    <h1 className='mt-4 mb-3 border-h1 font-header'>Košík plný ovoce</h1>
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
                        <Tab eventKey='tab1' title='Vítejte !!!' className='n-tabs'>
                            <Opening />
                        </Tab>
                        {/* ---------------------------------------------------------------------- */}
                        <Tab eventKey='tab2' title='1. Registrace nakupujícího' className='n-tabs pt-5'>
                            <Customer setDataCustomer={handleRegister} />
                        </Tab>
                        {/* ---------------------------------------------------------------------- */}
                        <Tab eventKey='tab3' title='2. Výběr ovoce' className=''>
                            <div className='row justify-content-center mb-3'>
                                <SelectGoods />
                            </div>
                        </Tab>
                        {/* ---------------------------------------------------------------------- */}
                        <Tab eventKey='tab4' title='3. Objednávka' className='my-2'>
                            <div className='d-flex justify-content-center'>
                                <h3 className='headColor'>Rekapitulace objednávky</h3>
                            </div>
                            <div className='row justify-content-center mb-3'>
                                <Col md={6} className=''>
                                    <FullCart />
                                </Col>
                                <Col md={6} className=''>
                                    <Summary />
                                    <LoadCurrencyRates />
                                </Col>
                            </div>
                        </Tab>
                        {/* ---------------------------------------------------------------------- */}
                    </Tabs>
                </Container>
                <Oops show={showOops} handleClose={handleCloseOops} />
            </DataContext.Provider>

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
