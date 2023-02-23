let x = "";
let countRows = 0;


//fetch hashtag from array
fetch("hashtag.json")
    .then(function(response_hash){
        return response_hash.json();
    })
    // set hashtag for website
    .then(function(hashtags){
        let placeholderHashtag = document.querySelector("#hashtag-output");
        placeholderHashtag.innerHTML = `<h2 class="subtitle is-3">Hashtag: #${hashtags[0].hashtag}</h2>`;
    }
);

// fetch toots array for table
async function generateTable(){
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

async function generateCards(){
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
            countRows = i;
            // if sliced array is undefined(empty) create row
            //if (slicedTootArray[i] != undefined && i == countRows) {
                slicedTootArray[i] != undefined && i == countRows
                //create avatar
                let placeholderAvatar = document.querySelector(`#avatarStatic${i}`);
                let outAvatar = "";
                //create first row with cards
                const firstPartOftoots = slicedTootArray[i];
                // fill cards with content
                firstPartOftoots.forEach((card) => {
                    // change time and date to a human readable string
                    let readableDate = new Date(card.createdAt);
                    readableDate.toDateString();
                    outAvatar += `
                    <div class="tile is-parent a-cards">
                        <article class="tile is-child box box-mixin a-mixin">
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
                    return i;
                });
                // if cards are active, show cards
                if (placeholderAvatar != null) {
                    placeholderAvatar.innerHTML = outAvatar;
                } else {
                    //if cards not active, show nothing
                    return;
                };
            }
    })
    .catch(function(error){
        console.log(error);
    });
}

// hideTable when Cards button is active
function hideTable() {
    while (document.getElementById("table").style.display === null) {
        // ...
        if (document.getElementById("table").style.display != null) {            
            break;
        } 
    }
    document.getElementById("table").style.display = "none";
}

// hideCards when Table button is active
function hideCards() {
    while (document.getElementById("cardsDiv").style.display === null) {
        // ...
        if (document.getElementById("cardsDiv").style.display != null) {            
            break;
        } 
    }
    document.getElementById("cardsDiv").style.display = "none";
}

// show table when Table button is active
function buttonTable() {
    document.getElementById("buttonTable").innerHTML =
    `
    <section class="section is-medium" id="table" >
        <div style="display:block">
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
    <section class="section is-medium" id="cardsDiv" >
        <div style="display:block">
            <div class="tile is-ancestor" id="avatarStatic0">
            </div>
            <div class="tile is-ancestor" id="avatarStatic1">
            </div>
            <div class="tile is-ancestor" id="avatarStatic2">
            </div>
            <div class="tile is-ancestor" id="avatarStatic3">
            </div>
            <div class="tile is-ancestor" id="avatarStatic4">
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
