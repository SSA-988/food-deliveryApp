import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const Hotel = ({ item,menu }) => {
  const router = useRouter();
  const menuItems = JSON.stringify(menu);
  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/hotel",
          params: {
            id: item.id,
            name: item.name,
            adress: item.adress,
            smalladress: item.smalladress,
            cuisines: item.cuisines,
            aggregate_rating: item.aggregate_rating,
            menu:menuItems,
          },
        })
      }
      style={{
        marginHorizontal: 6,
        marginVertical: 12,
        borderRadius: 20,
        backgroundColor: "white",
      }}
    >
      <Image
        style={{
          width: "100%",
          aspectRatio: 6 / 4,
          borderTopLeftRadius: 6,
          borderTopRightRadius: 6,
        }}
        source={{ uri: item?.featured_image }}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{}}>
          <Text
            style={{
              paddingHorizontal: 10,
              marginTop: 10,
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            {item?.name}
          </Text>
          <Text
            style={{
              paddingHorizontal: 10,
              marginTop: 3,
              fontSize: 15,
              fontWeight: "500",
              color: "gray",
            }}
          >
            {item?.description}
          </Text>
          <Text
            style={{
              paddingHorizontal: 10,
              marginTop: 3,
              fontSize: 14,
              fontWeight: "500",
              color: "#505050",
            }}
          >
            {item?.time}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#006A4E",
            borderRadius: 4,
            paddingHorizontal: 4,
            paddingVertical: 5,
            marginRight: 10,
            gap: 3,
          }}
        >
          <Text style={{ textAlign: "center", color: "white" }}>
            {item?.aggregate_rating}
          </Text>
          <Ionicons name="ios-star" size={15} color="white" />
        </View>
      </View>
      <View
        style={{
          borderWidth: 0.5,
          borderColor: "#C8C8C8",
          marginHorizontal: 10,
          marginVertical: 4,
        }}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 4,
          marginHorizontal: 8,
          marginVertical: 5,
        }}
      >
        <MaterialCommunityIcons
          name="brightness-percent"
          size={24}
          color="#1F75FE"
        />
        <Text style={{ marginLeft: 2, color: "#1F75FE", fontWeight: "500" }}>
          20% OFF up to Rs 100
        </Text>
      </View>
    </Pressable>
  );
};

export default Hotel;

const styles = StyleSheet.create({});
