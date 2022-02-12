import React from 'react';

import { Avatar, Badge, Icon, ListItem, Button } from 'react-native-elements';
import { FlatList, StyleSheet, Text, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import { baseUrl } from '../shared/baseUrl';



const mapStateToProps = state => ({
    items: state.items,
})

const ListingInfo = ({ navigation, items }) => {
    const listing = navigation.getParam('listing');
    const author = navigation.getParam('author')


    const renderItemDetailed = ({ item }) => {
        const itemDetails = items.items.find(i => i.id === item.itemId)

        return (
            <ListItem
                leftAvatar={{ source: { uri: baseUrl + itemDetails.image } }}
                containerStyle={{ backgroundColor: null, marginHorizontal: 10, }}

                title={item.quantity + 'x'}
                titleStyle={{ fontWeight: 'bold', fontSize: 18 }}

                subtitle={itemDetails.name}
                subtitleStyle={{ fontWeight: 'bold', fontSize: 15 }}
            />
        )
    }

    return (
        <ScrollView contentContainerStyle={styles.mainContainer}>


            <View style={{ marginTop: 20, width: '100%', flex: 1 }}>

                <View style={{ flexDirection: 'row' }}>

                    <View style={{ flex: 1 }}>
                        <Text style={styles.usernameHeader}>
                            {author.name}
                        </Text>
                    </View>

                    <View style={{ flex: 1 }}>
                        <Text style={styles.usernameHeader}>
                            You
                        </Text>
                    </View>

                </View>


                <View style={{ flexDirection: 'row', flex: 1 }}>

                    <View style={{ flexGrow: 1, borderRightWidth: 1 }}>
                        <FlatList
                            data={listing.authorItems}
                            keyExtractor={item => item.itemId}
                            renderItem={renderItemDetailed}
                            scrollEnabled={false}
                            contentContainerStyle={{ marginTop: 'auto', marginBottom: 'auto' }}
                        />
                    </View>

                    <View style={{ flexGrow: 1, borderLeftWidth: 1 }}>
                        <FlatList
                            data={listing.responderItems}
                            keyExtractor={item => item.itemId}
                            renderItem={renderItemDetailed}
                            scrollEnabled={false}
                            contentContainerStyle={{ marginTop: 'auto', marginBottom: 'auto' }}
                        />
                    </View>


                    {/* In order to get the icon centered vertically and horizontally, a container of full width and height is absolutely positioned over the View, then flex is used to align the icon from within */}
                    <View style={styles.exchangeIconContainer}>
                        <Icon
                            type='font-awesome'
                            name='exchange'
                            color={'orange'}
                            size={25}
                            raised
                            reverse
                        />
                    </View>

                </View>
            </View>


            <View style={{ padding: 10, paddingTop: 30, marginBottom: 10 }}>

                <View style={styles.buttonContainer}>
                    <Button
                        title='Accept Offer'
                        raised
                        buttonStyle={{
                            borderRadius: 35,
                            paddingHorizontal: 30,
                            backgroundColor: 'blue'
                        }}
                    />
                </View>


                <View style={styles.buttonContainer}>
                    <Button
                        title='Make an Offer'
                        raised
                        onPress={() => 3}
                        buttonStyle={{
                            borderRadius: 35,
                            paddingHorizontal: 30,
                        }}
                    />
                </View>

            </View>


        </ScrollView >
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#afd3b1',
        alignItems: 'center',
        minHeight: '100%',
    },
    usernameHeader: {
        textAlign: 'center',
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16,
    },
    exchangeIconContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        margin: 10,
        backgroundColor: 'red',
        borderRadius: 35,
        overflow: 'hidden',
    }
})

export default connect(mapStateToProps)(ListingInfo);
