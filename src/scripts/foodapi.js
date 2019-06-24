const div = document.querySelector(".container");

foodFactory = food => {
  return `
    <div class="food"><h2>Food: ${food.name}</h2>
    <p>Category: ${food.category}</p>
    <p>Ethnicity: ${food.ethnicity}</p>
    <p>Ingredients: ${food.ingredients}</div>
    `;
};

addFoodToDom = foodAsHTML => {
  console.log(div.innerHTML, foodAsHTML);
  div.innerHTML += foodAsHTML;
  console.log("div.innerHTML", div.innerHTML);
};

// Gets food json file
fetch("http://localhost:8088/food")
  .then(foods => foods.json())
  .then(parsedFoods => {
    // loops through json food objects
    parsedFoods.forEach(food => {
      // searches api for a barcode matching the food object's
      fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
        .then(response => response.json())
        .then(productInfo => {
            // productInfo.product.ingredients.forEach(function(ingredient)
            // {
            //     food.ingredients = ingredient.text;
            //     console.log(food.ingredients)
            // })
            console.log(productInfo.product.ingredients)
            // string template
            let ingredientString = "";
            // loops over every ingredient in the product json
            productInfo.product.ingredients.forEach(function(ingredient, i, array)
            {
                console.log(ingredient.text)
                console.log(ingredientString)
                // adds . at the end and , and adds to ingredient string
                if (i === array.length-1)
                {
                    ingredientString += ingredient.text + "."
                }
                else
                {
                    ingredientString += ingredient.text + ", "
                }
            });
            // creates ingredients key in foods json equalling the string created
            // then adds it to html
            food.ingredients = ingredientString;
            const foodAsHTML = foodFactory(food);
            addFoodToDom(foodAsHTML);
        });
    //   console.log("parsed food", food);
    //   console.log(foodAsHTML);
    });
  });
