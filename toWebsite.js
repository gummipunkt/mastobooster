let x = "";

fetch("hashtag.json")
    .then(function(response_hash){
        return response_hash.json();
    })
    .then(function(hashtags){
        let placeholderHashtag = document.querySelector("#hashtag-output");
        placeholderHashtag.innerHTML = `<h1>Hashtag: #${hashtags[0].hashtag}</h1>`;
    }
);

fetch("toots.json")
    .then(function(response){
        return response.json();
    })
    .then(function(toots){
        let placeholder = document.querySelector("#data-output");
        let out = "";
        for(let toot of toots){
            if (toot.boosted === true) {
                x = "Yes";
            } else {
                x = "No";
            }
            out += `
            <tr>
                <td><a href="${toot.url}">${toot.tootID}</a></td>
                <td>${toot.username}</td>
                <td>${x}</td>
            </tr>`;
        }
        placeholder.innerHTML = out;
    })
    .catch(function(error){
        console.log(error);
    }
);
