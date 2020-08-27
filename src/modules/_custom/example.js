import { reject } from "q";

export function doSomething(parameter){
 var formData  = new FormData();
 formData.append('paramName', parameter);
 return new Promise(resolve => {
    fetch(API_PATH+API_ENDPOINT,{ 
     method: 'POST', 
     headers: new Headers({
      'Authorization': sometoken,
      'Accept': '*/*',
      'Content-Type': 'multipart/form-data'
     }),
     body: formData
    }).then(function(response) {
        if(response.success)
            resolve(response);
        else
            reject(response.message)
    }).catch((error) => {
        reject(error);
    });
 });
}

const myMagicFunction = (someArray) =>{
   
   var promises = []; //here will be kept all returned promises
   
    someArray.map((data,i) => { //loop though something
      //call the asynchronous method and store the promise
      promises.push(doSomething(data)); 
    });
    Promise.all(promises).then(() => {
      //When all promises are donde, this code is executed;
      console.log('yaaay!');
    }).catch(reason => {
        console.log(reason) // reject("reason")
    });     
  }

  const useFetch = (url, options) => {
    const [response, setResponse] = React.useState(null);
    useEffect(async () => {
        const res = await fetch(url, options);
        const json = await res.json();
        setResponse(json);
    });
    return response;
  }