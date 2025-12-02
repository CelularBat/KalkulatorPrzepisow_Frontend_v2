import React from 'react';
import './ProductForm.scss';
import InputNumber from '@pages/_Shared/headless/InputNumber';
import Button3D from '@re/Buttons/Button3D';
import Checkbox_simple_circle from '@re/Checkboxes/Checkbox_simple_circle';
import { usePersistentState } from '@hooks/usePersistentState';
import { useInitialTransition } from '@hooks/useInitialTransition';



function ProductForm({IsProductFormInEditMode,EditRowData,onProductFormSubmit,onProductFormClose}) {

  const initialDataState = {
    name: "",
    brand: "",
    category: "",
    kj: "",
    kcal: "",
    fat: "",
    carb: "",
    sugar: "",
    protein: "",
    salt: "",
    fiber: "",
    public: true,
    link: ""
  };

  const [FormData, setFormData] = usePersistentState( "FormData",initialDataState);

  React.useEffect(()=>{
    if (IsProductFormInEditMode && EditRowData ){
      setFormData(EditRowData);
    }
  },[IsProductFormInEditMode,EditRowData])


  function handleChange(event){
    let {value ,type,name, checked} = event.target;

    switch (type){
      // number is already validated in InputNumber
      case "text":// text validation here
      break;

      case "checkbox":
        value = checked;
      break;
    }
    // Auto kj <-> convertion

    if (name === 'kj'){
      setFormData((prevData)=>({
        ...prevData,
        kj: value,
        kcal: Math.round(0.2390057361 * value).toFixed(0)
      }));  
    }
    else if (name === 'kcal'){
      setFormData((prevData)=>({
        ...prevData,
        kcal: value,
        kj: Math.round(4.184 * value).toFixed(0)
      }));  
    }
    else{
      setFormData((prevData)=>({
        ...prevData,
        [name]: value
      }));  
    }

    
  }

  function cleanForm(){
    setFormData(initialDataState);
  }

  const popup_Ref = React.useRef(null);
  useInitialTransition(popup_Ref,300,{opacity:0.2, transform: "scale(0.85)"});

  /*RENDER */

  return (
 
    <form className="ProductForm" method="post" action="" target="_blank" ref={popup_Ref}
      onSubmit={(event)=>{
        cleanForm();
        onProductFormSubmit(event,FormData);
      }}
    >
    
        {/* Nagłówek i Linia */}
        <h2>Dodaj produkt</h2>
        <span className="header-line"></span>
    
        <div className="form-content-wrapper">
            
            {/* === LEWA KOLUMNA (Nazwa + Wartość Energetyczna) === */}
            <div className="left-column-groups">
                
                <div className="product-info-group"> 
                    <label htmlFor="name">*Nazwa: 
                    <input type="text" name="name" id="name" required maxlength="30"
                    onChange={handleChange} value={FormData.name}/>
                    </label>  
                
                    <label htmlFor="brand">Marka: 
                    <input type="text" name="brand" id="brand" maxlength="30"
                    onChange={handleChange} value={FormData.brand }/>
                    </label>
                
                    <label htmlFor="category">Kategoria: 
                    <input type="text" name="category" id="category" maxlength="30" 
                    onChange={handleChange} value={FormData.category }/>
                    </label>
                </div> {/* koniec product-info-group */}
    
                <div className="energy-value-group">
                    <p><b>Wartość energetyczna:</b></p>  
                    <label htmlFor="kj">*kj: 
                    <InputNumber name="kj" id="kj"  required min="0" max="9999" step="1"
                    onChange={handleChange} value={FormData.kj } />
                    </label>
                
                    <label htmlFor="kcal">*kcal: 
                    <InputNumber name="kcal" id="kcal"  required min="0" max="9999" step="1"
                    onChange={handleChange} value={FormData.kcal } />
                    </label>
                </div> {/* koniec energy-value-group */}
    
            </div> {/* koniec left-column-groups */}
    
    
            {/* === ŚRODKOWA KOLUMNA (Wartość Odżywcza) === */}
            <div className="nutritional-value-group">
                <p><b>Wartość odżywcza w 100g/ml:</b></p> 
            
                <label htmlFor="fat">*Tłuszcze: 
                <InputNumber name="fat" id="fat"  required step="0.1" min="0" max="100"
                onChange={handleChange} value={FormData.fat } />
                </label>
            
                {/* ... Pozostałe pola odżywcze ... */}
                <label htmlFor="carb">*Węglowodany: 
                <InputNumber name="carb" id="carb"  required step="0.1" min="0" max="100"
                onChange={handleChange} value={FormData.carb } />
                </label>
    
                <label htmlFor="sugar">*w tym Cukry: 
                <InputNumber name="sugar" id="sugar"  required step="0.1" min="0" max="100" 
                onChange={handleChange} value={FormData.sugar } />
                </label>
    
                <label htmlFor="protein">*Białko: 
                <InputNumber name="protein" id="protein"  required step="0.1" min="0" max="100"
                onChange={handleChange} value={FormData.protein } />
                </label>
    
                <label htmlFor="salt">*Sól: 
                <InputNumber name="salt" id="salt" required step="0.1" min="0" max="100" 
                onChange={handleChange} value={FormData.salt } />
                </label>
    
                <label htmlFor="fiber">Błonnik: 
                <InputNumber name="fiber" id="fiber"  step="0.1" min="0" max="100" 
                onChange={handleChange} value={FormData.fiber } />
                </label>
            </div> {/* koniec nutritional-value-group */}
    
    
    
    
        </div> {/* koniec form-content-wrapper */}
    
        <div className="link-group">
        <label htmlFor="link">Link do produktu (np. do sklepu): 
          <input type="text"  name="link" id="link" value={FormData.link} onChange={handleChange}/>
        </label>
    
          <label htmlFor="public">Dodaj jako publiczne?
          {/* <input type="checkbox" name="public" id="public"
          onChange={handleChange} value={FormData.public} checked={FormData.public}/>  */}
            <Checkbox_simple_circle input type="checkbox" name="public" id="public" className='green'
          onChange={handleChange} value={FormData.public} checked={FormData.public}/>
          </label>
    
          
    
    
    
        </div> {/* koniec link-group */}
    
        {/* Przyciski na dole */}
        <div className="button-group">
            <Button3D type="submit" className="productBtn add" id="btn_add">
              {IsProductFormInEditMode ? "Potwierdź edycję" : "Dodaj"} 
            </Button3D>     
          
            <Button3D type="button" className="productBtn clear" id="btn_clear" onClick={cleanForm} >
              Wyczyść
            </Button3D>
       
        </div>
    
    </form>
    
    );
}
   




export default ProductForm;



























