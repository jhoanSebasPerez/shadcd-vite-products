import React, { createContext, useEffect, useState, useCallback } from 'react';
import { Product } from '@/components/table-products/columns';
import { UUID } from 'crypto';


export const AppContext = createContext({
    trigger: false,
    handleTrigger: () => {},
    products: [] as Product[],
    getProduct: Promise<Product>,
    idProduct: "",
    setIdProduct: (id : UUID) => {},
    updateProduct: (product: Product) => {},
    createProduct: (product: Product) => {},
    deleteProduct: (id: UUID) => {},
    isFetching: true, 
});

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [trigger, setTrigger] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [idProduct, setIdProduct] = useState("");
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            //setIsFetching(true);
            const response = await fetch("https://products-endpoint.jhoansebasperez.repl.co/products");
            const data = await response.json();
            
            setProducts(data);
            setTimeout(() => {
                setIsFetching(false);
            }, 1000);
        }
        
        if(isFetching){
            fetchProducts();
        }


    }, [isFetching]);

    const createProduct = async (product: Product) => {
        const response = await fetch("https://products-endpoint.jhoansebasperez.repl.co/products", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });

        if(response.status === 201){
            setProducts([...products, product]);
            setIsFetching(true);
        }

        return response;
    }

    const getProduct: Promise<Product> = async (id) => {
        const response = await fetch(`https://products-endpoint.jhoansebasperez.repl.co/products/${id}`);
        return await response.json();
    }

    const updateProduct = async (product: Product) => {
        const response = await fetch(`https://products-endpoint.jhoansebasperez.repl.co/products/${product.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });

        if(response.status === 200){
            const newProducts = products.map((item) => {
                if(item.id === product.id){
                    return product;
                }
                return item;
            })
            setProducts(newProducts);
        }

        return response;
    }

    const deleteProduct = async (id: UUID) => {
        const response = await fetch(`https://products-endpoint.jhoansebasperez.repl.co/products/${id}`, {
            method: 'DELETE',
        });

        if(response.status === 200){
            const newProducts = products.filter((item) => item.id !== id);
            setProducts(newProducts);
        }

        return response;
    }

    const handleTrigger = () => {
        setTrigger(!trigger);
    }

    return (
        <AppContext.Provider value={{ 
                trigger, 
                handleTrigger, 
                products, 
                getProduct, 
                setIdProduct, 
                isFetching,
                idProduct, 
                updateProduct, 
                createProduct,
                deleteProduct}}>
            {children}
        </AppContext.Provider>
    );
};
