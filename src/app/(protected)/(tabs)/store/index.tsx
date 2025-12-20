import ScreenView from "@/components/ui/Layout/ScreenView";
import LSeachBar from "@/components/ui/LSeachBar";
import { ModalBottomSheet } from "@/components/ui/ModalBottomSheet";
import { appColors } from "@/constant/colors";
import BottomSheet from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
import React, { useRef } from "react";
import { ScrollView, View } from "react-native";

export default function StorePage() {
  // const [searchCategory, setSearchCategory] = useState("");
  // const [showSearchBar, setShowSearchBar] = useState(false);
  // const [searchText, setSearchText] = useState("");
  // const [refreshing, setRefreshing] = useState<boolean>(false);

  // const router = useRouter();
  const bottomSheetRef = useRef<BottomSheet>(null);
  // const { bottom } = useSafeAreaInsets();

  // const height = useSharedValue(0);
  // const opacity = useSharedValue(0);

  // useEffect(() => {
  //   height.value = withTiming(showSearchBar ? 50 : 0, { duration: 300 });
  //   opacity.value = withTiming(showSearchBar ? 1 : 0, { duration: 300 });
  // }, [showSearchBar]);

  // const animatedStyle = useAnimatedStyle(() => {
  //   return {
  //     height: height.value,
  //     opacity: opacity.value
  //   };
  // });

  // const handleOpenSheet = () => bottomSheetRef.current?.expand();

  // const onRefresh = useCallback(async () => {
  //   setRefreshing(true);
  // }, [, refreshing, setRefreshing]);

  return (
    <View style={{ backgroundColor: appColors.white, flex: 1 }}>
      <ScrollView>
        <ScreenView>
          <LSeachBar />
          {/* <ScreenHeader
        headerTitle="Comunity Store"
        leftAction={
          <Search2 size={28} onPress={() => setShowSearchBar(!showSearchBar)} />
        }
      /> */}
          <View className=" gap-2 px-4 pb-2">
            <View className="flex-row items-center justify-between gap-2">
              {/* <Button
                  onPress={() => handleOpenSheet()}
                  variant="secondary"
                  size="sm"
                  text="Category"
                  icon={<MenuIcon size={20} />}
                  className="flex-1"
               />
               <Button
                  size="sm"
                  text="Sell a product"
                  onPress={() => router.push("/store/new-product")}
                  icon={<Plus size={24} color={appColors.blue} />}
                  className="flex-1"
                  style={{ backgroundColor: "red" }}
                  variant="secondary"
                  color={appColors.blue}
               /> */}
            </View>
            {/* {showSearchBar && (
              <Animated.View style={animatedStyle} className="mb-3 mt-1">
                <Searchbar
              placeholder="search..."
              value={searchText}
              onChangeText={setSearchText}
              onPress={() => setSearchText("")}
            />
              </Animated.View>
            )} */}
          </View>

          {/* <FlatList
        ListHeaderComponent={
          <>
            <View style={{ backgroundColor: appColors.background }}>
              <View className="mt-4 px-4">
                <AppText>Featured</AppText>
              </View>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={PRODUCT || []}
                renderItem={({ item }) => (
                  <FeaturedCard item={item} isLoading={isLoading} />
                )}
                contentContainerStyle={{ gap: 10, padding: 10 }}
              />
            </View>
            <View className="p-4">
              <AppText>Latest</AppText>
            </View>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={PRODUCT || []}
              numColumns={2}
              renderItem={({ item }) => (
                <SuggestedProducts item={item} isLoading={isLoading} />
              )}
              columnWrapperStyle={{ gap: 10, margin: 8 }}
              contentContainerStyle={{
                gap: 10,
                padding: 10,
                backgroundColor: appColors.whitesmoke
              }}
            />
          </>
        }
        data={PRODUCT || []}
        renderItem={({ item }) => (
          <StoreCard item={item} isLoading={isLoading} />
        )}
        numColumns={2}
        scrollEnabled
        showsVerticalScrollIndicator={false}
        removeClippedSubviews
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={refetch}
            colors={[appColors.primary]}
          />
        }
        refreshing={refreshing}
        onRefresh={onRefresh}
        bounces
        alwaysBounceVertical
        overScrollMode="always"
        columnWrapperStyle={{ gap: 10, marginVertical: 8 }}
        contentContainerStyle={{
          paddingBottom: 100,
          backgroundColor: appColors.whitesmoke
        }}
      /> */}

          <Portal hostName="root">
            <ModalBottomSheet
              ref={bottomSheetRef}
              title="Search category"
              children={
                <View>
                  {/* <Searchbar
                placeholder="search..."
                onChangeText={(value: string) => setSearchCategory(value)}
              /> */}
                  {/* <FlatList
                data={ProductCategory.filter(item =>
                  item.toLowerCase().includes(searchCategory.toLowerCase())
                )}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <AppText weight="med" cap="capitalize">
                    {item}
                  </AppText>
                )}
                contentContainerStyle={{
                  rowGap: 10,
                  marginTop: 15,
                  paddingBottom: 100
                }}
              /> */}
                </View>
              }
            />
          </Portal>
        </ScreenView>
      </ScrollView>
    </View>
  );
}
