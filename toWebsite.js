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
function lustig(){
    fetch("toots.json")
        .then(function(response){
            return response.json();
        })
        .then(function(toots){
            toots.sort(function(a, b) {
                return b.tootID - a.tootID;
            });
            let placeholder = document.querySelector("#data-output");
            let out = "";
            
            toots.forEach((toot) => {
                if (toot.boosted === true) {
                    x = "Yes";
                } else {
                    x = "No";
                }
                out += `
                <tr>
                    <td>${toot.createdAt}</td>
                    <td><a href="${toot.url}">${toot.tootID}</a></td>
                    <td>${toot.username}</td>
                    <td>${x}</td>
                </tr>`;
                });
            placeholder.innerHTML = out;
        })
    .catch(function(error){
        console.log(error);
    }
);

fetch("toots.json")
    .then(function(response){
        return response.json();
    })
    .then(function(toots){
        toots.sort(function(a, b) {
            return b.tootID - a.tootID;
        });


        let slicedTootArray = [];
        toots.forEach((x,y,z) => !(y % 4) ? slicedTootArray.push(z.slice(y, y + 4)) : '');
        for (let i = 0; i < slicedTootArray.length; i++) {
            let avatarStatic = "#avatarStatic" + i;
            if (slicedTootArray[i] != undefined && i == 0) {
                let placeholderAvatar = document.querySelector("#avatarStatic1");
                let outAvatar = "";
                const firstPartOftoots = slicedTootArray[i];
                firstPartOftoots.forEach((card) => {
                    outAvatar += `
                    <div class="tile is-parent">
                        <article class="tile is-child box">
                            <p class="title">Boosted Toots</p>
                            <p class="subtitle">${card.tootID}</p>
                            <figure class="image is-128x128">
                                <img class="is-rounded" src="${card.avatarStatic}">
                            </figure>
                            <div class="content">
                                <p>${card.createdAt}</p>
                            </div>
                        </article>
                    </div>
                    `;
                });
                placeholderAvatar.innerHTML = outAvatar;
            } else {
                let placeholderAvatar = document.querySelector("#avatarStatic1");
                let outAvatar = "";
                const firstPartOftoots = slicedTootArray[i];
                firstPartOftoots.forEach((card) => {
                    outAvatar += `
                    <div class="tile is-parent">
                    </div>
                    `;
                });
            }
            if (slicedTootArray[i] != undefined && i == 1) {
                let placeholderAvatar = document.querySelector("#avatarStatic2");
                let outAvatar = "";
                const firstPartOftoots = slicedTootArray[i];
                firstPartOftoots.forEach((card) => {
                    outAvatar += `
                    <div class="tile is-parent">
                        <article class="tile is-child box">
                            <p class="title">Boosted Toots</p>
                            <p class="subtitle">${card.tootID}</p>
                            <figure class="image is-128x128">
                                <img class="is-rounded" src="${card.avatarStatic}">
                            </figure>
                            <div class="content">
                                <p>${card.createdAt}</p>
                            </div>
                        </article>
                    </div>
                    `;
                });
                placeholderAvatar.innerHTML = outAvatar;
            } else {
                let placeholderAvatar = document.querySelector("#avatarStatic2");
                let outAvatar = "";
                const firstPartOftoots = slicedTootArray[i];
                firstPartOftoots.forEach((card) => {
                    outAvatar += `
                    <div class="tile is-parent">
                    </div>
                    `;
                });
            }
            if (slicedTootArray[i] != undefined && i == 2) {
                let placeholderAvatar = document.querySelector("#avatarStatic3");
                let outAvatar = "";
                const firstPartOftoots = slicedTootArray[i];
                firstPartOftoots.forEach((card) => {
                    outAvatar += `
                    <div class="tile is-parent">
                        <article class="tile is-child box">
                            <p class="title">Boosted Toots</p>
                            <p class="subtitle">${card.tootID}</p>
                            <figure class="image is-128x128">
                                <img class="is-rounded" src="${card.avatarStatic}">
                            </figure>
                            <div class="content">
                                <p>${card.createdAt}</p>
                            </div>
                        </article>
                    </div>
                    `;
                });
                placeholderAvatar.innerHTML = outAvatar;
            } else {
                let placeholderAvatar = document.querySelector("#avatarStatic3");
                let outAvatar = "";
                const firstPartOftoots = slicedTootArray[i];
                firstPartOftoots.forEach((card) => {
                    outAvatar += `
                    <div class="tile is-parent">
                    </div>
                    `;
                });
            }
            if (slicedTootArray[i] != undefined && i == 3) {
                let placeholderAvatar = document.querySelector("#avatarStatic4");
                let outAvatar = "";
                const firstPartOftoots = slicedTootArray[i];
                firstPartOftoots.forEach((card) => {
                    outAvatar += `
                    <div class="tile is-parent">
                        <article class="tile is-child box">
                            <p class="title">Boosted Toots</p>
                            <p class="subtitle">${card.tootID}</p>
                            <figure class="image is-128x128">
                                <img class="is-rounded" src="${card.avatarStatic}">
                            </figure>
                            <div class="content">
                                <p>${card.createdAt}</p>
                            </div>
                        </article>
                    </div>
                    `;
                });
                placeholderAvatar.innerHTML = outAvatar;
            } else {
                let placeholderAvatar = document.querySelector("#avatarStatic4");
                let outAvatar = "";
                const firstPartOftoots = slicedTootArray[i];
                firstPartOftoots.forEach((card) => {
                    outAvatar += `
                    <div class="tile is-parent">
                    </div>
                    `;
                });
            }
            if (slicedTootArray[i] != undefined && i == 4) {
                let placeholderAvatar = document.querySelector("#avatarStatic5");
                let outAvatar = "";
                const firstPartOftoots = slicedTootArray[i];
                firstPartOftoots.forEach((card) => {
                    outAvatar += `
                    <div class="tile is-parent">
                        <article class="tile is-child box">
                            <p class="title">Boosted Toots</p>
                            <p class="subtitle">${card.tootID}</p>
                            <figure class="image is-128x128">
                                <img class="is-rounded" src="${card.avatarStatic}">
                            </figure>
                            <div class="content">
                                <p>${card.createdAt}</p>
                            </div>
                        </article>
                    </div>
                    `;
                });
                placeholderAvatar.innerHTML = outAvatar;
            } else {
                let placeholderAvatar = document.querySelector("#avatarStatic5");
                let outAvatar = "";
                const firstPartOftoots = slicedTootArray[i];
                firstPartOftoots.forEach((card) => {
                    outAvatar += `
                    <div class="tile is-parent">
                    </div>
                    `;
                });
            }
        }

        
    })
    .catch(function(error){
        console.log(error);
    });
}

function buttonTable() {
    document.getElementById("buttonTable").innerHTML =
    `
    <div id="reload">
    The Toots below will refresh after <span id="cnt" style="color:red;">15</span> seconds.
    <div id="table">
        <table class="table is-striped is-narrow is-hoverable is-fullwidth" id="cnt">
            <thead>
                <tr>
                    <th>Created</th>
                    <th>TootID</th>
                    <th>Username</th>
                    <th>Boosted</th>
                </tr>
            </thead>
            <tbody id="data-output">
            </tbody>
        </table>
    </div>
    </div>
    `;
};

function buttonCards() {
    document.getElementById("buttonCards").innerHTML =
    `
    <div class="tile is-ancestor" id="avatarStatic1">
        </div>
        <div class="tile is-ancestor" id="avatarStatic2">
        </div>
        <div class="tile is-ancestor" id="avatarStatic3">
        </div>
        <div class="tile is-ancestor" id="avatarStatic4">
        </div>
        <div class="tile is-ancestor" id="avatarStatic5">
    </div>
    `;
};


setInterval(function() {
    lustig();
    }, 2000);
