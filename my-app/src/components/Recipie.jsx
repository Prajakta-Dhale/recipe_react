import { useState } from "react"

export default function Recipe()
{

    const [recipename,setRecipeName]=useState("");
    const [ingredients,setIngredients]=useState("");
    const [instrucions,setInstrucions]=useState("");
    const [recipe,setRecipes]=useState("");

    // Save Recipes to localstorage
    const saveRecipes=(updatedRecipes)=>{
        localStorage.setItem("recipes",JSON.stringify(updaedRecipes));
        setRecipes(updatedRecipes);
    }

    // Load recipes

    // Add Recipes
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(!recipename || !ingredients || !instrucions)
        {
            alert("Please fill all feilds");
            return;
        }
        else
        {
            const newRecipe={
                id:Date.now(),
                name:recipename,
                ingredients,
                instrucions
            }
            saveRecipes([...setRecipes,newRecipe]);
        }
        setRecipeName("");
        setIngredients("");
        setInstrucions("");
    }
    return(
        <>
        <div style={{maxWidth:"600px",margin:"20px auto",border:"1px solid #ccc",padding:"30px"}}>
            <h1 style={{marginBottom:"20px",border:"1px solid #ccc",padding:"20px"}}>Recipe Book</h1>
            <form>
            <div style={{marginBottom:"10px"}}>
                <label>Name:</label><br />
                <input type="text" style={{width:"100%",padding:"5px"}} />
            </div>

            <div style={{marginBottom:"10px"}}>
                <label>Ingredients:</label><br />
                <input type="text" style={{width:"100%",padding:"5px"}} />
            </div>

            <div style={{marginBottom:"10px"}}>
                <label>Instructions:</label><br />
                <input type="text" style={{width:"100%",padding:"5px"}} />
            </div>

            <button style={{padding:"5px 10px"}} type="submit">Add Recipe</button>
        </form>
        </div>
        </>
    )
}