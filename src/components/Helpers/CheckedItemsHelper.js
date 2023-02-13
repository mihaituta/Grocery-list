//prettier-ignore
const CheckedItemsHelper = (foodItems) => {
  //nr of checked items
  const nrOfCheckedItems = foodItems && foodItems.reduce((nrOfChecks, foodItem) => nrOfChecks + (foodItem.checked === true), 0)

  //checked items
  const checkedItems = foodItems && foodItems.filter((checkedItem) => checkedItem.checked)

  //all items are checked so the list is completed
  const isListCompleted = foodItems && foodItems.length > 0 && nrOfCheckedItems === foodItems.length

  //number of items with prices added
  const nrOfItemsWithPrices = foodItems && foodItems.reduce((nrOfPrices, foodItem) => nrOfPrices + (foodItem.price !== ''), 0)

  //all items are checked and have prices
  const listCompletedWithAllItemsChecked =
    isListCompleted && foodItems.length === nrOfItemsWithPrices

  return {
    checkedItems,
    nrOfCheckedItems,
    isListCompleted,
    listCompletedWithAllItemsChecked,
  }
}

export default CheckedItemsHelper
