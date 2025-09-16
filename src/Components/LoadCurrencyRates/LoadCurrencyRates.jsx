import React, {useState, useEffect, useContext} from "react";
import "./LoadCurrencyRates.css";
import {DataContext} from "./../../GlobalContext";
import {Container, Row, Button, Tab, Tabs, Col, Form} from "react-bootstrap";

import axios from "axios";

//const urlServerApiCNB = `https://api.cnb.cz/cnbapi/exrates/daily?date=${(new Date().toISOString()).slice(0,10)} &lang=CZ"`;
//const urlServerApiCNB = `https://api.cnb.cz/cnbapi/exrates/daily?date=2025-09-14&lang=CZ`;

// produkce ... proxy přes PHP script.
// const urlServerApiCNB = https://projects.sliva-roman.cz/project9/cnbapi/exrates/daily?date=2025-09-14

const urlServerApiCNB = `/cnbapi/exrates/daily`;

export const RateKc = {
    //validFor: rates[0]?.validFor,
    validFor: new Date().toISOString().slice(0, 10),
    order: 0,
    country: "Česká republika",
    currency: "Kč",
    amount: 1,
    currencyCode: "CZK",
    rate: 1.0,
};

function EditAndSendRates(rates) {
    //
    console.log("rates -> EDIT ", rates);
    if (!isNaN(rates)) return null;
    //
    let tmp;
    try {
        tmp = [RateKc, ...rates];
        console.log("rates <- EDIT ", tmp);
    } catch (error) {
        console.log("ERROR rates <- EDIT ", tmp);
    }
    return tmp;
}

// Fetch dat ze servru ... výsup je pole JSONů
async function LoadRates() {
    //
    let data = null;

    const headers = {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
    };

    const params = {
        lang: "CZ",
        date: new Date().toISOString().slice(0, 10),
    };

    try {
        const response = await axios.get(urlServerApiCNB, params, headers);
        console.log("Data z ČNB úspěšně přijata:");
        data = response.data;
        console.log("data:", data);
    } catch (error) {
        console.error("Chyba při odesílání/přijímání dat:", error);
        return null;
    }

    let result = null;
    try {
        result = data?.rates;
        console.log("result: " + result);
    } catch (error) {
        console.error("Chyba při parsovani přijatých dat:", error);
    }

    return EditAndSendRates(result);
}

/**
 *
 * @returns
 */
export default function SelectRates() {
    const D = useContext(DataContext);
    const [loading, setLoading] = useState(false);

    // první, automatické načtení
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await LoadRates();
                if (!isNaN(data)) return null;
                D.setDataCurrencyRates(data);
            } catch (err) {
                console.error("Chyba při načítání kurzů:", err);
            }
        };
        fetchData();
    }, []);

    // refresh
    const refreshRates = async () => {
        setLoading(true);
        try {
            const data = await LoadRates();
            if (isNaN(data)) return;
            D.setDataCurrencyRates(data);
        } catch (err) {
            console.error("Chyba při načítání kurzů:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className='d-flex align-items-start'>
                <h5 className='headColor'>Vyběr měny</h5>
            </div>
            <div className='d-flex align-items-start'>
                {/* výběr měny */}
                <Form.Select
                    // let tmpKc = {
                    //     validFor: rates[0]?.validFor,
                    //     order: 0,
                    //     country: "Česká republika",
                    //     currency: "Kč",
                    //     amount: 1,
                    //     currencyCode: "CZK",
                    //     rate: 1.0,
                    // };
                    value={D.selectedCurrency || "chybí ..."}
                    onChange={(e) => D.setSelectedCurrency(e.target.value)}>
                    {!D.dataCurrencyRates && <option value=''>-- vyběr měny -- </option>}
                    {D.dataCurrencyRates?.map((r, index) => (
                        <option key={index} value={index}>
                            {`${r.country} - ${r.amount} ${r.currency} (${r.currencyCode}) = ${r.rate} Kč (CZK)`}
                        </option>
                    ))}
                </Form.Select>
            </div>

            {/* tlačítko pro ruční refresh */}

            <div className='d-flex justify-content-end'>
                <Button onClick={refreshRates} disabled={loading} className='n-button-rate py-2'>
                    <small>{loading ? "Načítám..." : "Aktualizovat kurzy"}</small>
                </Button>
            </div>
        </>
    );
}

// {
//     "validFor": "2025-09-15",
//     "order": 179,
//     "country": "Austrálie",
//     "currency": "dolar",
//     "amount": 1,
//     "currencyCode": "AUD",
//     "rate": 13.772
// }
