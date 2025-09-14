import React, { useState, useEffect } from "react";
import axios from "axios";

//const urlServerApiCNB = `https://api.cnb.cz/cnbapi/exrates/daily?date=${(new Date().toISOString()).slice(0,10)} &lang=CZ"`;
//const urlServerApiCNB = `https://api.cnb.cz/cnbapi/exrates/daily?date=2025-09-14&lang=CZ`;

// produkce ... proxy přes PHP script.
// const urlServerApiCNB = https://projects.sliva-roman.cz/project9/cnbapi/exrates/daily?date=2025-09-14

const urlServerApiCNB = `/cnbapi/exrates/daily`;

export default async function LoadCurrencyRates() {
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
