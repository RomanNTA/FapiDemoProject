import React from "react";
import "./Summary.css";
import {useState, useContext, useEffect} from "react";
import {Card} from "react-bootstrap";
import {DataContext} from "../../GlobalContext";

function Summary() {
    //
    const D = useContext(DataContext);
    const [bilt, setBilt] = useState("");
    const [customer, setCustomer] = useState("");

    // aktualizace při změně customera
    useEffect(() => {
        AddressCustomer();
    }, [D.dataCustomer]);

    // aktualizace při změně košíku nebo měny
    useEffect(() => {
        calculateBilt();
    }, [D.dataShoppingCart, D.selectedCurrency]);
    [];
    /**
     * Sestavení účtenky (poskládaní textu)
     */
    const calculateBilt = () => {
        //
        if (!isNaN(D.dataCurrencyRates)) return;
        let rat = D.dataCurrencyRates[D.selectedCurrency];

        // console.log("calculateBilt rat ", rat);
        // "validFor": "2025-09-16",
        // "order": 180,
        // "country": "Indonesie",
        // "currency": "rupie",
        // "amount": 1000,
        // "currencyCode": "IDR",
        // "rate": 1.254

        // console.log("calculateBilt dataShoppingCart ", D.dataShoppingCart);
        // new Map([
        //     [4, 2],
        //     [2, 3],
        // ]);

        // console.log("calculateBilt dataCustomer ", D.dataCustomer);
        // "isValid": true,
        // "email": "",
        // "firstName": "",
        // "lastName": "",
        // "phone": "",
        // "street": "",
        // "city": "",
        // "zipCode": ""

        // console.log("calculateBilt dataProduct ", D.dataProduct);
        // "id": 1,
        // "name": "Rybíz červený",
        // "desc": "Červený rybíz, vanička, 125 g.",
        // "price": 59.9,
        // "img": "id1-860x800x1_5s2pq243pmp7.webp"

        let result = [];
        let sumByCurrency = 0.0;
        const headerBilt = "Účtenka";

        const col1 = 38;
        const col2 = 12;

        Array.from(D.dataShoppingCart.entries()).map(([id, countProducts]) => {
            //
            let product = D.dataProduct.find((x) => x.id == id);
            // ----------
            let name = product.name + " ";
            name = `${name.padEnd(col1, ".")}`;
            // ----------
            let price = " " + Number(product.price * countProducts).toFixed(2);
            price = `${price.padStart(12, ".")} CZK `;
            //
            let priceByCurrency = (product.price * countProducts) / (rat?.rate / rat?.amount);
            sumByCurrency += priceByCurrency; // musí to být před tím, než je to text !!!
            priceByCurrency = " " + Number(priceByCurrency).toFixed(2);
            priceByCurrency = `${priceByCurrency.padStart(col2, ".")} ${rat?.currencyCode}`;
            // ----------

            if (countProducts > 0) {
                result.push([name, price, priceByCurrency].join("."));
            }
        });

        const len = result[0]?.length || 30;

        let tmp, footer, separator;
        if (result.length == 0) {
            separator = "-".repeat(len);
            tmp = Number(0).toFixed(2) + " " + rat?.currencyCode;
            footer = tmp.padStart(len, " ");
        } else {
            separator = "-".repeat(len);
            tmp = Number(sumByCurrency).toFixed(2) + " " + rat?.currencyCode;
            footer = tmp.padStart(len, " ");
        }
        setBilt([headerBilt, separator, ...result, separator, footer].join("\n"));
    };

    /**
     * Sestavení adresy customera
     */
    const AddressCustomer = () => {
        const cust = D.dataCustomer;
        if (!cust.isValid) return;

        let result = [];
        result.push(`Příjemce, adresa`);
        result.push(``);
        result.push(`Vážená(ý)`);
        result.push(``);
        result.push(`${cust.firstName} ${cust.lastName}`);
        result.push(`email:  ${cust.email}, tel: ${cust.phone}`);
        result.push(`Adr: ${cust.street}`);
        result.push(`${cust.city}   PSČ: ${cust.zipCode}`);

        setCustomer(result.join("\n"));
    };

    return (
        <div className=''>
            <Card className='w-100 m-1 p-1'>
                <Card.Body className=''>
                    <pre>{bilt}</pre>
                </Card.Body>
                <Card.Body className=''>
                    <pre>{customer}</pre>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Summary;
