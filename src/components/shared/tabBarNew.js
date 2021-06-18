import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { withTheme, fontFamily, fontSize } from "@common";
import UnSelectSearch from "../../assets/images/unSelectSearch.svg";
import DarkSearch from "../../assets/images/darkSearch.svg";
import UnSelectInbox from "../../assets/images/unSelectInbox.svg";
import LightInbox from "../../assets/images/lightInbox.svg";
import UnSelectUser from "../../assets/images/unSelectUser.svg";
import LightUser from "../../assets/images/lightUser.svg";
import DeviceInfo from "react-native-device-info";

const routesList = [
  {
    title: "Search",
    // iconName: Search
  },
  {
    title: "Messages",
    // iconName: Inbox
  },
  {
    title: "Profile",
    // iconName: Profile
  },
];

function TabBarNew({ state, descriptors, navigation, theme }) {
  const { routes, index } = state;
  const handlePress = (routeName) => {
    navigation.navigate(routeName);
  };

  let iconSize = 40;

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: theme.colors.background,
        // padding:20,
        paddingBottom: DeviceInfo.hasNotch() ? 20 : 15,
        // paddingTop:0,
        // height: Platform.OS == 'ios' ? 70 : 60,
        borderTopWidth: 0.3,
        borderTopColor: theme.colors.border,
      }}
    >
      {routes.map((route, i) => {
        return (
          <TouchableOpacity
            style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
            key={route.name}
            activeOpacity={1}
            onPress={() => {
              handlePress(route.name);
            }}
          >
            {(() => {
              switch (route.name) {
                case "Explore":
                  if (index !== i)
                    return (
                      <UnSelectSearch width={iconSize} height={iconSize} />
                    );
                  // if (theme.dark)
                  return (
                    <DarkSearch
                      width={iconSize}
                      height={iconSize}
                      style={{ color: theme.colors.brand }}
                    />
                  );
                case "Inbox":
                  if (index !== i)
                    return <UnSelectInbox width={iconSize} height={iconSize} />;
                  return (
                    <LightInbox
                      width={iconSize}
                      height={iconSize}
                      style={{ color: theme.colors.brand }}
                    />
                  );
                case "Profile":
                  if (index !== i)
                    return <UnSelectUser width={iconSize} height={iconSize} />;
                  // if (theme.dark)
                  //     return <DarkUser
                  //         width={iconSize}
                  //         height={iconSize}
                  //     />
                  return (
                    <LightUser
                      width={iconSize}
                      height={iconSize}
                      style={{ color: theme.colors.brand }}
                    />
                  );
                default:
                  <UnSelectUser width={iconSize} height={iconSize} />;
              }
            })()}

            {/* <SvgUri
                       width={50}
                        height={50}
                        fill={colors[1]}
                        fillSecondary={colors[2]}
                        source={Se}
                    /> */}

            <Text
              style={{
                fontFamily: fontFamily.medium,
                fontSize: fontSize.xtiny,
                color:
                  index === i ? theme.colors.barnd : theme.colors.subtleGrey,
              }}
            >
              {routesList[i].title}
            </Text>
            {/* <Image style={styles.icon}
                            source={index === i ? tabIcons.active[route.routeName] : tabIcons.inActive[route.routeName]} /> */}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
export default withTheme(TabBarNew);
