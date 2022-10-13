import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import ResponsiveText from './ResponsiveText';
import Fonts from '../themes/Fonts';
import { Colors } from '../themes/Colors';

class SingleUserCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {item,onPressChatIcon} = this.props;
    return (
      <TouchableOpacity
          onPress={()=>onPressChatIcon(item)}
      activeOpacity={0}
        // onPress={() => this.props.navigation.navigate('Home')}
        style={styles.cardContainer}>
        {/*<TouchableOpacity onPress={()=>onPressChatIcon(item)}>*/}
        <View style={styles.innerContainer}>
            <View style={styles.UserContainer}>
              <Image
                  source={require('../assets/icons/UserGroup.png')}
              />
              {/*<ResponsiveText style={{color:Colors.Primary}}>{item.full_name.substring(0,1).toUpperCase()}</ResponsiveText>*/}
              {/* <Image
                source={require('../assets/icons/hashtag.png')}
                style={styles.hashtag}
              /> */}
            </View>
          <View style={styles.UserNameContainer}>
            <ResponsiveText style={styles.UserText}>
              {item.full_name}
            </ResponsiveText>
          </View>
        </View>
        {/*<TouchableOpacity onPress={()=>onPressChatIcon(item)} style={{height:'100%',width:'10%',alignItems:'flex-end',justifyContent:'center'}}>*/}
        {/*  <Image*/}
        {/*        source={require('../assets/icons/createChat.png')}*/}
        {/*        style={styles.hashtag}*/}
        {/*      />*/}
        {/*</TouchableOpacity>*/}
        {/*</TouchableOpacity>*/}
      </TouchableOpacity>
    );
  }
}

export default SingleUserCard;
const styles = {
  cardContainer: {
    height: wp('15'),
    // backgroundColor:'red',
    // paddingHorizontal:wp(5),
    backgroundColor: Colors.white,

    borderColor: Colors.white,
    // borderColor:"#white",
    flexDirection:'row',
    justifyContent: 'center',
    alignItems:'center'
  },
  innerContainer: {
    backgroundColor: Colors.white,
    width: '100%',
    height: wp('15'),
    flexDirection: 'row',
    alignItems:'center'
  },
  UserContainer: {
    backgroundColor: Colors.white,

    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },

  UserNameContainer: {
    marginLeft: wp('4.5'),
    // flexGrow:1,
    width: wp('45'),
    height: wp('15'),
    maxHeight: wp('14'),
    overflow: 'hidden',
    // marginTop: wp('1'),
    justifyContent: 'center',
  },
  UserText: {
    // fontFamily: Fonts.OpenSansRegular,
    fontSize: 4.3,
  },
  hashtag: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
    tintColor: Colors.Primary,
  },
};
