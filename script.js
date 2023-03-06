const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = []; 

//Show loading
function loading() {
loader.hidden = false;
quoteContainer.hidden = true;
}

//Hide Loading
function complete() {
    quoteContainer.hidden =false;
    loader.hidden = true;
}



// //Show New Quote from local
function newQuote(){
    loading();
    //Pick a random quote
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    
    //Check if author is blank, and replace it with unknown

    if (!quote.author) {  //if there is no quote.author
        authorText.textContent = "unknown";
    }else {
        authorText.textContent = quote.author; //setting text
    }
    //check quote length
    if (quote.text.length>100) {
        quoteText.classList.add('long-quote');
    }else {
        quoteText.classList.remove('long-quote');
    }
    
    quoteText.textContent = quote.text;
    complete();
}

 // Get quotes from API

    async function getQuotes() {  
        loading();// 
        const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
        try {         //to fetch data
        
            const response = await fetch(apiUrl); //const not working untill data fetched from API
             apiQuotes = await response.json(); //getting json from the response of api
             newQuote();
            
            }catch (error) {
                //catch error here like alert;
                }
    }



    //Tweet Quote
    function tweetQuote() {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textcontent} - ${authorText.textContent}`;// ? is to show query paramater, that is text, passing in variable
        window.open(twitterUrl, '_blank'); //open twitter url in a new tab
    }


//Event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);



    //On load
    getQuotes();

//newQuote()