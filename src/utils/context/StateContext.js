import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ( { children } ) => {
  const [navigation, setNavigation] = useState([]);
  const [authToken, setAuthToken] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [ totalQuantities,setTotalQuantities ] = useState( 0 );
  const [categories, setCategories] = useState({
    groups: [],
    types: {},
  } );

  const onCategoriesChange = useCallback( (content) => {
    setCategories( prevFields => ( {...prevFields, ...content} ));
  },[] );

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find((item) => item._id === product._id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if(checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if(cartProduct.id === product.id) return {
          ...cartProduct,
          quantity: cartProduct.quantity + quantity
        }
      })

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;

      setCartItems([...cartItems, { ...product }]);
    }

    toast.success(`${quantity} of ${product.title} added to the cart.`, {
        position: "bottom-right"
    });
  }

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice -foundProduct.price * foundProduct.quantity);
    setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
    setCartItems(newCartItems);
  }


  return (
    <Context.Provider
      value={{
        cartItems,
        totalPrice,
        totalQuantities,
        onAdd,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
        categories,
        onCategoriesChange,
        navigation,
        setNavigation,
        authToken,
        setAuthToken,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);