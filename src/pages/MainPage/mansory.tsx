import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';

type Item = {
  id: string;
  component: JSX.Element; // Each item is a component (e.g., an image)
  height: number;
};

type MasonryLayoutProps = {
  items: Item[];
  columns: number;
};

const MasonryLayout: React.FC<MasonryLayoutProps> = ({items, columns}) => {
  // Split items into columns
  const [columnData, setColumnData] = useState<Item[][]>([]);

  useEffect(() => {
    const newColumnData = Array.from({length: columns}, () => [] as Item[]);
    let columnHeights = new Array(columns).fill(0);

    items.forEach(item => {
      // Find the shortest column
      const shortestColumnIndex = columnHeights.indexOf(
        Math.min(...columnHeights),
      );
      newColumnData[shortestColumnIndex].push(item);
      columnHeights[shortestColumnIndex] += item.height; // Update the height of the shortest column
    });

    setColumnData(newColumnData);
  }, [items, columns]);

  return (
    <View style={styles.container}>
      {columnData.map((column, index) => (
        <View key={index} style={styles.column}>
          {column.map(item => (
            <View key={item.id} style={{marginBottom: 10}}>
              {item.component}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
  },
});

export default MasonryLayout;
