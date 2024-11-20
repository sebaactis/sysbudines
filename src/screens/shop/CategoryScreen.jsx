import { StyleSheet, Text} from "react-native";
import { useGetCategoriesQuery } from "../../services/shopService";
import CategoryList from "../../components/category/CategoryList";

export default function CategoryScreen({ navigation }) {

  const { data: categories, error, isLoading} = useGetCategoriesQuery();

  return (
    <>
      <Text style={styles.categoriasTitle}>Categorias</Text>
      <CategoryList categories={categories} navigation={navigation}/>
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
});
