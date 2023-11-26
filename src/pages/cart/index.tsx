import React from 'react';
import {View, StyleSheet} from 'react-native';
import globalStyle from '../../styles/global.style';
import {AppHeader, PageSpace} from '../../components';
import {Text} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';

const OrderSummaryScreen = () => {
  const navigation = useNavigation();
  const productsInCart = useSelector((state: RootState) => state.cart);

  const totalCost = React.useMemo(() => {
    return productsInCart.items.reduce(
      // @ts-ignore
      (total, item: {price: number; quantity: number}) =>
        total + item.price * item?.quantity,
      0,
    );
  }, [productsInCart.items]);
  return (
    <View style={styles.container}>
      <AppHeader
        leftIcon={{
          name: 'arrow',
          onPress: () => navigation.goBack(),
          color: globalStyle.primaryColor1,
          size: 35,
        }}
        rightIcon={{
          name: 'cart',
          onPress: () => console.log('Cart'),
          color: globalStyle.primaryColor1,
          badgeCounter: productsInCart.items.length,
        }}
        title="CHECKOUT"
        backgroundColor={globalStyle.bgColor1}
        statusBarStyle="default"
      />
      <PageSpace size={50} />

      <View style={styles.mainContainer}>
        <View style={styles.header}>
          {/* TODO: Replace with your actual arrow-down icon */}
          <Text style={styles.arrowDown}>↓</Text>
        </View>
        <View style={styles.itemList}>
          {productsInCart?.items.map((item: any) => (
            <Item
              name={item.title}
              quantity={item.quantity}
              price={item.price}
            />
          ))}
        </View>

        <View style={styles.totalSection}>
          <Item
            name="Delevery:"
            quantity={'UPSTELL'}
            price={0}
            withX={false}
            quantitySize={'20'}
          />
        </View>

        <View style={styles.totalContainer}>
          <Text size={'42'} weight={'bold'}>
            TOTAL:
          </Text>
          <Text size={'42'} color={globalStyle.primaryColor2}>
            ${totalCost.toFixed(2)}
          </Text>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.smiley}>😊</Text>
        <Text size={'46'} color={globalStyle.solid_white}>
          THANK YOU!
        </Text>
      </View>
    </View>
  );
};

// item component
const Item = ({
  name,
  quantity,
  price,
  withX = true,
  quantitySize = '24',
}: {
  name: string;
  quantity: any;
  price: any;
  withX?: boolean;
  quantitySize?: '20' | '24';
}) => (
  <View style={styles.item}>
    <Text style={styles.itemName} size={'20'} weight={'light'}>
      {name}
    </Text>
    <Text style={styles.itemQuantity} size={quantitySize} weight={'light'}>
      {withX && '×'} {quantity}
    </Text>
    <Text style={styles.itemPrice} size={'24'} weight={'light'}>
      ${price}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: globalStyle.primaryColor2,
    borderRadius: 200,
    width: 70,
    position: 'absolute',
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    top: -30,
    left: 150,
  },
  arrowDown: {
    // Styles for your arrow-down icon
    color: 'white',
    fontSize: 24,
    alignSelf: 'center',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: globalStyle.bgColor2,
    height: '100%',
    padding: 20,
    borderRadius: 20,
    position: 'relative',
    paddingTop: 100,
  },
  itemList: {
    // Styles for the item list container
    borderBottomWidth: 1,
    borderColor: 'lightgray',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
    marginBottom: 10,
  },
  itemName: {
    flex: 0.5,
  },
  itemQuantity: {
    flex: 0.3,
    textAlign: 'center',
  },
  itemPrice: {
    flex: 0.3,
    textAlign: 'right',
  },
  totalSection: {
    marginTop: 10,
  },
  totalContainer: {
    // Styles for the total container
    marginTop: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  footer: {
    // Styles for the footer
    height: 250,
    backgroundColor: globalStyle.primaryColor1,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  smiley: {
    // Styles for the smiley icon
    marginBottom: 20,
    fontSize: 60,
    color: 'white',
  },
});

export default OrderSummaryScreen;
