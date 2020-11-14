const quoteContainer = document.querySelector("#quote-container");
const quoteText = document.querySelector("#quote");
const authorText = document.querySelector("#author");
const twitterBtn = document.querySelector("#twitter");
const newQuoteBtn = document.querySelector("#new-quote");
const loader = document.querySelector("#loader");
const MAX_QUOTE_CHARACTERS = 120;

const showLoadingSpinner = () => {
    loader.hidden = false;
    quoteContainer.hidden = true;
};

const removeLoadingSpinner = () => {
    loader.hidden = true;
    quoteContainer.hidden = false;
};

const showNewQuote = () => {
    showLoadingSpinner();

    // pick a random quote from localQuotes array
    const randomQuoteIndex = Math.floor(Math.random() * localQuotes.length);
    const quote = localQuotes[randomQuoteIndex];

    // check quote length
    quoteText.classList.remove("long-quote");
    if (quote.text.length > MAX_QUOTE_CHARACTERS) {
        quoteText.classList.add("long-quote");
    }

    // populate quote
    quoteText.textContent = quote.text;
    authorText.textContent = quote.author || "unknown";
    setTimeout(removeLoadingSpinner, 2000);
};

const tweetQuote = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, "_blank");
};

// Get Quote On Page Load
showNewQuote();

newQuoteBtn.addEventListener("click", showNewQuote);
twitterBtn.addEventListener("click", tweetQuote);
