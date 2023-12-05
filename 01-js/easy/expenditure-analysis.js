/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  Transaction - an object like { itemName, category, price, timestamp }.
  Output - [{ category1 - total_amount_spent_on_category1 }, { category2 - total_amount_spent_on_category2 }]
*/

function calculateTotalSpentByCategory(transactions) {
  let map = new Map();
   
  
  transactions.forEach(transaction => {
  
    let { category, price } = transaction;

    if (map.has(category)) {
      map.set(category, price + map.get(category));
    } else {
      map.set(category, price);
    }
  })

  let result = [];

  for (let [key, value] of map) {
    result.push({ category : key , totalSpent : value});
  }
  return result;
}

module.exports = calculateTotalSpentByCategory;
