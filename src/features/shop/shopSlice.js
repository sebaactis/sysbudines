import { createSlice } from "@reduxjs/toolkit";

const products = [
    {
        id: 1,
        nombre: "Budin de Limon",
        image: "https://firebasestorage.googleapis.com/v0/b/portfolio-e0ccd.appspot.com/o/budin.png?alt=media&token=53db2492-6b68-49d8-a63c-b302e3536dba",
        precio: 8000,
        categoria: "Budines",
        descripcionCorta: "Desc corta",
        descripcionLarga: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab aspernatur cum animi! Ducimus consequatur sequi est, minima, facere obcaecati doloremque, quo tenetur dignissimos fugit perspiciatis similique sed velit nemo ullam."
    },
    {
        id: 3,
        nombre: "Budin de Limon",
        image: "https://firebasestorage.googleapis.com/v0/b/portfolio-e0ccd.appspot.com/o/budin.png?alt=media&token=53db2492-6b68-49d8-a63c-b302e3536dba",
        precio: 8000,
        categoria: "Budines",
        descripcionCorta: "Desc corta",
        descripcionLarga: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab aspernatur cum animi! Ducimus consequatur sequi est, minima, facere obcaecati doloremque, quo tenetur dignissimos fugit perspiciatis similique sed velit nemo ullam."
    },
    {
        id: 4,
        nombre: "Budin de Limon",
        image: "https://firebasestorage.googleapis.com/v0/b/portfolio-e0ccd.appspot.com/o/budin.png?alt=media&token=53db2492-6b68-49d8-a63c-b302e3536dba",
        precio: 8000,
        categoria: "Budines",
        descripcionCorta: "Desc corta",
        descripcionLarga: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab aspernatur cum animi! Ducimus consequatur sequi est, minima, facere obcaecati doloremque, quo tenetur dignissimos fugit perspiciatis similique sed velit nemo ullam."
    },
    {
        id: 2,
        nombre: "Cookies de avena",
        image: "https://firebasestorage.googleapis.com/v0/b/portfolio-e0ccd.appspot.com/o/cookie.png?alt=media&token=32a6cb29-2069-4bfa-a6b9-28a5b5c85121",
        precio: 8000,
        categoria: "Cookies",
        descripcionCorta: "Desc corta",
        descripcionLarga: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab aspernatur cum animi! Ducimus consequatur sequi est, minima, facere obcaecati doloremque, quo tenetur dignissimos fugit perspiciatis similique sed velit nemo ullam."
    },

];

const initialState = {
    products: products,
    categorySelected: "",
    productFilteredCategory: [],
    productSelected: ""
}

export const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {
        setCategory: (state, action) => {
            state.productFilteredCategory = products.filter(product => product.categoria.toLowerCase() === action.payload.toLowerCase())
            state.categorySelected = action.payload
        },
        setProduct: (state, action) => {
            console.log(action.payload);
            state.productSelected = products.find(product => product.id === action.payload)
        }
    }
})

export const { setCategory, setProduct } = shopSlice.actions

export default shopSlice.reducer