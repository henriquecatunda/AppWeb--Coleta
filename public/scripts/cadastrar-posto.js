 function populateUFs() {


   const ufSelect =  document.querySelector("select[name=uf]")

   fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados").then( res => res.json())
   .then( states => {


            for (const state of states) {
                
           ufSelect.innerHTML += ` <option value="${state.id}"> ${state.nome} </option>`

           
            }

       }
   )

}

 
populateUFs()


function getcities(event){

const citySelect = document.querySelector("[name=city]")
const stateInput = document.querySelector("[name=state]")

const ufvalue = event.target.value

const indexOfselect = event.target.selectedIndex

stateInput.value = event.target.options[indexOfselect].text

const url =` https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufvalue}/municipios`

citySelect.innerHTML = "";

fetch(url)
.then( res => res.json())
.then( cities =>  {


         for (const city of cities) {
             
       citySelect.innerHTML += ` <option value="${city.nome}"> ${city.nome} </option>`

         }

         citySelect.disabled = false;

    } )

}

document

.querySelector("select[name=uf]")
.addEventListener("change", getcities)

// itens de coleta - itens-grid

const itensColeta = document.querySelectorAll(".itens-grid li");

for(const item of itensColeta){

  item.addEventListener("click", handleSelectedItem)
}
   
 const collectedItens = document.querySelector("input[name=itens")

let selectedItens = []

function handleSelectedItem(event){

  const itemLi = event.target

  itemLi.classList.toggle("selected")

  const itemId = itemLi.dataset.id

  const alreadySelected = selectedItens.findIndex( item => {return item == itemId}) 

  if(alreadySelected >= 0 ){

    const filteredItens = selectedItens.filter(item => {
      const itemDiferente = item != itemId
      return itemDiferente
    })

    selectedItens = filteredItens
  }else{

     selectedItens.push(itemId);
  }

    collectedItens.value = selectedItens
 
}