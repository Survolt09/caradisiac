const {getBrands} = require('node-car-api');
const {getModels} = require('node-car-api');
const elasticsearch = require ('elasticsearch')
  var fs = require('fs');

/*async function print () {
  const brands = await getBrands();

  console.log(brands);
}

print();*/


/*

async function print2 () {
  const models = await getModels('FERRARI');

  console.log(models);
}

print2();*/



async function getAllBrands(){
  var brands = await getBrands();
  console.log("le nombre de marques est : " + brands.length)
  return brands;
}

async function getAllModels(){

  var allModel =[];
  var brands = await getBrands();
  var myPromises = brands.map((brand) =>getModels(brand))

  return await Promise.all(myPromises)
    .then((result)=>{
      for (let brand of result){
        for(let model of brand ){
          allModel.push(model)
        }
      }
    return allModel;
  })
  .catch((err) => console.log(err))
}

async function printModels(){
   let brands = await getAllBrands();
   let allModel = await getAllModels(brands);

   models = {"allModels":[]};
   for (let model of allModel){
     models.allModels.push(model)
   }

   fs.writeFile("models.json" ,JSON.stringify(models) ,'utf8' , (err)=>{
     if(err){
       console.log(err);
     }
     else{
       console.log("Succefully wrote the file")
     }
   })
 }




/*  result.forEach((Arraymodel)=>{
    Arraymodel.forEach((model) =>{
      allModel.push(model)
    })
  })*/

function indexDB(allModel){

      var models;
      allModel.forEach((elem) =>{
        models += `{"index" : {"_index": "restaurants","_type" : "restaurant","_id" : "${elem.uuid}" }}` + "\n"
        models += JSON.stringify(elem) + "\n"
      })

  fs.writeFile("models.json" , models ,'utf8' , (err)=>{
    if(err){
      console.log(err);
    }
    else{
      console.log("Succefully wrote the file")
    }
  })
}


printModels();
//getAllModels();





//createJSON();



/*
printModels().then((models)=>{
  console.log(models)
})*/
