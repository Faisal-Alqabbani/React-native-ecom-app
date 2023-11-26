import {useDispatch, useSelector} from 'react-redux';
import {useCallback} from 'react';
import {
  addToCart,
  removeFromCart,
  updateQuantity,
} from '../redux/features/cartSlice';
import {showToast} from '../redux/features/toastSlice';

const useCart = () => {
  const dispatch = useDispatch();
  // @ts-ignore
  const cartItems = useSelector(state => state?.cart?.items);

  const addItemToCart = useCallback(
    (product: any, quantity = 1) => {
      dispatch(addToCart({...product, quantity}));
      dispatch(
        showToast({
          message: 'You have Added to the cart successfuly',
          status: 'success',
        }),
      );
    },
    [dispatch],
  );

  const removeItemFromCart = useCallback(
    (id: any) => {
      dispatch(removeFromCart(id));
      dispatch(
        showToast({
          message: 'You have removed it from the cart successfuly',
          status: 'success',
        }),
      );
    },
    [dispatch],
  );

  const updateCartItemQuantity = useCallback(
    (id: any, quantity: number) => {
      dispatch(updateQuantity({id, quantity}));
    },
    [dispatch],
  );

  return {
    cartItems,
    addItemToCart,
    removeItemFromCart,
    updateCartItemQuantity,
  };
};

export default useCart;
