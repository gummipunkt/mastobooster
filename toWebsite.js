let x = "";

//fetch hashtag from array
fetch("hashtag.json")
    .then(function(response_hash){
        return response_hash.json();
    })
    // set hashtag for website
    .then(function(hashtags){
        let placeholderHashtag = document.querySelector("#hashtag-output");
        placeholderHashtag.innerHTML = `<h1>Hashtag: #${hashtags[0].hashtag}</h1>`;
    }
);

// fetch toots array for table
function generateTable(){
    fetch("toots.json")
        .then(function(response){
            return response.json();
        })
        .then(function(toots){
            // sort toots by IDs
            toots.sort(function(a, b) {
                return b.tootID - a.tootID;
            });
            let placeholder = document.querySelector("#data-output");
            let out = "";
            // replace true and false with yes and no
            toots.forEach((toot) => {
                if (toot.boosted === true) {
                    x = "Yes";
                } else {
                    x = "No";
                }
                // add toot values into a table
                out += `
                <tr>
                    <td>${toot.createdAt}</td>
                    <td><a href="${toot.url}">${toot.tootID}</a></td>
                    <td>${toot.username}</td>
                    <td>${x}</td>
                </tr>`;
                });
                //if array reading not ready: wait
            if (placeholder != null) {
                placeholder.innerHTML = out;
            } else {
                return;
            };
        })
    .catch(function(error){
        console.log(error);
    }
);
}

function generateCards(){
//fetch toots for cards
fetch("toots.json")
    .then(function(response){
        return response.json();
    })
    .then(function(toots){
        toots.sort(function(a, b) {
            return b.tootID - a.tootID;
        });

        // we need max 4 cards per row, so we create a new array
        let slicedTootArray = [];
        // slice toots array in multiple parts with 4 toots max
        toots.forEach((x,y,z) => !(y % 4) ? slicedTootArray.push(z.slice(y, y + 4)) : '');
        // for loop to extract data out of sliced array
        for (let i = 0; i < slicedTootArray.length; i++) {
            // if sliced array is undefined(empty) create first row
            if (slicedTootArray[i] != undefined && i == 0) {
                //create avatar
                let placeholderAvatar = document.querySelector("#avatarStatic1");
                let outAvatar = "";
                //create first row with cards
                const firstPartOftoots = slicedTootArray[i];
                // fill cards with content
                firstPartOftoots.forEach((card) => {
                    // change time and date to a human readable string
                    let readableDate = new Date(card.createdAt);
                    readableDate.toDateString();
                    outAvatar += `
                    <div class="tile is-parent">
                        <article class="tile is-child box box-mixin is-success">
                            <p class="title">Boosted Toot</p>
                            <p class="subtitle">${card.tootID}</p>
                            <figure class="image is-128x128">
                                <img class="is-rounded" src="${card.avatarStatic}">
                            </figure>
                            <div class="content">
                                <p>${readableDate}</p>
                                <p>${card.content}</p>
                            </div>
                        </article>
                    </div>
                    `;
                });
                // if cards are active, show cards
                if (placeholderAvatar != null) {
                    placeholderAvatar.innerHTML = outAvatar;
                } else {
                    //if cards not active, show nothing
                    return;
                };
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
                    let readableDate = new Date(card.createdAt);
                    readableDate.toDateString();
                    outAvatar += `
                    <div class="tile is-parent">
                        <article class="tile is-child box box-mixin is-success">
                            <p class="title">Boosted Toot</p>
                            <p class="subtitle">${card.tootID}</p>
                            <figure class="image is-128x128">
                                <img class="is-rounded" src="${card.avatarStatic}">
                            </figure>
                            <div class="content">
                                <p>${readableDate}</p>
                                <p>${card.content}</p>
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
                    let readableDate = new Date(card.createdAt);
                    readableDate.toDateString();
                    outAvatar += `
                    <div class="tile is-parent">
                        <article class="tile is-child box box-mixin is-success">
                            <p class="title">Boosted Toot</p>
                            <p class="subtitle">${card.tootID}</p>
                            <figure class="image is-128x128">
                                <img class="is-rounded" src="${card.avatarStatic}">
                            </figure>
                            <div class="content">
                                <p>${readableDate}</p>
                                <p>${card.content}</p>
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

                    let readableDate = new Date(card.createdAt);
                    readableDate.toDateString();
                    outAvatar += `
                    <div class="tile is-parent">
                    <article class="tile is-child box box-mixin is-success">
                    <p class="title">Boosted Toot</p>
                    <p class="subtitle">${card.tootID}</p>
                    <figure class="image is-128x128">
                        <img class="is-rounded" src="${card.avatarStatic}">
                    </figure>
                    <div class="content">
                        <p>${readableDate}</p>
                        <p>${card.content}</p>
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
        let readableDate = new Date(card.createdAt);
        readableDate.toDateString();
        outAvatar += `
        <div class="tile is-parent">
            <article class="tile is-child box box-mixin is-success">
                <p class="title">Boosted Toot</p>
                <p class="subtitle">${card.tootID}</p>
                <figure class="image is-128x128">
                    <img class="is-rounded" src="${card.avatarStatic}">
                </figure>
                <div class="content">
                    <p>${readableDate}</p>
                    <p>${card.content}</p>
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

// hideTable when Cards button is active
function hideTable() {
        document.getElementById("table").style.display = "none";
}

// hideCards when Table button is active
function hideCards() {
        document.getElementById("cardsDiv").style.display = "none";
}

// show table when Table button is active
function buttonTable() {
    document.getElementById("buttonTable").innerHTML =
    `
    <section class="section is-medium">
        <div id="table" style="display:block">
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
    </section>
    `;
    // call hide card function
    hideCards();
};

// show cards when Table button is active
function buttonCards() {
    document.getElementById("buttonCards").innerHTML =
    `
    <section class="section is-medium">
        <div id="cardsDiv" style="display:block">
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
        </div>
    </section>
    `;
    // call hide table function
    hideTable();
};

// refresh every 10 sec
setInterval(function() {
    generateTable();
    generateCards();
    }, 1000);
