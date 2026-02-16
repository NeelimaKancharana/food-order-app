import { createContext, useReducer} from "react";

const CartContext = createContext({
    items: [],
    addItem: (item) => {},
    removeItem: (id) => {},
    clearCart: () => {}
});

function cartReducer(state, action)   // goal of this cartreducer is to update the state
{
    if(action.type === 'ADD_ITEM')
    {
        // .. update the state to add a new item
        const existingCartIndex = state.items.findIndex(
            (item) => item.id === action.item.id);

            const updatedItems = [...state.items];   // this is the copy of the rela cart items
            if(existingCartIndex > -1)  // if it's -1 then the item is already exist in the cart
            {
                const existingItem = state.items[existingCartIndex]  // it returns the item  that exists
               const updatedItem ={
                ...existingItem,
                quantity: existingItem.quantity+1,
               };
               updatedItems[existingCartIndex] = updatedItem;  // update the item at that index 
            }
            else{
               updatedItems.push({...action.item, quantity: 1});  // new items will get initial quaity as 1
            }

            return {...state, items: updatedItems};
    }

    if(action.type === 'REMOVE_ITEM')
    {
        //...remove an item from the state
        const existingCartIndex = state.items.findIndex(
            (item) => item.id === action.id);

        const existingCartItem = state.items[existingCartIndex];

        const updatedItems = [...state.items];
        if(existingCartItem.quantity === 1)
        {
           
            updatedItems.splice(existingCartIndex,1); // first param is at which index you want to delete and how many is second param
       }
       else{
        const updatedItem = {
            ...existingCartItem,
            quantity : existingCartItem.quantity - 1,
        };
        updatedItems[existingCartItem] = updatedItem;
       }
       return {...state, items: updatedItems};
    }

    if(action.type === 'CLEAR_CART')
    {
        return { ...state, items: []};
    }

    return state;
}

export function CartContextProvider({children})
{
     const [cart,dispatchCartAction] = useReducer(cartReducer, { items: []});

     
     function addItem(item)
     {
        dispatchCartAction({type: 'ADD_ITEM',item});
     }

     function removeItem(id)
     {
        dispatchCartAction({type: 'REMOVE_ITEM',id});
     }

     function clearCart()
     {
        dispatchCartAction({type: 'CLEAR_CART'});
     }

     const cartContext = {
        items: cart.items,
        addItem,
        removeItem,
        clearCart
     };
     //console.log(cartContext);

    return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
}

export default CartContext;