//Initialize no of parameters
let addedParamCount = 0;

//Utility Functions:
// 1.to get DOM element from string
function getElementFromString(string){
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

//Hide the parameter box initially
let parameterBox = document.getElementById("parameterBox1");
let jsonBox = document.getElementById("jsonBox");

//Hide the parameter box initially
parameterBox.style.display = "none";
 
//if user clicks on json radio, hide the paramsbox
let jsonRadio = document.getElementById("json");
jsonRadio.addEventListener("click", ()=>{
    parameterBox.style.display = "none";
    jsonBox.style.display = "block";
});

//if user clicks on params radio, hide the jsonbox
let paramRadio = document.getElementById("param");
paramRadio.addEventListener("click", ()=>{
    jsonBox.style.display = "none";
    parameterBox.style.display = "flex";
});

//to add additional parameters
let addParam = document.getElementById("addParam");
addParam.addEventListener("click",()=>{
    let string = `<div class="row my-2" id="parameterBox">
    <label for="parameter" class="col-sm-2 col-form-label"
    >Paramter ${addedParamCount+2}</label
    >
    <div class="col-md-4">
    <input
    type="text"
    class="form-control"
    id="parameterKey${addedParamCount+2}"
    placeholder="Enter Parameter ${addedParamCount+2} Key"
    />
    </div>
    <div class="col-md-4">
    <input
    type="text"
    class="form-control"
    id="parameterValue${addedParamCount+2}"
    placeholder="Enter Parameter ${addedParamCount+2} Value"
    />
    </div>
    <button class="btn deleteParam btn-primary col-md-1">-</button>
    </div>`;
    let paramsAdded = document.getElementById("paramsAdded");
    let paramElement = getElementFromString(string);
    paramsAdded.appendChild(paramElement);

    //Add an event listener to remove parameters
    let deleteParam = document.getElementsByClassName("deleteParam");
    for(item of deleteParam){
        item.addEventListener("click", (e)=>{
            e.target.parentElement.remove();
        });
    }
    addedParamCount++;
});

//when user clicks submit button
let submit = document.getElementById("submit");
submit.addEventListener("click", ()=>{
    document.getElementById("responseText").innerHTML = "Please Wait... Fetching response..."

    //Fetch all the values user has entered
    let url = document.getElementById("url").value;
    let requestType = document.querySelector("input[name='flexRadioDefault']:checked").value;
    let contentType = document.querySelector("input[name='param']:checked").value;

    //collect all the custom parameters into an object
    if(contentType == 'param'){
        data = {};
        for(i = 0; i<addedParamCount+1; i++){
            if(document.getElementById('parameterKey'+(i+1)) != undefined){
                let key = document.getElementById('parameterKey'+(i+1)).value;
                let value = document.getElementById('parameterValue'+(i+1)).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);
    }
    else{
        data = document.getElementById("jsonText").value;
    }

    // console.log(url, requestType, contentType, data);

    if(requestType == "GET"){
        fetch(url, {
            method: 'GET'
        })
        .then(Response=> Response.text())
        .then((text) =>{
            document.getElementById("responseText").innerHTML = text;
            Prism.highlightAll();
        });
    }
    else{
        fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        .then(Response=> Response.text())
        .then((text) =>{
            document.getElementById("responseText").innerHTML = text;
            Prism.highlightAll();
        });
    }

});