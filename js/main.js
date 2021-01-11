const screenwelcome = document.getElementById("screen-welcome");
const screengame = document.getElementById("screen-game");
const images = [
    "images/cards/001.png",
    "images/cards/002.png",
    "images/cards/003.png",
    "images/cards/004.png",
    "images/cards/005.png",
    "images/cards/006.png",
    "images/cards/007.png",
    "images/cards/008.png",
    "images/cards/009.png"
];
const shufflecards = (arr) =>{
    for(let i = arr.length-1; i > 0; i--){
        const j = Math.floor(Math.random() * i)
        const temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp
    }
    return arr;
};

let cards = [];
let active=[];
let aciertos=0;

images.forEach(image =>{
    const imagefromgame = {
        path: image,
        selected: false,
        success: false
    };
    cards.push(imagefromgame, Object.assign({}, imagefromgame));
});

const shuffledcardspackage = shufflecards(cards);

const startGame = e =>{
    e.preventDefault();
    
    window.console.log("iniciando...");
    
    screenwelcome.classList.add("hidden");
    screengame.classList.remove("hidden");

    let col = 0;
    let htmlRow = "";
    
    for(let i = 0; i < shuffledcardspackage.length; i++){
        if(col==0){
            htmlRow += '<div class="row justify-content-center ">';
        }
        htmlRow += 
        '<div class="col-3">'+
            '<div class="card" id="card-'+i+'" data-index="'+i+'" >'+
                '<div class="card-inner">'+
                    '<div class="card-front">'+
                        '<img src="'+shuffledcardspackage[i].path+'" alt="card-front" />'+
                    '</div>'+
                    '<div class="card-back"><img src="images/cards/cover.png" alt="card-back"></div>'+
                '</div>'+
            '</div>'+
        '</div>';
        col++;
        if(col==3){
            htmlRow += "</div>";
            col=0;
        }
    }
    screengame.innerHTML = htmlRow;

    const cardsondocument = document.querySelectorAll('.card');
    const turnCard = evt =>{
        evt.preventDefault();
        evt.stopImmediatePropagation();
        
        if(active.length<=1){
            const cardActive = evt.currentTarget;
            cardActive.removeEventListener("click", turnCard, false);
            cardActive.classList.add("active");
            active.push( cardActive );
        } 

        if(active.length==2) {
            
            if(shuffledcardspackage[active[0].dataset["index"]].path === shuffledcardspackage[active[1].dataset["index"]].path ){
                window.console.log("Iguales!!!");
                aciertos++
                active=[];
                if( aciertos == 9 ){
                    window.console.log("Has ganado!!!");
                }
            } else {
                window.console.log("diferentes!!!");
                let st = setTimeout(()=>{
                    window.console.log( active[1].id);
                    window.console.log( active[0].id);
                    document.querySelector("#"+active[0].id).classList.remove("active");
                    document.querySelector("#"+active[0].id).addEventListener("click", turnCard, false);
                    document.querySelector("#"+active[1].id).classList.remove("active");
                    document.querySelector("#"+active[1].id).addEventListener("click", turnCard, false);
                    clearTimeout(st);
                    active=[];
                }, 800);
                
            }
            
        }

    };
    cardsondocument.forEach(card => {
        card.addEventListener("click", turnCard, false);
    });
}

document.getElementById("btn-start-game").addEventListener("click", startGame, false);
// document.getElementById("btn-start-game").addEventListener("touchstart", startGame, false);