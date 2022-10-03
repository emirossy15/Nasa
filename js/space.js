document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("btnBuscar").addEventListener("click", getSearchedElements);
    
});
    
function getSearchedElements(){
    
    let searchString = document.getElementById("inputBuscar").value;
    getJSONData("https://images-api.nasa.gov/search?q=" + searchString).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            let items = resultObj.data.collection.items; 
            let container = document.getElementById("contenedor");
            container.innerHTML = "";
            console.log(items);
            for(let i=0; i < items.length; i++){
                let item = items[i];
                let link; 
                if(!!item.links && item.links.length > 0 && !!item.links[0].href)
                    link = item.links[0].href
                else 
                    link = "https://images-assets.nasa.gov/image/PIA20970/PIA20970~thumb.jpg"
                let title = (!!item.data && item.data.length > 0 && !!item.data[0].title) ? item.data[0].title : "Undefined";
                let description = (!!item.data && item.data.length > 0 && !!item.data[0].description) ? item.data[0].description : "Undefined"; 
                let itemHtml = `<div class="card" style="width: 18rem;">
                <img class="card-img-top" src="${link}" alt="Card image cap">
                <div class="card-body">
                  <h5 class="card-title">${title}</h5>
                  <p class="card-text">${description}</p>
                  <a href="${link}" class="btn btn-primary">See image</a>
                </div>
              </div>`;
                container.innerHTML += itemHtml;
            }        
        }
        });

}


let getJSONData = function(url){
    let result = {};
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        return result;
    });
}