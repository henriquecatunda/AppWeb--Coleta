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

const indexOfselect = event.target.selectIndex

stateInput.value = event.target.options[indexOfselect]

const url =` https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufvalue}/municipios`


fetch(url).then( res => res.json())
.then( cities =>  {


         for (const city of cities) {
             
       citySelect.innerHTML += ` <option value="${city.id}"> ${city.nome} </option>`

         }

         citySelect.disabled = false;

    } )

}




document

.querySelector("select[name=uf]")
.addEventListener("change", getcities)


        