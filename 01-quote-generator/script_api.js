/*
    API Details
    http://api.forismatic.com/api/1.0/
    method=getQuote — method name to invoke
    format=<format> — one of the server supported response formats
    key=<integer> — numeric key, which influences the choice of quotation, the maximum length is 6 characters
    lang=<string> — response language ("ru" or "en")
    jsonp=<string> — callback function name, used for jsonp format only (usage example)
    e.g., method=getQuote&key=457653&format=xml&lang=en
*/

// Get Quote from API
// async function getQuote() {
//     const proxyUrl = "https://cors-anywhere.herokuapp.com/";
//     const apiUrl = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
//     try {
//         const response = await fetch(proxyUrl + apiUrl);
//         const data = await response.json();
//         console.log(data);
//     } catch (error) {
//         // getQuote();
//         console.log("Oops! No Quote!!", error);
//     }
// }

// Get Quotes from API

let apiQuotes = [];

const showNewQuote = () => {
    // pick a random quote from apiQuotes array
    const randomQuoteIndex = Math.floor(Math.random() * apiQuotes.length);
    const quote = apiQuotes[randomQuoteIndex];

    // get DOM elements
    const quoteEl = document.getElementById("quote");
    const authorEl = document.getElementById("author");

    // populate quote
    quoteEl.textContent = quote.text;
    authorEl.textContent = quote.author;
};

async function getQuotes() {
    const apiUrl = "https://type.fit/api/quotes";

    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
    } catch (error) {
        console.log("Oops! No Quotes!!", error);
        apiQuotes = localQuotes;
    }
    showNewQuote();
}

// Get Quote On Page Load
getQuotes();
