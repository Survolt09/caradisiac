const {getBrands} = require('node-car-api');
const {getModels} = require('node-car-api');
const elasticsearch = require ('elasticsearch')


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

var allMyModels=[]

async function  getAllBrands(){
  const brands = await getBrands();
  return brands;
}

getAllBrands().then(res => res.forEach( async brand =>{
  var models = await getModels(brand);
  console.log(models.length)
  models.forEach( model=>{
    allMyModels.push(model)
    console.log(allMyModels.length)
  })
}))
