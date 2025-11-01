export const DeleteIngredientTemplate = ({rowData,handleDeleteRow})=>{
    return(
        <div style={{display:"flex", alignContent:"center", justifyContent:"center"}}>
            <button className="UserTable--button delete-button" 
            style={{maxHeight:"2vh", display:"grid", alignContent:"center", color:"red" 
                ,backgroundColor:"bisque"
            }}
            onClick={()=>handleDeleteRow(rowData)}>
            X</button>
        </div>
    );
}