import Button3D from "@re/Buttons/Button3D";

export const DeleteIngredientTemplate = ({rowData,handleDeleteRow})=>{
    return(
        <div style={{display:"flex", alignContent:"center", justifyContent:"center" ,position:"relative",zIndex:0}}>
            {/* <button className="UserTable--button delete-button" 
            style={{maxHeight:"2vh", display:"grid", alignContent:"center", color:"red" 
                ,backgroundColor:"bisque"
            }}
            onClick={()=>handleDeleteRow(rowData)}>
            X</button> */}
            <Button3D className="actionKey red" 
            onClick={()=>handleDeleteRow(rowData)}>
                X
            </Button3D>
        </div>
    );
}