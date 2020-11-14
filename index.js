'use strict';

const apiKey = 'x44zT7YJytOPfPAIE49EanVs4q9WE6KW9aXNjScb';
const searchURL = 'https://developer.nps.gov/api/v1/parks'

function displayResults(resJson){
   // if there are previous results, remove them
console.log(resJson);
$('#results-list').empty();
// iterate through the items array
for (let i = 0; i < resJson.data.length; i++){
// The parks in the given state must be displayed on the page. Include at least:
// Full name
// Description
// Website URL
   $('#results-list').append(
      `<br><br>
      <li><h3>${resJson.data[i].fullName}</h3>
      <ul>
      <p>Physical Address:<br>${resJson.data[i].addresses[0].line1}<br>${resJson.data[i].addresses[0].city}, ${resJson.data[i].addresses[0].stateCode} ${resJson.data[i].addresses[0].postalCode}</p>
      </ul>
      <p>${resJson.data[i].description}</p>
      <a href='${resJson.data[i].url}' >${resJson.data[i].url}</a>
      </li>`
   )};
//display the results section  
$('#results').removeClass('hidden');
};


function prepareQueryParams(params){
   const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      return queryItems.join('&');
}

function getParkList(query, maxResults=10){
   const params = {
      api_key: apiKey,
      stateCode: query,
      limit: maxResults,      
   };
   const string = prepareQueryParams(params);
   const url = searchURL + '?' + string;

   console.log(url);

   fetch(url)
      .then(res => {
         if (res.ok) {
            return res.json();            
         }
         throw new Error(response.statusText);
      })
      .then (resJson => displayResults(resJson))
      .catch (error => {
         $('#js-error-message').text(`Something went wrong: ${error.message}`);
      })
}

function watchForm() {
   $('form').submit(event => {
   event.preventDefault();
   const states = $('#js-search-term').val();
   const maxResults = $('#js-max-results').val();
   getParkList(states, maxResults);
   console.log(states);
   });
}

$(watchForm);