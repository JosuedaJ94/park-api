const apiKey = 'ygy7XU1RCPSj2ptsGGEKPpHy7Ke04dyGubjuSkev';
const endpoint = 'https://developer.nps.gov/api/v1/parks';

function stateSelector() {

  $('form').submit(event => {
    event.preventDefault();
    $("ul").empty();

    var states = $('#states').val();
    var limit = $('#count').val();

    getParks(states, limit);
  });
}

function getParams(params){
  const queryItems = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);

  return queryItems.join('&');
}


function getParks(states, rlimit) {
  const params = {

    stateCode: states,
    limit: rlimit,
    api_key: apiKey,
  
  };
   const queryString = getParams(params);
   const url = endpoint + '?' + queryString;

   fetch(url).then(response => response.json()).then(responseJson => displayInfo(responseJson));


}

function displayInfo(response) {

  for(let i = 0; response.data.length; i ++) {
    let name = response.data[i].name;
    let url = response.data[i].url;
    let desc = response.data[i].description;

    $("ul").append(`<li>
      <div>
        <hr>
        <p>${name}</p>
        <p>${url}</p>
        <p>${desc}</p>
      </div>
    </li>`);
  }
}

$(stateSelector);