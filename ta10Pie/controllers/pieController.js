////////////////////////////////////////////////////////////////////
function createPie(req, res){
  console.log("Creating a pie...");

  const type = req.body.type;
  const quantity = req.body.quantity;
  const calories = req.body.calories;

  console.log("Type: " + type); //can do (`Type: ${type}`)
  console.log("Quantity: " + quantity);
  console.log("Calories: " + calories);

  const reulst = {id: 3, type: type};
  res.json(result);
}

function getPieTypes(req, res) {
  const pieResults = [
    {id: 12, type: "Cherry"},
    {id: 13, type: "Pumpkin"},
    {id: 14, type: "Pecan"},
    {id: 15, type: "Chocolate"}
  ]; //hard coded values instead of linking to db

  res.json(pieResults);
}

function getPie(req, res) {
  //const id = req.query.id; // ?id
  const id = req.params.id; // /id
  
  console.log(`Request for pie ID: ${id}`);

  const result = {
    id: id,
    type: "cherry",
    calories: 150,
    quantity: 3
  };

  
}


module.exports = {
  createPie: createPie,
  getPie: getPie,
  getPieTypes: getPieTypes
} //allows the above defined funtions to be used outside of this file