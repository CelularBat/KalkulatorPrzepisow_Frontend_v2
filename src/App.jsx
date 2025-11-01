import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import MainLayout from './Layouts/MainLayout';
import AddRecipe from './Pages/AddRecipe';
import Home from './Pages/Home';
import AddProduct from './Pages/AddProduct';
import Gallery from './Pages/Gallery';

import "primereact/resources/themes/lara-light-cyan/theme.css";

function App() {


  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<MainLayout/>}>
          <Route index element={<Home />}/>
          <Route path="recipe" element={<AddRecipe/>} />
          <Route path="product" element={<AddProduct/>} />
          <Route path="gallery" element={<Gallery/>} />
          
    </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
