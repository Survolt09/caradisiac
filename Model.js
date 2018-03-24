////////////////////////////////////////
//             Model.js              ///
////////////////////////////////////////


const {getBrands} = require('node-car-api');
const {getModels} = require('node-car-api');
const elasticsearch = require ('elasticsearch')
  var fs = require('fs');


async function getAllBrands(){
  var brands = await getBrands();
  console.log("le nombre de marques est : " + brands.length)
  return brands;
}

async function getAllModels(){

  var allModel ={"Models" : [] };
  var brands = await getBrands();
  var myPromises = brands.map((brand) =>getModels(brand))

  return await Promise.all(myPromises)
    .then((result)=>{
      for (let brand of result){
        for(let model of brand ){
          allModel.Models.push(model)
        }
      }
    return allModel;
  })
  .catch((err) => console.log(err))
}

async function writeModels(){
   let brands = await getAllBrands();
   let allModel = await getAllModels(brands);


   fs.writeFile("models.json" ,JSON.stringify(allModel) ,'utf8' , (err)=>{
     if(err){
       console.log(err);
     }
     else{
       console.log("Succefully wrote the file")
     }
   })
 }

writeModels();
