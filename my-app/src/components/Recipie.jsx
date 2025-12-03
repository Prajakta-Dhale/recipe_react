import { useEffect, useState } from "react"

export default function Recipe()
{

    const [recipename,setRecipeName]=useState("");
    const [ingredients,setIngredients]=useState("");
    const [instrucions,setInstrucions]=useState("");
    const [recipes,setRecipes]=useState([]);
    const [editingId,setEditingId]=useState(null);

    // Save Recipes to localstorage
    const saveRecipes=(updatedRecipes)=>{
        localStorage.setItem("recipes",JSON.stringify(updatedRecipes));
        setRecipes(updatedRecipes);
    }

    // Load recipes
    useEffect(()=>{
        const storedRecipes=JSON.parse(localStorage.getItem("recipes"))||[];
        setRecipes(storedRecipes);
    },[])

    // Add Recipes
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(!recipename || !ingredients || !instrucions)
        {
            alert("Please fill all feilds");
            return;
        }

        if(editingId)
        {
            const updatedRecipes=recipes.map((r)=>
            r.id===editingId ? {...r,name:recipename,ingredients,instrucions}:r
            )
            saveRecipes(updatedRecipes);
            setEditingId(null);
        }
        else
        {
            const newRecipe={
                id:Date.now(),
                name:recipename,
                ingredients,
                instrucions
            }
            saveRecipes([...recipes,newRecipe]);
        }
        setRecipeName("");
        setIngredients("");
        setInstrucions("");
    }


    // Delete Recipe
    const handleDelete=(id)=>{
        const updatedRecipes=recipes.filter((r)=>r.id!==id)
        saveRecipes(updatedRecipes);
    }

    // Edit Recipe
    const handleEdit=(r)=>{
        setRecipeName(r.name);
        setIngredients(r.ingredients);
        setInstrucions(r.instrucions);
        setEditingId(r.id);
    }

    return(
        <>
        <div style={{maxWidth:"600px",margin:"20px auto",border:"1px solid #ccc",padding:"30px"}}>
            <h1 style={{marginBottom:"20px",border:"1px solid #ccc",padding:"20px"}}>Recipe Book</h1>
            <form onSubmit={handleSubmit}>
            <div style={{marginBottom:"10px"}}>
                <label>Name:</label><br />
                <input type="text" style={{width:"100%",padding:"5px"}} value={recipename} onChange={(e)=>setRecipeName(e.target.value)} />
            </div>

            <div style={{marginBottom:"10px"}}>
                <label>Ingredients:</label><br />
                <input type="text" style={{width:"100%",padding:"5px"}} value={ingredients} onChange={(e)=>setIngredients(e.target.value)}/>
            </div>

            <div style={{marginBottom:"10px"}}>
                <label>Instructions:</label><br />
                <input type="text" style={{width:"100%",padding:"5px"}} value={instrucions} onChange={(e)=>setInstrucions(e.target.value)}/>
            </div>

            <button style={{padding:"5px 10px"}} type="submit">
                {editingId ? "Update Recipe":"Add Recipe"}</button>
        </form>
        </div>

        <div style={{maxWidth:"600px",margin:"20px auto",border:"1px solid #ccc",padding:"30px"}}>
            <h3>All Recipes</h3>
            {recipes.length===0 && <p>No recipes added yet</p>}

            {recipes.map((r)=>(
                <div key={r.id} style={{border:"1px solid #ccc", padding:"10px",marginBottom:"10px"}}>
                    <h4>Recipe Name:{r.name}</h4>
                    <p><strong>Ingredients:</strong></p>
                    <ul>{r.ingredients}</ul>
                    <p><strong>Instructions:{r.instrucions}</strong></p>
                    <button style={{padding:"3px 8px", marginRight:"5px"}} onClick={()=>handleEdit(r)}>Edit</button>
                     <button style={{padding:"3px 8px"}} onClick={()=>handleDelete(r.id)}>Delete</button>
                </div>
            ))}
        </div>
        </>
    )
}