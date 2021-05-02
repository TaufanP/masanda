import { CompositeNavigationProp } from "@react-navigation/core";
import axios from "axios";
import React, {
  FC,
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { FlatList, StyleSheet, View, RefreshControl } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import SkeletonContent from "react-native-skeleton-content-nonexpo";
import { Plus } from "../../assets";
import api from "../api";
import {
  AppCanvas,
  EmptyState,
  FloatButton,
  ProductTile,
  SearchHeader,
  DetailSheet,
  OverlayArea,
} from "../components";
import {
  routesName as r,
  skeletonLayout as sl,
  spacing as sp,
  strings as str,
} from "../constants";
import { MainProduct } from "../constants/types";
import { myCallback, myMemo } from "../hooks";
import { getProductsApi, searchProductsApi } from "../service";

const sortData = [
  { id: 534, label: "A-Z", value: 1 },
  { id: 549, label: "Z-A", value: 2 },
  { id: 408, label: "Terendah", value: 3 },
  { id: 598, label: "Tertinggi", value: 4 },
];
interface HomeProps {
  navigation: CompositeNavigationProp<any, any>;
}

const Home: FC<HomeProps> = ({ navigation }) => {
  const s = styles();

  const [products, setProducts] = useState<MainProduct[]>([]);
  const [detail, setDetail] = useState<MainProduct>({
    product_name: "",
    image_name: "",
    price: 0,
    _id: "",
    barcode: "",
    product_image: "",
  });
  const [isData, setIsData] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSheet, setIsSheet] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>("");
  const [selectedField, setSelectedField] = useState<number>(0);
  const [sortParam, setSortParam] = useState({
    field: "",
    order: 1,
  });

  const addPress = myCallback(() => navigation.navigate(r.EDITING));
  const bottomSheet = myCallback(() => handleSnapPress(1));

  const sheetRef = useRef<BottomSheet>(null);

  const snapPoints = myMemo(["0%", "60%", "100%"]);
  const searchData = useMemo(() => products, [products]);
  const currentSort = useMemo(() => sortParam, [sortParam]);

  const handleSheetChange = useCallback((index) => {
    if (index == 0) {
      setIsSheet(false);
    }
  }, []);
  const handleSnapPress = useCallback((index) => {
    setIsSheet(true);
    sheetRef.current?.snapTo(index);
  }, []);
  const handleClosePress = useCallback(() => {
    setIsSheet(false);
    sheetRef.current?.close();
  }, []);
  const searchSetter = useCallback((e: string) => setKeyword(e), []);
  const submitAction = useCallback(() => searchProducts(), [
    keyword,
    sortParam,
  ]);
  const extraAction = useCallback(() => clearState(), []);
  const sortAction = useCallback(
    ({ type, order }: any) => settingSortParam({ type, order }),
    [sortParam]
  );
  const overlayAreaPress = useCallback(() => handleClosePress(), []);
  const onPressRight = useCallback(() => handleClosePress(), []);
  const onPressLeft = useCallback(() => {
    handleClosePress();
    navigation.navigate(r.EDITING, { detail, isEditing: true });
  }, [detail]);

  const settingField = useCallback(
    ({ id, value }) => {
      setSelectedField(id);
      const paramsObj =
        value == 1
          ? { field: "product_name", order: 1 }
          : value == 2
          ? { field: "product_name", order: -1 }
          : value == 3
          ? { field: "price", order: 1 }
          : value == 4
          ? { field: "price", order: -1 }
          : { field: "", order: 0 };
      setSortParam(paramsObj);
    },
    [sortParam]
  );

  const detailSetter = (item: MainProduct) => {
    setDetail(item);
    bottomSheet();
  };

  const _getProductsCall = ({ data = [], isSuccess, error }: any) => {
    if (isSuccess) {
      setProducts(data);
      setIsData(true);
      setIsLoading(false);
    } else {
      setIsData(false);
      setIsLoading(false);
      console.log("Home, _getProducts():", error);
    }
    setRefreshing(false);
  };

  const clearState = () => {
    onRefresh();
    setKeyword("");
    setSortParam({ field: "", order: 1 });
  };

  const settingSortParam = ({ type, order }: any) => {
    setSortParam({ field: type, order });
    return;
  };

  const searchProducts = async () => {
    setIsLoading(true);
    setIsData(false);
    const dataSend = { keyword, ...sortParam };
    try {
      const { data } = await searchProductsApi({ dataSend });
      setProducts(data);
      setIsData(true);
      setIsLoading(false);
    } catch (error) {
      console.log("Home, searchProducts", { error });
      setIsData(true);
      setIsLoading(false);
    }
  };

  const _getProducts = async () => {
    setIsLoading(true);
    setIsData(false);
    await getProductsApi()
      .then((res) => _getProductsCall(res))
      .catch((e) => _getProductsCall(e));
  };

  const onRefresh = async () => {
    setRefreshing(true);
    _getProducts();
  };

  const refreshControl = <RefreshControl {...{ refreshing, onRefresh }} />;

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      _getProducts();
    }
    return () => {
      isSubscribed = false;
    };
  }, []);

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      searchProducts();
    }
    return () => {
      isSubscribed = false;
    };
  }, [sortParam]);

  // PRODUCT FLATLIST
  const keyExtractor = (item: MainProduct) => `${item.barcode}`;
  const renderItem = useCallback(
    ({ item }) => <ProductTile item={item} setter={detailSetter} />,
    [products]
  );
  const ListEmptyComponent = (
    <EmptyState onPress={addPress} extraStyle={{ left: -16 }} />
  );

  return (
    <>
      <AppCanvas>
        <SearchHeader
          {...{
            navigation,
            searchData,
            setter: searchSetter,
            submitAction,
            extraAction,
            keyword,
            sortAction,
            currentSort,
            sortData,
            selectedField,
            settingField,
          }}
        />
        <SkeletonContent
          containerStyle={{ flex: 1 }}
          isLoading={isLoading}
          layout={sl.home}
        >
          {isData ? (
            <FlatList
              {...{
                extraData: isData,
                columnWrapperStyle: s.columnWrapper,
                numColumns: 2,
                keyExtractor,
                contentContainerStyle: s.contentContainerFlatlist,
                data: products,
                renderItem,
                ListEmptyComponent,
                refreshControl,
                initialNumToRender: 4,
              }}
            />
          ) : (
            <EmptyState
              onPress={onRefresh}
              title={str.cantLoad}
              subtitle={str.loadDesc}
              buttonText={str.refresh}
              withIcon={false}
            />
          )}
        </SkeletonContent>
        {products.length !== 0 && (
          <FloatButton onPress={addPress}>
            <View style={s.float}>
              <Plus />
            </View>
          </FloatButton>
        )}
      </AppCanvas>
      {isSheet && <OverlayArea onPress={overlayAreaPress} />}
      <BottomSheet
        ref={sheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChange}
      >
        <BottomSheetView style={s.contentContainer}>
          <DetailSheet
            onPressRight={onPressRight}
            detail={detail}
            onPressLeft={onPressLeft}
          />
        </BottomSheetView>
      </BottomSheet>
    </>
  );
};

const styles = () =>
  StyleSheet.create({
    contentContainerFlatlist: {
      paddingVertical: sp.xm,
      paddingHorizontal: sp.xxxm,
    },
    columnWrapper: { justifyContent: "space-between" },
    contentContainer: {
      backgroundColor: "white",
    },
    float: {
      width: 56,
      height: 56,
      justifyContent: "center",
      alignItems: "center",
    },
  });

export default Home;
