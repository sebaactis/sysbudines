import { FlatList, StyleSheet, Text, View, Image, ScrollView, Pressable } from "react-native";
import React from "react";
import FlatCard from "../../components/FlatCard";
import { colors } from "../../global/colors";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../../features/shop/shopSlice";
import { useGetCategoriesQuery } from "../../services/shopService";

export default function CategoryScreen({ navigation }) {

  const { data: categories, error, isLoading} = useGetCategoriesQuery();
  const dispatch = useDispatch();

  const renderCategoryItem = ({ item, index }) => {
    return (
      <Pressable
        onPress={() => {
          dispatch(setCategory(item.nombre))
          navigation.navigate('Productos')
        }
        }>
        <FlatCard
          style={index % 2 === 0 ? { ...styles.row, ...styles.categoryCard } : { ...styles.rowReverse, ...styles.categoryCard }}
        >
          <Image source={{uri: item.image}} style={styles.image} resizeMode="contain" />
          <Text style={styles.cardTitle}>{item.nombre}</Text>
        </FlatCard>
      </Pressable>
    );
  };

  return (
    <>
      <Text style={styles.categoriasTitle}>Categorias</Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={renderCategoryItem}
      />
    </>
  );
}

const styles = StyleSheet.create({
  categoriasTitle: {
    textAlign: "center",
    marginVertical: 30,
    fontSize: 20,
    fontWeight: "800",
    fontFamily: 'Khand-Regular'
  },
  categoryCard: {
    alignItems: 'center',
    backgroundColor: colors.cardColor,
    alignSelf: "center",
    width: "70%",
    marginVertical: 10,
    borderRadius: 14,
  },
  image: {
    width: 180,
    height: 180,
  },
  cardTitle: {
    fontSize: 23,
    fontStyle: "italic"
  },
  row: {
    flexDirection: "row",
  },
  rowReverse: {
    flexDirection: "row-reverse",
  },
});
