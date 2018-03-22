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

  await Promise.all(myPromises)
    .then((result)=>{
    result.forEach((Arraymodel)=>{
      Arraymodel.forEach((model) =>{
        allModel.push(model)
      })
    })
    console.log(allModel);
    indexDB(allModel)
  })
  .catch((err) => console.log(err))
}





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

getAllModels();





//createJSON();


async function printModels(){
   let brands = await getAllBrands();
   let models = getAllModels(brands);
   return models
}
/*
printModels().then((models)=>{
  console.log(models)
})*/
