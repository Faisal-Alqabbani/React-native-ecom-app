import React, {useCallback} from 'react';
import {View, TextInput} from 'react-native';
import PageContainer from '../../components/pageContainer';
import MasonryList from '@react-native-seoul/masonry-list';
import {
  ActiveIndicator,
  AppHeader,
  DropDownButton,
  ImageAsset,
  PageSpace,
  ProductCard,
  SearchBar,
} from '../../components';
import {StyleSheet} from 'react-native';
import globalStyle from '../../styles/global.style';
import API from '../../api';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {showToast} from '../../redux/features/toastSlice';
import {RouteConstants} from '../../navigation/constants';
import useCart from '../../hooks/useCart';
import {RootState} from '../../redux/store';
const MainPage: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [products, setProducts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const {addItemToCart} = useCart();
  const productsInCart = useSelector((state: RootState) => state.cart);
  React.useEffect(() => {
    firstCall().then();
  }, []);

  const firstCall = async (sort = 'asc') => {
    setIsLoading(true);
    try {
      const response = await API.APIList.ProductManagement?.getAllProducts({
        limit: 15,
        sort: sort,
      });
      if (response?.withError) {
        dispatch(showToast({message: 'something wrong!', status: 'error'}));
      } else {
        setProducts(response?.response);
      }
    } catch (e) {
      console.log(e);
      dispatch(showToast({message: 'something wrong!', status: 'error'}));
    } finally {
      setIsLoading(false); // End loading
    }
  };
  const renderItem = useCallback(
    ({item}) => {
      return (
        <ProductCard
          item={item}
          onCartPress={() => addItemToCart(item)}
          onPress={() =>
            // @ts-ignore
            navigation.navigate(RouteConstants.PUBLIC_ROUTES.ProductDetails, {
              id: item.id,
            })
          }
        />
      );
    },
    [addItemToCart, navigation],
  );

  const keyExtractor = useCallback(
    (item: {id: {toString: () => any}}) => item.id.toString(),
    [],
  );

  const handleSelect = (selectedSortOption: string) => {
    // Assuming 'sort' is not an actual sort option but rather a placeholder
    if (selectedSortOption !== 'sort') {
      firstCall(selectedSortOption).then();
    }
  };

  const handleCategorySelect = async (name: string) => {
    setIsLoading(true);
    try {
      const response =
        await API.APIList.ProductManagement?.getProductsByCategory(name);
      if (response?.withError) {
        dispatch(showToast({message: 'something wrong!', status: 'error'}));
      } else {
        setProducts(response?.response);
      }
    } catch (e) {
      dispatch(showToast({message: 'something wrong!', status: 'error'}));
    } finally {
      setIsLoading(false);
    }
  };

  // Filter products based on the search query
  const filteredProducts = products.filter(product =>
    product?.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <>
      <AppHeader
        leftIcon={{
          name: 'arrow',
          onPress: () => console.log('Menu pressed'),
          color: globalStyle.primaryColor1,
          size: 35,
        }}
        rightIcon={{
          name: 'cart',
          onPress: () => navigation.navigate(RouteConstants.PUBLIC_ROUTES.CART),
          color: globalStyle.primaryColor1,
          badgeCounter: productsInCart.items.length,
        }}
        title="FEATURE"
        backgroundColor={globalStyle.bgColor1}
        statusBarStyle="default"
      />
      <PageContainer withPadding={true}>
        <PageSpace />
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search products..."
        />
        <View style={styles.dropdownContainer}>
          <View style={styles.categoryDropdowns}>
            <DropDownButton
              withPadding={true}
              type={'secondary'}
              data={[
                'electronics',
                'jewelery',
                "men's clothing",
                "women's clothing",
              ]}
              onSelect={handleCategorySelect}
            />
            <DropDownButton
              withPadding={true}
              type={'secondary'}
              data={['0-100%']}
              onSelect={handleSelect}
            />

            <DropDownButton
              type={'primary'}
              data={['sort', 'desc', 'asc']}
              onSelect={handleSelect}
              borderRadius={10}
            />
          </View>
          <View style={styles.iconContainer}>
            <ImageAsset name={'menu'} size={20} fill={'red'} />
            <ImageAsset name={'list'} size={20} fill={'red'} />
          </View>
        </View>
        {isLoading ? (
          <ActiveIndicator size="large" />
        ) : (
          <MasonryList
            data={filteredProducts}
            keyExtractor={keyExtractor}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            onEndReachedThreshold={0.1}
          />
        )}
      </PageContainer>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Comfortaa , sans-serif',
    fontSize: 20,
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  categoryDropdowns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 0.7,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flex: 0.2,
  },
  searchBar: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginVertical: 10,
    marginHorizontal: 20,
  },
});

export default MainPage;
