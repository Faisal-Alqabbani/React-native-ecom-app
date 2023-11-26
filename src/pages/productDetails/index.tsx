import React from 'react';
import {View, StyleSheet, ImageBackground, ScrollView} from 'react-native';
import {
  AppHeader,
  PageSpace,
  Text,
  Badge,
  NumberSelector,
  ColorSelector,
  Button,
  ActiveIndicator,
} from '../../components';
import globalStyle from '../../styles/global.style';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import API from '../../api';
import {showToast} from '../../redux/features/toastSlice';
import useCart from '../../hooks/useCart';
interface ProductDetails {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
}
const ProductDetails: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  const {addItemToCart} = useCart();
  const [quantity, setQuantity] = React.useState(1);
  const [isDetailsLoading, setIsDetailsLoading] = React.useState(false);
  const [productDetails, setProductDetails] =
    React.useState<ProductDetails | null>(null);
  React.useEffect(() => {
    getProductDetails({id: route?.params?.id}).then();
  }, [route?.params?.id]);
  const getProductDetails = async ({id}: {id: string | number}) => {
    setIsDetailsLoading(true);
    try {
      const response = await API.APIList.ProductManagement?.getProductById({
        id: id,
      });
      if (response?.withError) {
        dispatch(
          showToast({
            message: 'Something went wrong',
            status: 'error',
          }),
        );
      } else {
        setProductDetails(response?.response);
      }
    } catch (e) {
      dispatch(showToast({message: 'something went wrong', status: 'error'}));
    } finally {
      setIsDetailsLoading(false);
    }
  };
  if (isDetailsLoading) {
    return <ActiveIndicator />;
  }
  return (
    <ScrollView
      style={styles.container}
      bounces={false}
      showsVerticalScrollIndicator={false}>
      <ImageBackground
        source={{
          uri: productDetails?.image,
        }}
        style={styles.backgroundImage}>
        <AppHeader
          leftIcon={{
            name: 'arrow',
            onPress: () => navigation.goBack(),
            color: globalStyle.primaryColor1,
            size: 35,
          }}
          rightIcon={{
            name: 'cancle',
            onPress: () => navigation.goBack(),
            color: 'white',
            bgColor: globalStyle.primaryColor3,
          }}
        />
      </ImageBackground>
      <View style={styles.detailsContainer}>
        <PageSpace size={30} />
        <View style={styles.productDetailsTitle}>
          <Text size={'42'} weight={'bold'} align={'center'}>
            {productDetails?.title}
          </Text>
        </View>
        <PageSpace size={30} />
        <View style={styles.priceBadgeContainer}>
          <Badge
            text={'$42'}
            textStyle={{weight: 'bold', style: {fontSize: 40}}}
            size={'big'}
          />
          <NumberSelector
            initialNumber={1}
            minNumber={1}
            maxNumber={10}
            onValueChange={newValue => setQuantity(newValue)}
          />
        </View>
        <PageSpace />
        <View style={{paddingHorizontal: 20}}>
          <View style={styles.descContainer}>
            <ColorSelector
              colors={['#000000', '#0000FF', '#FF4500']}
              onSelect={color => console.log(`Selected color is ${color}`)}
              selectedColor={''}
              innerBorderColor={globalStyle.bgColor2}
              outerBorderColor={globalStyle.primaryColor1}
            />
            <Text
              size={'25'}
              color={globalStyle.primaryColor3}
              weight={'light'}
              style={{marginHorizontal: 10}}>
              COLOR
            </Text>
          </View>
          <PageSpace />
          <Text size={'20'} weight={'light'}>
            {productDetails?.description}
          </Text>
        </View>
        {/*  Button section*/}
        <PageSpace size={25} />
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Button
            title={'ADD TO CART'}
            type={'secondary'}
            onPress={() => addItemToCart(productDetails, quantity)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalStyle.bgColor2,
  },
  backgroundImage: {
    resizeMode: 'center',
    height: 400,
    justifyContent: 'flex-start',
  },
  detailsContainer: {
    width: '100%',
    flex: 1,
    backgroundColor: globalStyle.bgColor2,
    zIndex: 2,
    marginTop: -25,
    borderRadius: 40,
    paddingRight: 30,
    paddingBottom: 20,
  },
  priceBadgeContainer: {
    position: 'relative',
    height: 120,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  colorSelectorContainer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  descriptionText: {
    paddingHorizontal: 20,
  },
  descContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
  },
  productDetailsTitle: {alignItems: 'center', justifyContent: 'center'},
});

export default ProductDetails;
