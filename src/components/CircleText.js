import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

export default class CircleText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
      category: false,
    };
  }
  componentWillMount() {
    const { userCategory, id } = this.props;

    if (userCategory) {
      const cat = userCategory.includes(Number(id));
      return this.setState({ category: cat });
    }
  }

  styleCategory() {
    const { selected } = this.state;
    console.log('CIRCLE ', selected);
    if (selected) {
      this.setState({ selected: !this.state.selected, category: false });
      return this.props.onSelect(this.state.selected);
    }
    this.setState({ selected: !this.state.selected });
    return this.props.onSelect(false);
  }

  render() {
    // console.log('SELECTED CIRCLE', this.state.selected);
    const { selected, category } = this.state;
    return (
      <TouchableOpacity
        style={selected || category ? [this.props.style, { backgroundColor: '#7E354D' }] : this.props.style}
        onPress={() => this.styleCategory()}
      >
        <Text
          style={category || selected ? styles.titleWhite : styles.title}
        >{this.props.name.toUpperCase()}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = {
  title: {
    fontSize: 12,
    color: '#7E354D',
    fontFamily: 'Playfair Display',
  },
  titleWhite: {
    fontSize: 12,
    fontFamily: 'Playfair Display',
    color: 'white',
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
