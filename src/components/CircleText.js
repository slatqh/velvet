import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

export default class CircleText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
      category: false,
      categoryData: [],
    };
  }
  componentDidMount() {
    const { userCategory, id } = this.props;
    if (userCategory) {
      const cat = userCategory.includes(Number(id));
      return this.setState({ category: cat });
    }
  }
  // componentWillUpdate(){
  //   const { selected } = this.state;
  //   if(selected !== selected){
  //     return true;
  //   }
  // }
  onCategoryPress() {
    const { selected, category } = this.state;
    if (selected || category) {
      this.setState({ selected: !this.state.selected, category: false });
      return this.props.onSelect(this.state.selected);
    }
    this.setState({ selected: !this.state.selected });
    return this.props.onSelect(!this.state.selected);
  }
  handleCircleStyles() {
    const { selected, category } = this.state;
    if (selected || category) {
      return [this.props.style, { backgroundColor: '#7E354D' }];
    } else if (selected) {
      return [this.props.style, { backgroundColor: '#7E354D' }];
    }
    return this.props.style;
  }
  render() {
    const { selected, category } = this.state;
    return (
      <TouchableOpacity
        style={this.handleCircleStyles()}
        onPress={() => this.onCategoryPress()}>
        <Text style={category || selected ? styles.titleWhite : styles.title}>
          {this.props.name.toUpperCase()}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = {
  title: {
    fontSize: 12,
    color: '#7E354D',
    fontFamily: 'PlayfairDisplay-Regular',
    alignItems: 'center',
  },
  titleWhite: {
    fontSize: 12,
    fontFamily: 'PlayfairDisplay-Regular',
    color: '#f8d18d',
  },
  selected: {
    backgroundColor: '#7E354D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#7E354D',
  },
  default: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  smallCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#7E354D',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  mediumCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: '#7E354D',
    backgroundColor: '#7E354D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  largeCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#7E354D',
    backgroundColor: '#7E354D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallCircleSelected: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#7E354D',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7E354D',
  },
};
