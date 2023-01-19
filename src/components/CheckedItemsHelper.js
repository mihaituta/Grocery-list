const CheckedItemsHelper = (foodItems) => {
  //prettier-ignore
  const nrOfCheckedItems = foodItems && foodItems.reduce((nrOfChecks, foodItem) => nrOfChecks + (foodItem.checked === true), 0)

  //all items are checked so the list is completed
  const isListCompleted = foodItems && nrOfCheckedItems === foodItems.length

  //prettier-ignore
  //number of items with prices added
  const nrOfItemsWithPrices = foodItems && foodItems.reduce((nrOfPrices, foodItem) => nrOfPrices + (foodItem.price !== ''), 0)

  //all items are checked and have prices
  const listCompletedWithAllItemsChecked =
    isListCompleted && foodItems.length === nrOfItemsWithPrices

  return {
    nrOfCheckedItems,
    isListCompleted,
    listCompletedWithAllItemsChecked,
  }
}

export default CheckedItemsHelper
