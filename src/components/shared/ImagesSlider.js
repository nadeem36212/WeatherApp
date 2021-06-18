import React, { useState } from "react";
import { View, Image, StyleSheet, Animated } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { LDP_SLIDER_HEIGHT, margins, withTheme, SCREEN_WIDTH } from "@common";
import { ActivityLoader } from "../shared/loaderNew";
import { noPhoto, noRoomDark, noRoomLight } from "@ImagesNew";

const ImagesSlider = (props) => {
  const { data, scrollPosition, isLoading = false, theme } = props;

  const [activeSlide, setActiveSlide] = useState(0);

  const imageOpacity = scrollPosition.interpolate({
    inputRange: [LDP_SLIDER_HEIGHT / 8, LDP_SLIDER_HEIGHT / 2],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const renderSliderItem = ({ item }) => {
    return (
      <View style={styles.container}>
        <Animated.Image
          style={{ flex: 1, opacity: imageOpacity }}
          source={{ uri: item }}
        />
      </View>
    );
  };

  return (
    <>
      {!isLoading && data && data.length > 0 ? (
        <>
          <Carousel
            data={data}
            renderItem={renderSliderItem}
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
            sliderWidth={SCREEN_WIDTH}
            itemWidth={SCREEN_WIDTH}
            onSnapToItem={(i) => setActiveSlide(i)}
          />
          <Pagination
            dotsLength={data.length}
            activeDotIndex={activeSlide}
            containerStyle={styles.paginationContainer}
            dotContainerStyle={styles.paginationDotContainer}
            dotStyle={styles.paginationDot}
            inactiveDotScale={1}
          />
        </>
      ) : !isLoading ? (
        <Image
          source={theme.dark ? noRoomDark : noRoomLight}
          style={styles.container}
        />
      ) : (
        <ActivityLoader
          containerStyle={styles.container}
          bgColor={"transparent"}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: LDP_SLIDER_HEIGHT,
  },
  backgroundImageContainer: {
    flex: 1,
  },
  paginationDotContainer: {
    marginHorizontal: 5,
  },
  paginationDot: {
    height: 7,
    width: 7,
    borderRadius: 7 / 2,
    backgroundColor: "white",
    marginHorizontal: 0,
  },
  paginationContainer: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    // marginTop: -23,
    position: "absolute",
    top: LDP_SLIDER_HEIGHT - margins.sm - 7,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default withTheme(ImagesSlider);
