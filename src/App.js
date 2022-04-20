import React from "react";
import Button from "@mui/material/Button";
import BasicTextFields from "./BasicTextFields";
import SearchAppBar from "./SearchAppBar";
import { useState } from "react";
import ColorTabs from "./ColorTabs";


 
// document.querySelector(".cheese").addEventListener("click", getDrink);
// console.log(document.querySelector(".cheese"));

function getDrink() {
    document.getElementById("ingredients").innerHTML = "<b>Ingredients:</b> ";
    document.getElementById("measurements").innerHTML = "<b>Measurements:</b> ";
    document.getElementById("prep").innerHTML = "<b>Directions:</b> ";

   let drinkChoice = document.getElementById("searchInput").value;
   if (
     drinkChoice === "crap" ||
     drinkChoice === "dogass" ||
     drinkChoice === "shitfuck"
   ) {
     drinkChoice = "apple";
   }
// let drinkChoice = this.refs.myField.getValue();
   console.log(drinkChoice)

   const url =
     "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + drinkChoice;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        document.querySelector("h3").innerHTML = "";
        document.getElementById("pic").src = data
          ? data.drinks[0].strDrinkThumb
          : null;
        document.querySelector("h2").innerHTML = data ? data.drinks[0].strDrink : null;
        document.getElementById("prep").innerHTML +=
          data ? data.drinks[0].strInstructions: null;

        // create list to display all possible ingredients
        // create array of 15 possible ingredients
        //
        for (let i = 1; i < 16; i++) {
          if (data ? data.drinks[0][`strIngredient${i}`] : null != "null") {
            document.getElementById("ingredients").innerHTML +=
              "ingredients include " + data
                ? data.drinks[0][`strIngredient${i}`] + ", "
                : null;
          } else {
            document.getElementById("ingredients").innerHTML += "";
          }
        }

        for (let i = 1; i < 16; i++) {
          if (data ? data.drinks[0][`strMeasure${i}`] : null != "null") {
            document.getElementById("measurements").innerHTML += data
              ? data.drinks[0][`strMeasure${i}`] + ", "
              : null;
          } else {
            document.getElementById("measurements").innerHTML += "";
          }
        }
      })
      .catch((err) => {
        console.log(err);
        document.querySelector("h3").innerHTML = "error: try searching for something else";
      });
}

      


const urlRandom = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

function randomDrink() {
  document.getElementById("ingredients").innerHTML = "<b>Ingredients:</b> ";
  document.getElementById("measurements").innerHTML = "<b>Measurements:</b> ";
  document.getElementById("prep").innerHTML = "<b>Directions:</b> ";

   fetch(urlRandom)
    .then((res) => res.json())
    .then((data) => {
      document.querySelector("h3").innerHTML = "";
      document.getElementById("pic").src = data.drinks[0].strDrinkThumb;
      document.querySelector("h2").innerHTML = data.drinks[0].strDrink;
      document.getElementById("prep").innerHTML +=
        data.drinks[0].strInstructions;

      // create list to display all possible ingredients
      // create array of 15 possible ingredients
      //
       for (let i = 1; i < 16; i++) {
                  if (data ? data.drinks[0][`strIngredient${i}`] : null != "null"){

           document.getElementById("ingredients").innerHTML +=
             "ingredients include " + data
               ? data.drinks[0][`strIngredient${i}`] + ", "
               : null; 
        }else{
            document.getElementById("ingredients").innerHTML += "";         
         }}

       for (let i = 1; i < 16; i++) {
         if (data ? data.drinks[0][`strMeasure${i}`] : null != "null"){
          document.getElementById("measurements").innerHTML += data
            ? data.drinks[0][`strMeasure${i}`] + ", "
            : null;
         }else{
            document.getElementById("measurements").innerHTML +=
                        "";    
         }
      }

    })
    .catch((err) => {
      console.log(err);
      document.querySelector("h3").innerHTML = "try a different name";
    });

}

function App() {
  return (
    <div>
      <SearchAppBar />
      <ColorTabs/>
      <div className="separate">
        <div className="body-content">
          <h2 className="searchForDrinkTitle">Search for a drink</h2>
          <div className="bodytext">
            <h2 id="drinkName"></h2>
            <input id="searchInput"></input>
            <br />
            <Button
              sx={{ m: 1 }}
              color="inherit"
              onClick={getDrink}
              className="cheese"
              variant="outlined"
            >
              Search
            </Button>
            <Button
              color="inherit"
              onClick={randomDrink}
              className="randombutton"
              variant="outlined"
            >
              Random
            </Button>
            <div className="steps">
              <p id="ingredients"></p>
              <p id="measurements"></p>
              <p id="prep"></p>
            </div>
          </div>

          <h3 id="errormessage"></h3>
        </div>
        <div className="imagediv">
          <img id="pic"></img>
        </div>
      </div>
    </div>
  );
}

export default App;
