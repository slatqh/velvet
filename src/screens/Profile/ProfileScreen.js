import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Linking,
  TouchableOpacity,
  Share,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import { Switch } from 'react-native-switch';
import { Icon } from 'react-native-elements';
import { ProfileInput, SocialIcon, MenuText } from '../../components';
import { updateProfile } from './actions';
import { styles } from './styles';
import { Post } from '../../../api/post';

class ProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: () => <Text style={{ fontFamily: 'Raleway' }}>PROFILE</Text>,
    headerStyle: { borderBottomColor: '#ddd',
      shadowOffset: { width: 2, height: 3 },
      shadowColor: '#ddd',
      shadowOpacity: 0.9,
      shadowRadius: 10 },
    headerLeft: <Icon
      containerStyle={{ margin: 10 }}
      onPress={() => navigation.openDrawer()}
      name='menu'
    />,
  })
  state = {
    name: null,
    email: null,
    pass: '',
    phone: '',
    notification: false,
    emailNotification: false,
    editProfile: false,
  };
  async componentDidMount() {
    const data = await Post.getUser();
    this.setState({ name: data.name, email: data.email, phone: data.phone });
  }
  async saveUserProfile() {
    const { name, email } = this.state;
    await this.props.updateProfile(name, email);
    this.setState({ editProfile: false });
  }
  async shareWithFriends() {
    try {
      const result = await Share.share({
        title: 'Velvet magazine',
        message:
          'Velvet magazine',
      });
    } catch (error) {
      Alert.alert('Failed to share');
    }
  }
  render() {
    const { name, email, editProfile } = this.state;
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          overScrollMode='never'
          bounces={false}
        >
          <View style={styles.inner}>
            <Text style={styles.title}>{name}</Text>
            {/* <Text style={[styles.title, { fontSize: 12, padding: 5 }]}>Designer, NY </Text> */}
          </View>
          <View style={styles.inner}>
            <TouchableOpacity
              style={styles.profileButton}
              onPress={() => (!editProfile ? this.setState({ editProfile: true }) : this.saveUserProfile())}
            >
              <Text style={{ fontFamily: 'raleway' }}>{editProfile ? 'Save' : 'Edit'}</Text>
            </TouchableOpacity>
            <ProfileInput
              label='Name'
              editable={this.state.editProfile}
              // onFocus={() => this.setState({ name: '' })}
              defaultValue={name}
              onChangeText={(e) => this.setState({ name: e })}
            />
            <ProfileInput
              label='Email'
              editable={this.state.editProfile}
              // onFocus={() => this.setState({ email: '' })}
              defaultValue={email}
              onChangeText={(e) => this.setState({ email: e })}
            />
            {/* <ProfileInput
              label='Password'
              onFocus={() => this.setState({ password: '' })}
              defaultValue={this.state.password}
              onChangeText={(e) => this.setState({ password: e })}
            /> */}
            <ProfileInput
              editable={this.state.editProfile}
              label='Phone'
              onFocus={() => this.setState({ phone: '' })}
              defaultValue={this.state.phone}
              onChangeText={(e) => this.setState({ phone: e })}
            />
          </View>
          <Text style={styles.settings}>Settings</Text>
          <View style={styles.inner}>
            <ProfileInput
              label='Preferred Categories'
              onPress={() => navigation.navigate('Category')}
              rightIcon={<Icon
                onPress={() => navigation.navigate('Category')}
                type='antdesign'
                name='right'
                size={28}
              />}
              editable={false}
            />
            <ProfileInput
              label='Push Notification'
              editable={false}
              disabled
              rightIcon={<Switch
                onValueChange={() => this.setState({ notification: !this.state.notification })}
                backgroundActive={'black'}
                value={this.state.notification}
              />}
            />
            <ProfileInput
              label='Email Notification'
              editable={false}
              disabled
              rightIcon={<Switch

                onValueChange={() => this.setState({ emailNotification: !this.state.emailNotification })}
                backgroundActive={'black'}
                value={this.state.emailNotification}
              />}
            />
            <ProfileInput
              label='Invite Friends'
              onPress={() => this.shareWithFriends()}
              editable={false}
              rightIcon={<Icon
                onPress={() => this.shareWithFriends()}
                type='antdesign'
                name='right'
                size={28}
              />}
            />
            <ProfileInput
              label='Rate Velvet'
              onPress={() => console.log('pressed')}
              editable={false}
              rightIcon={<Icon
                onPress={() => console.log('pressed')}
                type='antdesign'
                name='right'
                size={28}
              />}
            />
          </View>
          <View style={{ paddingTop: 20, flex: 1 }}>
            <Text style={styles.title}>FOLLOW US</Text>
            <View style={styles.social}>
              <SocialIcon name='facebook' onPress={() => Linking.openURL('https://www.facebook.com/VelvetMagME')} />
              <SocialIcon name='twitter' onPress={() => Linking.openURL('https://twitter.com/velvet_magazine')} />
              <SocialIcon name='instagram' onPress={() => Linking.openURL('https://www.instagram.com/velvetmagazine/')} />
            </View>
            <View style={{ margin: 10 }}>
              <Text style={styles.title}>Visit our other sites:</Text>
              <Text style={styles.siteLinks} onPress={() => Linking.openURL('http://velvet-mag.ru/')}>VELVET RUSSIA</Text>
              <Text style={styles.siteLinks} onPress={() => Linking.openURL('https://velvetmagazine.it/')}>VELVET ITALIA</Text>
              <Text style={styles.siteLinks} onPress={() => Linking.openURL('http://velvet-mag.lat/')}>VELVET LATINOAMERICA</Text>
              <Text style={styles.siteLinks} onPress={() => Linking.openURL('https://www.houseofhend.com/')}>HOUSE OF HEND</Text>
              <Text style={styles.siteLinks} onPress={() => Linking.openURL('https://www.idfweek.com/')}>IDFW</Text>
            </View>
          </View>
          <View style={[styles.footer]}>
            <MenuText title='Show Privacy Policy' style={styles.footerLinks} />
            <MenuText title='Show Terms & Condition' style={styles.footerLinks} />
            <MenuText title='info@velvet.ae' style={{ color: 'black', padding: 5 }} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({ Auth }) => {
  const { name, email } = Auth;
  return { name, email };
};

export default connect(mapStateToProps, { updateProfile })(ProfileScreen);
