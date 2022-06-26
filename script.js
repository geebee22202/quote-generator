const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

//Show loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

//Hide loading
function complete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

//Show new quote
function newQuote() {
  loading();
  //Pick a random quote from API quotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  //Check if author feild is blank and replace with 'unknown'
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }

  //check quote length to determine styling
  if (quote.text.length > 100) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  //Set Quote, hide loader
  quoteText.textContent = quote.text;
  complete();
}

//Tweet quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

//Event listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// Get quotes from API
async function getQuotes() {
  loading();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    //response value will not be set until the api has been retrieved; otherwise would cause error
    const response = await fetch(apiUrl);
    //getting json from api as a reponse and turning it into json object before passing to global variable: apiQuotes
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    // Catch error here
  }
}

//On Load
getQuotes();
