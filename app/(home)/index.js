import {
  Alert,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import * as LocationGeocoding from "expo-location";
import { Octicons, Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Carousel from "../../components/Carousel";
import Categories from "../../components/Categories";
import Hotel from "../../components/Hotel";
import { supabase } from "../../supabase";

const index = () => {
  const [locationServicesEnabled, setLocationServicesEnabled] = useState(false);
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    "fetching your location ..."
  );
  const [data,setData] = useState([]);

  useEffect(() => {
    CheckIfLocationEnabled();
    GetCurrentLocation();
  }, []);

  const CheckIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();

    if (!enabled) {
      Alert.alert(
        "Location Services not enabled",
        "Please enable your location services to continue",
        [{ text: "OK" }],
        { cancelable: false }
      );
    } else {
      setLocationServicesEnabled(true);
    }
  };

  const GetCurrentLocation = async () => {
    let { status } = await Location.requestBackgroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission not granted",
        "Allow the app to use the location service",
        [{ text: "OK" }],
        { cancelable: false }
      );
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });
    console.log(location);
    let { coords } = await Location.getCurrentPositionAsync();
    if (coords) {
      const { latitude, longitude } = coords;

      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      const address = await LocationGeocoding.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      const streetAddress = address[0].name;
      for (let item of response) {
        let address = `${item.name}, ${item?.postalCode}, ${item?.city}`;

        setDisplayCurrentAddress(address);
      }
    }
  };
  console.log("my address", displayCurrentAddress);
  const recommended = [
    {
      id: 0,
      name: "Nandhana Palace",
      image:
        "https://b.zmtcdn.com/data/pictures/chains/3/50713/81d0735ce259a6bf800e16bb54cb9e5e.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A",
      time: "35 - 45",
      type: "Andhra",
    },
    {
      id: 0,
      name: "GFC Biriyani",
      image:
        "https://b.zmtcdn.com/data/pictures/0/20844770/f9582144619b80d30566f497a02e2c8d.jpg?output-format=webp&fit=around|771.75:416.25&crop=771.75:416.25;*,*",
      time: "10 - 35",
      type: "North Indian",
    },
    {
      id: 0,
      name: "Happiness Dhaba",
      image:
        "https://b.zmtcdn.com/data/reviews_photos/2f1/c66cf9c2c68f652db16f2c0a6188a2f1_1659295848.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A",
      time: "20 - 25",
      type: "North Indian",
    },

    {
      id: 0,
      name: "Happiness Dhaba",
      image:
        "https://b.zmtcdn.com/data/reviews_photos/2f1/c66cf9c2c68f652db16f2c0a6188a2f1_1659295848.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A",
      time: "20 - 25",
      type: "North Indian",
    },
    {
      id: 0,
      name: "Happiness Dhaba",
      image:
        "https://b.zmtcdn.com/data/reviews_photos/2f1/c66cf9c2c68f652db16f2c0a6188a2f1_1659295848.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A",
      time: "20 - 25",
      type: "North Indian",
    },
  ];
  const items = [
    {
      id: "0",
      name: "Offers",
      description: "Upto 50% off",
      image: "https://cdn-icons-png.flaticon.com/128/9356/9356378.png",
    },
    {
      id: "1",
      name: "Legends",
      description: "Across India",
      image: "https://cdn-icons-png.flaticon.com/128/8302/8302686.png",
    },
    {
      id: "2",
      name: "Gourmet",
      description: "Selections",
      image: "https://cdn-icons-png.flaticon.com/128/1065/1065715.png",
    },
    {
      id: "3",
      name: "Healthy",
      description: "Curated dishes",
      image: "https://cdn-icons-png.flaticon.com/128/415/415744.png",
    },
  ];
  const hotels = [
    {
      id: "0",
      featured_image:
        "https://b.zmtcdn.com/data/pictures/2/18820472/b07647252aae32993047faf13a1cccf4.jpg?fit=around|771.75:416.25&crop=771.75:416.25;*,*",
      images: [
        {
          id: "0",
          image:
            "https://b.zmtcdn.com/data/pictures/chains/8/51828/68d04135bbac1e3d5ff5a87d45974da1.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A",
          description: "Desi Burrito • Rs249",
        },
        {
          id: "0",
          image:
            "https://b.zmtcdn.com/data/pictures/chains/8/51828/1f8008fc1cec3cd7ea2b559c32b1e642.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A",
          description: "Indain Burrito • Rs149",
        },
      ],
      name: "Hauz Khas Social",
      cuisines: "North Indian • Fast Food • 160 for one",
      time: "35 - 40 min • 1Km",
      average_cost_for_two: 1600,
      aggregate_rating: 4.3,
      adress: "9-A & 12, Hauz Khas Village, New Delhi",
      smalladress: "Hauz Khas Village, New Delhi",
      offer: "₹80 OFF",
      no_of_Delivery: 1500,
      latitude: 12.9916,
      longitude: 77.5712,
    },

    {
      id: "1",
      featured_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4rgOs6C9rJuwL_sjJB5n7CeGKEA-Xg2yxIYq025B7_7avmruQHZ0DPpJa8GiSzPkEfas&usqp=CAU",
      name: "Qubitos - The Terrace Cafe",
      cuisines: "Thai, European, Mexican",
      average_cost_for_two: 1500,
      aggregate_rating: 4.5,
      adress:
        "C-7, Vishal Enclave, Opposite Metro Pillar 417, Rajouri Garden, New Delhi",
      smalladress: "Rajouri Garden, New Delhi",
      offer: "₹80 OFF",
      no_of_Delivery: 2500,
      latitude: 12.9716,
      longitude: 77.5946,
      time: "44 min",
    },

    {
      id: "2",
      featured_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTCYsmzl1yfX0MwTN-E_uHC-bk3p181VzjIA&usqp=CAU",
      name: "The Hudson Cafe",
      cuisines: "Cafe, Italian, Continental",
      average_cost_for_two: 850,
      aggregate_rating: 4.3,
      adress:
        "2524, 1st Floor, Hudson Lane, Delhi University-GTB Nagar, New Delhi",
      smalladress: "Delhi University-GTB Nagar",
      offer: "₹60 OFF",
      no_of_Delivery: 1800,
      latitude: 12.9716,
      longitude: 77.5946,
      time: "20 min",
    },

    {
      id: "3",
      featured_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1wuHjGnvTD4Aewe_M2-_5OSwPiPv1kUvMljF-sqoPRzvoFxD06BK2ac2jV-ZmQG6lQTg&usqp=CAU",
      name: "Summer House Cafe",
      cuisines: "Italian, Continental",
      average_cost_for_two: 1850,
      aggregate_rating: 4.1,
      adress:
        "1st Floor, DDA Shopping Complex, Aurobindo Place, Hauz Khas, New Delhi",
      smalladress: "Hauz Khas, New Delhi",
      offer: "₹50 OFF",
      no_of_Delivery: 1700,
      latitude: 12.9716,
      longitude: 77.5946,
      time: "38 min",
    },

    {
      id: "4",
      featured_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXumfbiH2jcIY8xq9QW6B1QGoh3OJ596SnpQ&usqp=CAU",
      name: "38 Barracks",
      cuisines: "North Indian, Italian, Asian",
      average_cost_for_two: 1600,
      aggregate_rating: 4.4,
      adress: "M-38, Outer Circle, Connaught Place, New Delhi",
      smalladress: "Connaught Place, New Delhi",
      offer: "₹70 OFF",
      no_of_Delivery: 1230,
      latitude: 12.9716,
      longitude: 77.5946,
      time: "51 min",
    },
    {
      id: "5",
      featured_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREAW6AHZuQtR_1d9WPZn5mjK_jG-aAJxYfLQ&usqp=CAU",
      name: "Terra Mayaa Restaurant",
      cuisines: "North Indian, Continental, Italian",
      aggregate_rating: 3.5,
      adress: "6th Floor, Anil Plaza 2, G.S. Road, Christian Basti",
      smalladress: "Anil Plaza 2, G.S. Road",
      offer: "₹55 OFF",
      no_of_Delivery: 500,
      latitude: 12.9716,
      longitude: 77.5946,
      time: "42 min",
    },
    {
      id: "6",
      featured_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLvPe-0FZVXXBJkBWf--jnjCcKN6PxD1Zgdw&usqp=CAU",
      name: "Mocha Hotel",
      cuisines: "Cafe, Italian",
      aggregate_rating: 4.2,
      adress: "Christian Basti, Guwahati",
      smalladress: "Christian Basti, Guwahati",
      offer: "₹90 OFF",
      no_of_Delivery: 1100,
      latitude: 12.9716,
      longitude: 77.5946,
      time: "34 min",
    },
    {
      id: "7",
      featured_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScVnb3JlCmtRJUTXo3Tj3dl_ZPjq2ScYFE6g&usqp=CAU",
      name: "4 Seasons",
      cuisines: "Chinese, North Indian",
      aggregate_rating: 4.5,
      adress:
        "Opposite Institute of Social Science, Bhuban Road, Uzan Bazaar, Guwahati",
      smalladress: "Bhuban Road, Uzan Bazaar, Guwahati",
      offer: "₹55 OFF",
      no_of_Delivery: 1500,
      latitude: 12.9716,
      longitude: 77.5946,
      time: "30 min",
    },
    {
      id: "8",
      featured_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsboAN558yvuCNpy0Lm40ZMT7iYZRkfbL6xA&usqp=CAU",
      name: "Shanghai Salsa",
      cuisines: "Continental, Fast Food, Chinese",
      aggregate_rating: 4.1,
      adress:
        "37, 1st Floor, Hatigarh Chariali, Mother Teresa Road, Zoo Tiniali Area, Zoo Tiniali, Guwahati",
      smalladress: "Mother Teresa Road,Guwahati",
      offer: "₹75 OFF",
      no_of_Delivery: 1500,
      latitude: 12.9716,
      longitude: 77.5946,
      time: "45 min",
    },
    {
      id: "9",
      featured_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR30R3IntPKgz0A7WzeylvnDyM8EwmAfE2qXA&usqp=CAU",
      name: "Underdoggs Sports Bar & Grill",
      cuisines: "North Indian, Continental",
      aggregate_rating: 3.9,
      adress:
        "1st Floor, Central Mall, G.S. Road, Sree Nagar, Christian Basti, Guwahati",
      smalladress: "Sree Nagar, Christian Basti, Guwahati",
      offer: "₹70 OFF",
      no_of_Delivery: 2500,
      latitude: 12.9716,
      longitude: 77.5946,
      time: "33 min",
    },
    {
      id: "10",
      featured_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVdGrJhslCsWFMNhndCotN4HNucd_pm9nQSA&usqp=CAU",
      name: "Fat Belly",
      cuisines: "Asian, Chinese, Tibetan",
      aggregate_rating: 4.5,
      adress:
        "Opposite Rabindra Bhawan, GNB Road, Ambari, Dighalipukhuri East, Uzan Bazaar, Guwahati",
      smalladress: "Dighalipukhuri East, Guwahati",
      offer: "₹60 OFF",
      no_of_Delivery: 900,
      latitude: 12.9716,
      longitude: 77.5946,
      time: "53 min",
    },
    {
      id: "11",
      featured_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEO2PLGXFMmFjaR1Kj19mndyPl-Wh4Kbq0Hw&usqp=CAU",
      name: "Makhan Fish and Chicken Corner",
      cuisines: "Asian, Chinese",
      aggregate_rating: 4.5,
      adress:
        "21-A, Near Madaan Hospital, Majitha Road, Basant Nagar, Amritsar",
      smalladress: "Basant Nagar, Amritsar",
      offer: "₹55 OFF",
      no_of_Delivery: 1200,
      latitude: 12.9716,
      longitude: 77.5946,
      time: "43 min",
    },
    {
      id: "12",
      featured_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzUsgy4YrizXUafeKLzAWasb93wvT_TSIvgw&usqp=CAU",
      name: "Bharawan Da Dhaba",
      cuisines: "North Indian, Fast Food",
      aggregate_rating: 3.6,
      adress: "Near Amritsar Municipal Corporation, Town Hall, Amritsar",
      smalladress: "Town Hall, Amritsar",
      offer: "₹70 OFF",
      no_of_Delivery: 1600,
      latitude: 12.9716,
      longitude: 77.5946,
      time: "28 min",
    },
    {
      id: "13",
      featured_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFXsKQIgGajlkt7qydP7TS6xpVD_gKY6ufnw&usqp=CAU",
      name: "The Kulcha Land",
      cuisines: "North Indian,Asian",
      aggregate_rating: 4.3,
      adress:
        "Opposite M.K Hotel, District Shopping Centre, Ranjit Avenue, Amritsar",
      smalladress: "Ranjit Avenue, Amritsar",
      offer: "₹80 OFF",
      no_of_Delivery: 2600,
      latitude: 12.9716,
      longitude: 77.5946,
      time: "32 min",
    },
    {
      id: "14",
      featured_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu0iR3PZXGiNSyJf8XCMHuF13y9KL2owcNYQ&usqp=CAU",
      name: "Brothers Dhaba",
      cuisines: "North Indian",
      aggregate_rating: 4.6,
      adress:
        "Golden Temple Out Road, Opposite Amritsar Municipal Corporation, Town Hall, Amritsar",
      smalladress: "Amritsar",
      offer: "₹65 OFF",
      no_of_Delivery: 1300,
      latitude: 12.9716,
      longitude: 77.5946,
      time: "42 min",
    },
    {
      id: "15",
      featured_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHbn8yLak8QNu-M5P4ttVPHFkvKwz4G48x7w&usqp=CAU",
      name: "Charming Chicken",
      cuisines: "North Indian",
      aggregate_rating: 4.6,
      adress:
        "Golden Temple Out Road, Opposite Amritsar Municipal Corporation, Town Hall, Amritsar",
      smalladress: "Near Basant Nagar, Amritsar",
      offer: "₹45 OFF",
      no_of_Delivery: 700,
      latitude: 12.9716,
      longitude: 77.5946,
      time: "28 min",
    },
    {
      id: "16",
      featured_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsQSJX9mRckG3R7NfvYCRe-08s-z22tX-6nQ&usqp=CAU",
      name: "Beera Chicken Corner",
      cuisines: "North Indian",
      aggregate_rating: 4.4,
      adress:
        "Opposite Bandari Hospital, Sehaj Avenue, Majitha Road, Near White Avenue, Amritsar",
      smalladress: "Near White Avenue, Amritsar",
      offer: "₹80 OFF",
      no_of_Delivery: 1400,
      latitude: 12.9716,
      longitude: 77.5946,
      time: "34 min",
    },
    {
      id: "17",
      featured_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDOJlhGwhda4tsD8Rgk1A97akTRV8QJJC4DA&usqp=CAU",
      name: "Brothers' Amritsari Dhaba",
      cuisines: "North Indian",
      aggregate_rating: 4.2,
      adress: "Phawara Chowk, Town Hall, Amritsar",
      smalladress: "Town Hall, Amritsar",
      offer: "₹40 OFF",
      no_of_Delivery: 1600,
      latitude: 12.9716,
      longitude: 77.5946,
      time: "40 min",
    },
    {
      id: "18",
      featured_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjGqVUxo6HO-CtXn-AHgAin1tvN4l8_A0e1Q&usqp=CAU",
      name: "La Roma Pizzeria",
      cuisines: "Fast Food, Italian",
      aggregate_rating: 4.6,
      adress: " Ranjit Avenue, Amritsar",
      smalladress: " Ranjit Avenue, Amritsar",
      offer: "₹40 OFF",
      no_of_Delivery: 2200,
      latitude: 12.9716,
      longitude: 77.5946,
      time: "46 min",
    },
    {
      id: "19",
      featured_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkpI5t_Hgch4-I9edPRV4YNeZKgMX1iHtQng&usqp=CAU",
      name: "Crystal Restaurant",
      cuisines: "North Indian, Mughlai",
      aggregate_rating: 3.5,
      adress: " Crystal Chowk, Queens Road, INA Colony, Amritsar",
      smalladress: "INA Colony, Amritsar",
      offer: "₹80 OFF",
      no_of_Delivery: 2500,
      latitude: 12.9716,
      longitude: 77.5946,
      time: "22 min",
    },
  ];

  
  useEffect(() => {
    async function fetchData() {
      try {
        const { data, error } = await supabase.from("hotels").select("*");
        console.log("Data:", data);
        if (error) {
          console.error("Error fetching data:", error);
        } else {
          setData(data);
        }
      } catch (error) {
        console.error("Error in fetchData:", error);
      }
    }

    fetchData();
  }, []);


  console.log("data",data)

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#f8f8f8" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
          padding: 10,
        }}
      >
        <Octicons name="location" size={24} color="#E52850" />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 15, fontWeight: "500" }}>Deliver To</Text>
          <Text style={{ color: "gray", fontSize: 16, marginTop: 3 }}>
            {displayCurrentAddress}
          </Text>
        </View>
        <Pressable
          style={{
            backgroundColor: "#6CB4EE",
            width: 40,
            height: 40,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>S</Text>
        </Pressable>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderWidth: 1,
          borderColor: "#C0C0C0",
          paddingVertical: 8,
          paddingHorizontal: 10,
          borderRadius: 11,
          marginTop: 10,
          marginHorizontal: 10,
        }}
      >
        <TextInput placeholder="Search for food, hotels" />
        <AntDesign name="search1" size={24} color="#E52B50" />
      </View>

      <Carousel />

      <Categories />

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {recommended?.map((item, index) => (
          <View
            style={{
              backgroundColor: "white",
              flexDirection: "row",
              margin: 10,
              borderRadius: 8,
            }}
          >
            <View>
              <Image
                style={{
                  width: 100,
                  height: 100,
                  resizeMode: "cover",
                  borderTopLeftRadius: 8,
                  borderBottomLeftRadius: 7,
                }}
                source={{ uri: item?.image }}
              />
            </View>
            <View style={{ padding: 10, flexDirection: "column" }}>
              <Text style={{ fontSize: 15, fontWeight: "500" }}>
                {item?.name}
              </Text>
              <Text
                style={{
                  flex: 1,
                  marginTop: 3,
                  color: "gray",
                  fontWeight: "500",
                }}
              >
                {item?.type}
              </Text>

              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
              >
                <Ionicons name="ios-time" size={24} color="green" />
                <Text>{item?.time} mins</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <Text
        style={{
          textAlign: "center",
          marginTop: 7,
          letterSpacing: 4,
          marginBottom: 5,
          color: "gray",
        }}
      >
        EXPLORE
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {items?.map((item, index) => (
          <View
            key={index}
            style={{
              width: 90,
              borderColor: "#E0E0E0",
              borderWidth: 1,
              paddingVertical: 5,
              paddingHorizontal: 1,
              borderRadius: 5,
              marginLeft:10,
              marginVertical:10,
              alignItems:"center",
              justifyContent:"center",
              backgroundColor:"white"
            }}
          >
            <Image
              style={{ width: 50, height: 50 }}
              source={{ uri: item?.image }}
            />

            <Text style={{fontSize:13,fontWeight:"500",marginTop:6}}>{item?.name}</Text>

            <Text style={{fontSize:12,color:"gray",marginTop:3}}>{item?.description}</Text>
          </View>
        ))}
      </ScrollView>

      <Text style={{textAlign:"center",marginTop:7,letterSpacing:4,marginBottom:5,color:"gray"}}>ALL RESTAURANTS</Text>

      <View style={{marginHorizontal:8}}>
            {data?.map((item,index) => (
                <Hotel key={index} item={item} menu={item?.menu}/>
            ))}
      </View>
    </ScrollView>
  );
};

export default index;

const styles = StyleSheet.create({});
