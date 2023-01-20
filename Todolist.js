// Source d'apprentissage Mr TRANQUILLIN ainsi que le tuto de CODEEXPLAINED

// Sélectionner les élèments
const clear = document.querySelector(".clear");//Pour effacer
const dateElement = document.getElementById("date");//date
const list = document.getElementById("list");//la liste
const input = document.getElementById("input");//l'input pour écrire

// Les Noms des classes
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// Variables
let LIST, id;

// Recevoir des items du localstorage (NOUVEAU)
let data = localStorage.getItem("TODO");

// Checker la Data si elle est vide
if(data){
    LIST = JSON.parse(data);
    id = LIST.length; // Donner une Id pour le dernier element de la liste
    loadList(LIST); //Charger la liste pour l'utilisateur
}else{
    // Si la data n'est pas vide
    LIST = [];
    id = 0;
}

// Charger les items pour l'utilisateur
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

// Vider le localstorage
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});

// La date
const options = {weekday : "long", month:"short", day:"numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("fr-FR", options);

// Function AddToDo

function addToDo(toDo, id, done, trash){
    
    if(trash){ return; }
    
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    
    const item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                  </li>
                `;
    
    const position = "beforeend";
    
    list.insertAdjacentHTML(position, item);
}

// Ajouter un item en utilisant la touche ENTRÉE
document.addEventListener("keyup",function(even){
    if(event.keyCode == 13){
        const toDo = input.value;
        
        // Si l'input n'est ps vide
        if(toDo){
            addToDo(toDo, id, false, false);
            
            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false
            });
            
            // Ajouter un item sur le localstorage 
            localStorage.setItem("TODO", JSON.stringify(LIST));
            
            id++;
        }
        input.value = "";
    }
});


// completer le to do
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    
    LIST[element.id].done = LIST[element.id].done ? false : true;
}

// Supprimer le to do
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    
    LIST[element.id].trash = true;
}

// Cibler les items

list.addEventListener("click", function(event){
    const element = event.target; // return the clicked element inside list
    const elementJob = element.attributes.job.value; // complete or delete
    
    if(elementJob == "complete"){
        completeToDo(element);
    }else if(elementJob == "delete"){
        removeToDo(element);
    }
    
    // Ajouter un item sur le localstorage 
    localStorage.setItem("TODO", JSON.stringify(LIST));
});