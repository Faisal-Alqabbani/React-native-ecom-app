import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {ImageAsset} from '../index';
import globalStyle from '../../styles/global.style';
import {Text} from '../index';
interface ProductCardProps {
  item: {
    image: string;
    category: string;
    title: string;
    price: string | number;
  };
  onPress: () => void;
  onCartPress?: () => void;
}
const ProductCard: React.FC<ProductCardProps> = ({
  item,
  onPress,
  onCartPress,
}) => {
  const {image, title, category, price} = item;
  const [imageHeight, setImageHeight] = React.useState<number>(
    Dimensions.get('window').width / 2,
  );

  const onImageLoad = (event: {
    nativeEvent: {source: {width: number; height: number}};
  }) => {
    const windowWidth = Dimensions.get('window').width; // Get the screen width
    const maxHeight = 320; // Define the maximum height you want to set

    const {width, height} = event.nativeEvent.source;
    const scaleFactor = width / windowWidth;
    let newHeight = height / scaleFactor;

    // Ensure newHeight does not exceed maxHeight
    if (newHeight > maxHeight) {
      newHeight = maxHeight;
    }

    setImageHeight(newHeight); // Set the image height
  };
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      <View>
        <Image
          source={{
            uri: image,
          }}
          style={[styles.productImage, {height: imageHeight}]}
          onLoad={onImageLoad}
        />
        <View style={styles.productTitle}>
          <Text color={globalStyle.solid_white} align={'left'}>
            {category}
          </Text>
        </View>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.heartIcon} onPress={onCartPress}>
          <ImageAsset name={'cart'} size={20} fill={globalStyle.solid_white} />
        </TouchableOpacity>
        <TouchableOpacity>
          <ImageAsset name={'heartUnSelected'} size={15} fill={'none'} />
        </TouchableOpacity>
      </View>
      <View style={styles.detailsContainer}>
        <Text color={globalStyle.primaryColor2}>${price}</Text>
        <Text weight={'light'} numberOfLines={2} style={{width: 120}}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    margin: 8,
    overflow: 'hidden',
    flex: 1,
  },
  productImage: {
    width: '100%',
    position: 'relative',
    borderRadius: 15,
    overflow: 'hidden',
    resizeMode: 'stretch', // Change this as needed to 'contain' or 'cover'
  },
  productTitle: {
    width: 100,
    position: 'absolute',
    bottom: 5,
    left: 0,
    color: '#FFFFFF',
    backgroundColor: globalStyle.primaryColor1,
    padding: 15,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 10,
  },
  iconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    zIndex: 1, // Make sure icons are above the image
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heartIcon: {
    marginLeft: 16,
    backgroundColor: globalStyle.primaryColor2,
    borderRadius: 150,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  detailsContainer: {
    paddingVertical: 10,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
});

export default ProductCard;
