import React from "react";
import { useEffect } from "react";
import "./SelectRates.css";
//import { Form } from "react-bootstrap";
import { DataContext } from "./../../GlobalContext";
import axios from "axios";

const urlServerApiCNB = `/cnbapi/exrates/daily`;

// function SelectRates() {
//     //
//     const D = useContext(DataContext);
//     //
//     return (
//         <Form.Select >
//             <option>Open this select menu</option>
//             <option value='1'>One</option>
//             <option value='2'>Two</option>
//             <option value='3'>Three</option>
//         </Form.Select>
//     );
//     //
// }

// async function SelectRates() {
//   const res = await fetch(
//     "https://projects.sliva-roman.cz/project9/cnbapi/exrates/daily?date=2025-09-14&lang=CZ"
//   );
//   return await res.json();
// }

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
        console.log("Data úspěšně přijata:");
        console.log(response.data);
        data = response.data;
    } catch (error) {
        console.error("Chyba při odesílání/přijímání dat:", error);
        return null;
    }
    return data;
}

export default function SelectRates() {
    const D = useMyDataContext();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await LoadRates();
                D.setDataCurrencyRates(data);
            } catch (err) {
                console.error("Chyba při načítání kurzů:", err);
            }
        };

        fetchData();
    }, [D]);

    return <></>;
}
