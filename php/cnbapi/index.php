<?php
/*
    Skript - light náhrada proxy serveru
    
    - url adresa se rozdělí a přidá ke zdrojové adrese.
    - stáhne se obsah zdrojové a vypíše do výstupu.
    
*/
//příchozí URI
$path = preg_replace('#^/project9/cnbapi#', '', $_SERVER['REQUEST_URI']);

//Nová URI
$url = "https://api.cnb.cz/cnbapi" . $path;

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

// download nové URI
$result = curl_exec($ch);

// sestavení hlavičky a výstup
if ($result === false) {
    header("Content-Type: text/plain; charset=utf-8");
    echo "Chyba cURL: " . curl_error($ch);
} else {
    $contentType = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
    if ($contentType) {
        header("Content-Type: " . $contentType);
    }
}
// ToDo: přepsat i hlavičky :(
echo $result;
curl_close($ch);
