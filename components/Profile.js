import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ScrollView, Text } from 'react-native';
import { Avatar, ListItem, Rating } from 'react-native-elements';
import { connect } from 'react-redux';
import { users } from '../redux/reducers/users';

const mapStateToProps = state => ({
    users: state.users,
})





const Profile = ({ users }) => {
    if (users.status.loading) return <Text>Loading User</Text>

    useEffect(() => {
        setUser(users.users[Math.floor(Math.random() * 6)])
    }, [])

    const [user, setUser] = useState(users.users[Math.floor(Math.random() * 6)])

    if (user) {
        return (
            <ScrollView contentContainerStyle={styles.mainContainer}>
                <Avatar
                    rounded
                    icon={{ type: 'font-awesome', name: 'user-o', color: '#fff' }}
                    containerStyle={{ backgroundColor: 'gray', margin: 20 }}
                    size='xlarge'
                    onPress={() => setUser(users.users[Math.floor(Math.random() * 6)])}
                />

                <Text style={{ fontSize: 25 }}>
                    {user.name}
                </Text>

                <Rating
                    readonly
                    // showRating
                    fractions={1}
                    startingValue={user.ratingAverage}
                    style={{ marginBottom: 20 }}
                />

                <View style={{ marginHorizontal: 40 }}>
                    <Text style={{ fontSize: 15 }}>
                        {user.bio}
                    </Text>
                </View>

                <View style={{ borderWidth: 1, width: '80%', marginVertical: 20 }} />

                <View style={{ backgroundColsor: 'red', marginBottom: 20 }}>
                    <Text style={{ textAlign: 'center', fontSize: 25 }}>Ratings</Text>
                </View>
                <View style={{ flexDirection: 'row', marginHorizontal: '10%' }}>

                    <FlatList
                        data={[1, 2, 3, 4, 5]}
                        renderItem={() => (<ListItem
                            leftIcon={{ type: 'font-awesome', name: 'user-o', color: '#000' }}
                            title={'reviewer'}
                            subtitle='placeholder'
                            containerStyle={{}}
                        />)}

                    />
                </View>

            </ScrollView>
        );
    }

    return <Text>LoAdInG ? {user + ''}</Text>
};

const styles = StyleSheet.create({
    mainContainer: {
        alignItems: 'center',
        minHeight: '100%',
    }
})

export default connect(mapStateToProps)(Profile);
