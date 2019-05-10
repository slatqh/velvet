import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { Logo, CustomButton, CircleText } from '../../components';
import { updateUserCategory } from './action';
import Colors from '../../../constants/Colors';
import { styles } from './styles';
import { User } from '../../../api/user';

class Category extends Component {
  state = {
    category: [],
  };

  componentDidMount() {
    this.setState({ category: this.props.preferred });
  }

  category(id, selected) {
    if (!selected) {
      this.setState({ category: this.state.category.concat(id) });
    } else {
      const category = this.state.category.filter(i => i !== id);
      this.setState({ category });
    }
  }
  handleButton() {
    const category = [...new Set(this.state.category)];
    this.props.updateUserCategory({ preferred: category });
    this.props.navigation.navigate('Home');
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ImageBackground
          resizeMode="cover"
          style={{ flex: 1 }}
          source={require('../../../assets/images/shapes.png')}>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
              <Logo />
            </View>
            <View
              style={{ flex: 2, alignItems: 'flex-start', paddingLeft: 15 }}>
              <Text style={styles.mainTitle}>SELECT THE</Text>
              <Text style={styles.mainTitle}>CATEGORIES YOU WISH</Text>
              <Text style={styles.mainTitle}>TO KNOW ABOUT</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.circlesContainer}>
                <View style={Styles.circlesWrap}>
                  <CircleText
                    style={[styles.smallCircle, styles.dior]}
                    name="DIOR"
                    id="152"
                    userCategory={this.props.preferred}
                    onSelect={selected => this.category(152, selected)}
                  />
                  <CircleText
                    style={[styles.mediumCircle, styles.drive]}
                    name="DRIVE"
                    id="520"
                    userCategory={this.props.preferred}
                    onSelect={selected => this.category(520, selected)}
                  />
                  <CircleText
                    style={[styles.mediumCircle, styles.dinnig]}
                    name="DINING"
                    id="161"
                    userCategory={this.props.preferred}
                    onSelect={selected => this.category(161, selected)}
                  />
                  <CircleText
                    style={[styles.mediumCircle, styles.week]}
                    name="FASHION"
                    id="170"
                    userCategory={this.props.preferred}
                    onSelect={selected => this.category(170, selected)}
                  />
                  <CircleText
                    style={[styles.smallCircle, styles.art]}
                    name="ART"
                    id="149"
                    userCategory={this.props.preferred}
                    onSelect={selected => this.category(149, selected)}
                  />
                </View>
                <View style={Styles.circlesWrap1}>
                  <CircleText
                    style={[styles.largeCircle, styles.travel]}
                    name="TRAVEL"
                    id="150"
                    userCategory={this.props.preferred}
                    onSelect={selected => this.category(150, selected)}
                  />
                  <CircleText
                    style={[styles.mediumCircle, styles.culture]}
                    name="Holidays"
                    id="160"
                    userCategory={this.props.preferred}
                    onSelect={selected => this.category(160, selected)}
                  />
                  <CircleText
                    style={[styles.mediumCircle, styles.beauty]}
                    name="BEAUTY"
                    id="171"
                    userCategory={this.props.preferred}
                    onSelect={selected => this.category(171, selected)}
                  />
                  <CircleText
                    style={[styles.mediumCircle, styles.shoots]}
                    name="SHOOTS"
                    id="154"
                    userCategory={this.props.preferred}
                    onSelect={selected => this.category(154, selected)}
                  />
                </View>
                <View style={Styles.circlesWrap4}>
                  <CircleText
                    style={[styles.largeCircle, styles.fashion]}
                    name="MEN"
                    id="156"
                    userCategory={this.props.preferred}
                    onSelect={selected => this.category(156, selected)}
                  />
                  <CircleText
                    style={[styles.mediumCircle, styles.hotels]}
                    name="HOTELS"
                    id="159"
                    userCategory={this.props.preferred}
                    onSelect={selected => this.category(159, selected)}
                  />
                  <CircleText
                    style={[styles.mediumCircle, styles.food]}
                    name="FOOD"
                    id="151"
                    userCategory={this.props.preferred}
                    onSelect={selected => this.category(151, selected)}
                  />
                  <CircleText
                    style={[styles.largeCircle, styles.hollidays]}
                    name="CULTURE"
                    id="163"
                    userCategory={this.props.preferred}
                    onSelect={selected => this.category(163, selected)}
                  />
                </View>
                <View style={Styles.circlesWrap3}>
                  <CircleText
                    style={[styles.largeCircle, styles.events]}
                    name="WOMEN"
                    id="155"
                    userCategory={this.props.preferred}
                    onSelect={selected => this.category(155, selected)}
                  />
                  <CircleText
                    style={[styles.largeCircle, styles.expo]}
                    name="EXPERIENCE"
                    id="522"
                    userCategory={this.props.preferred}
                    onSelect={selected => this.category(522, selected)}
                  />
                  <CircleText
                    style={[styles.mediumCircle, styles.dinnig]}
                    name="HEALTH"
                    id="167"
                    userCategory={this.props.preferred}
                    onSelect={selected => this.category(167, selected)}
                  />
                  <CircleText
                    style={[styles.mediumCircle, styles.story]}
                    name="TRUE STORY"
                    id="172"
                    userCategory={this.props.preferred}
                    onSelect={selected => this.category(172, selected)}
                  />
                  <CircleText
                    style={[styles.smallCircle, styles.bag]}
                    name="BAG"
                    id="477"
                    userCategory={this.props.preferred}
                    onSelect={selected => this.category(477, selected)}
                  />
                </View>
                <View style={{ flexDirection: 'column' }}>
                  <CircleText
                    style={[styles.mediumCircle, styles.influ]}
                    name="NEWS"
                    id="152"
                    userCategory={this.props.preferred}
                    onSelect={selected => this.category(152, selected)}
                  />
                  <CircleText
                    style={[styles.mediumCircle, styles.watch]}
                    name="Watches"
                    id="2363"
                    userCategory={this.props.preferred}
                    onSelect={selected => this.category(2363, selected)}
                  />
                  <CircleText
                    style={[styles.largeCircle, styles.enter]}
                    name="FOOD"
                    id="151"
                    userCategory={this.props.preferred}
                    onSelect={selected => this.category(151, selected)}
                  />
                </View>
                <View style={{ flexDirection: 'column' }}>
                  <CircleText
                    style={[styles.mediumCircle, styles.bes]}
                    name="Bespoke"
                    id="2066"
                    userCategory={this.props.preferred}
                    onSelect={selected => this.category(2066, selected)}
                  />
                  <CircleText
                    style={[styles.largeCircle, styles.bus]}
                    name="Business"
                    id="1185"
                    userCategory={this.props.preferred}
                    onSelect={selected => this.category(1185, selected)}
                  />
                  <CircleText
                    style={[styles.mediumCircle, styles.groom]}
                    name="Grooming"
                    id="2213"
                    userCategory={this.props.preferred}
                    onSelect={selected => this.category(2213, selected)}
                  />
                </View>
              </View>
            </ScrollView>
            <View
              style={{
                flex: 1,
                paddingHorizontal: 15,
                justifyContent: 'flex-end',
              }}>
              <CustomButton
                title="CONTINUE"
                color={Colors.black}
                backgroundColor={Colors.white}
                onPress={() => this.handleButton()}
              />
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const Styles = StyleSheet.create({
  circlesWrap: {
    justifyContent: 'center',
    alignContent: 'center',
    flex: 1,
  },
  circlesWrap1: {
    justifyContent: 'center',
    alignContent: 'center',
    flex: 1,
    marginLeft: 15,
  },
  circlesWrap2: {
    justifyContent: 'center',
    alignContent: 'center',
    flex: 1,
  },
  circlesWrap3: {
    marginLeft: -20,
    marginTop: 30,
    justifyContent: 'center',
    alignContent: 'center',
    flex: 1,
  },
  circlesWrap4: {
    justifyContent: 'center',
    alignContent: 'center',
    flex: 1,
  },
});
const mapStatetoProps = ({ Auth }) => {
  const { preferred } = Auth;
  return { preferred };
};
export default connect(
  mapStatetoProps,
  { updateUserCategory },
)(Category);
