import React from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { ListItem, Icon, Avatar, Badge } from 'react-native-elements';
import { baseUrl } from '../shared/baseUrl';


const mapStateToProps = state => ({
    listings: state.listings,
    items: state.items,
    users: state.users,
})

// https://stackoverflow.com/a/55987414
const formatNumber = n => {
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
}
const Listings = ({ navigation, listings, items, users }) => {

    const renderHorizontalItem = ({ item }) => {
        const itemDetails = items.items.find(i => i.id === item.itemId)

        return (
            <View style={styles.horizontalItemContainer}>
                <Avatar
                    avatarStyle={{ margin: 0, padding: 0 }}
                    size='medium'
                    source={{ uri: baseUrl + itemDetails.image }}
                />

                <Badge
                    value={formatNumber(item.quantity)}
                    badgeStyle={{ borderWidth: 0, padding: 5 }}
                    containerStyle={{ position: 'absolute', bottom: 5, right: 4 }}
                />

            </View >
        )
    }
    const renderListingItem = ({ item }) => {
        const author = users.users.find(user => user.id === item.authorId)

        return (
            <View style={{ borderWidth: 1, borderColor: 'black', marginHorizontal: 15, marginTop: 15, borderRadius: 20, overflow: 'hidden' }}>
                <ListItem
                    leftIcon={{ type: 'font-awesome', name: 'user' }}
                    onPress={() => navigation.navigate("ListingInfo", { listing: item, author: author })}
                    containerStyle={{ backgroundColor: '#efd3b1', borderRadius: 20 }}
                    subtitle={() => (
                        <View style={{ width: "100%", }}>

                            <View style={styles.subtitleContainer}>
                                <View style={styles.subtitleTextContainer}>
                                    <Text style={{ textAlign: 'center' }}>Buy:</Text>
                                </View>

                                <View style={styles.subtitleFlatListContainer}>
                                    <FlatList
                                        horizontal
                                        nestedScrollEnabled
                                        data={item.authorItems}
                                        renderItem={renderHorizontalItem}
                                        key={item => item.name}
                                    />
                                </View>
                            </View>


                            <View style={styles.subtitleContainer}>
                                <View style={styles.subtitleTextContainer}>
                                    <Text style={{ textAlign: 'center' }}>For:</Text>
                                </View>

                                <View style={styles.subtitleFlatListContainer}>
                                    <FlatList
                                        horizontal
                                        nestedScrollEnabled
                                        data={item.responderItems}
                                        renderItem={renderHorizontalItem}
                                        key={item => item.name}
                                    />
                                </View>
                            </View>

                        </View>
                    )}
                />
            </View>
        )
    }


    return (
        <View style={{ paddingTop: 0, backgroundColor: '#cff3d1' }}>
            <FlatList
                data={listings.listings}
                renderItem={renderListingItem}
                keyExtractor={item => item.id}
                style={{ padding: 0 }}


            />
        </View>
    );
};

const styles = StyleSheet.create({
    subtitleContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
    },
    subtitleTextContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    subtitleFlatListContainer: {
        flex: 6,
    },
    horizontalItemContainer: {
        paddingVertical: 10,
        paddingHorizontal: 5,
    }
})

export default connect(mapStateToProps)(Listings);
