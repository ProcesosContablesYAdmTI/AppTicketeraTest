export async function sp_api_contextInfo_json(uri){
    return await fetch(new Request(uri, 
        { 
        method: "POST",
        credentials: "include",
        headers: new Headers({
            "Accept": "application/json; odata=verbose",
            "Content-Type": "application/json;odata=verbose",
        })
    })).then(response => {
        if (!response.ok) {
            throw new Error("La solicitud falló con un estado HTTP " + response.status);
          }
        return response.json();
    })
    .then(json => {
        return json.body === undefined? json.d : json.body.d;
    })
    .catch(err => console.log('Error:', err));
}

export async function sp_api_get_json(uri) {
    return await fetch(new Request(uri, 
        { 
            method: "GET",
            credentials: 'include', 
            headers: new Headers({
                "Accept": "application/json; odata=verbose"
            }) 
        }))
        .then(response => {
            if (!response.ok) {
                throw new Error("La solicitud falló con un estado HTTP " + response.status);
              }
            return response.json();
        })
        .then(json => {
            return json.body === undefined ? json.d : json.body.d;
        })
        .catch(err => console.log('Error:', err));
}

export async function sp_api_post_json(uri, digest, data){
    return await fetch(new Request(uri, { 
        method: "POST",
        credentials: "same-origin",
        headers: new Headers({
            "Accept": "application/json; odata=nometadata",
            "Content-Type": "application/json;odata=nometadata",
            'X-RequestDigest': digest.GetContextWebInformation.FormDigestValue
        }),
        body: JSON.stringify(data)
    }))
    .then(response => {
        if (!response.ok) {
            throw new Error("La solicitud falló con un estado HTTP " + response.status);
          }
        return response.json();
    })
    .catch(err => console.log('Error:', err));
}

export async function sp_api_post_json_file(uri, digest, fileData){
    return await fetch(new Request(uri, { 
        method: "POST",
        binaryStringRequestBody: true,
        credentials: "same-origin",
        headers: new Headers({
            // "Accept": "application/json; odata=nometadata",
            "Accept": "application/json; odata=verbose",
            // "Content-Type": "application/json;odata=nometadata",
            'X-RequestDigest': digest.GetContextWebInformation.FormDigestValue,
            "content-length": fileData.byteLength
        }),
        body: fileData
        // data: fileData,
        // processData: false,        
    }))
    .then(response => {
        if (!response.ok) {
            throw new Error("La solicitud falló con un estado HTTP " + response.status);
          }
        return response.json();
    })
    .catch(err => console.log('Error:', err));
}


export async function sp_api_update_json(uri, digest, data){
    return await fetch(new Request(uri, { 
        method: "POST",
        credentials: "same-origin",
        headers: new Headers({
            "Accept": "application/json; odata=nometadata",
            "Content-Type": "application/json;odata=nometadata",
            "X-HTTP-Method": "MERGE",
            'X-RequestDigest': digest.GetContextWebInformation.FormDigestValue,
            "If-Match": "*"
            // 'If-Match': data.d.__metadata.etag.replace(/{|}/g, '').toLowerCase() // Para evitar error 412 de SPO
        }),
        body: JSON.stringify(data)
    }))
    .then(response => {
        // return response.json();
        if (!response.ok) {
            throw new Error("La solicitud falló con un estado HTTP " + response.status);
          }
        return response
    })
    .catch(err => console.log('Error:', err));
}


export async function sp_api_get_json_file(uri){
    return await fetch(new Request(uri, { 
        method: "GET",
        credentials: "include",
        headers: new Headers({
            "Accept": "application/json; odata=verbose",
            "Content-Type": 'application/json; odata=verbose',
            // 'X-RequestDigest': digest.GetContextWebInformation.FormDigestValue,
        })
       
    }))
    .then(response => {
        if (!response.ok) {
            throw new Error("La solicitud falló con un estado HTTP " + response.status);
          }
        return response.json();
    })
    .then(json => {
        return json.body === undefined ? json.d : json.body.d;
    })
    .catch(err => console.log('Error:', err));
}