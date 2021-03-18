export const get = apiEndpoint => {
  return fetch('http://localhost:3001/'+apiEndpoint).then((response)=>{
    return response;
  }).catch((err)=>{
    console.log(err);
  })
}

export const post = (apiEndpoint, payload) => {
  const reqOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  }

  return fetch('http://localhost:3001/'+apiEndpoint, reqOptions).then((response)=>{
    return response;
  }).catch((err)=>{
    console.log(err);
  })
}

export const put = (apiEndpoint, payload) => {
	const reqOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  }
  return fetch('http://localhost:3001/'+apiEndpoint, reqOptions).then((response)=>{
    return response;
  }).catch((err)=>{
    console.log(err);
  })
}

export const deleteItem = apiEndpoint => {
  return fetch('http://localhost:3001/'+apiEndpoint, { method: 'DELETE' }).then((response)=>{
    return response;
  }).catch((err)=>{
    console.log(err);
  })
}