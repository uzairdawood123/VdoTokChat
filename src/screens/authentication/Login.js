import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import Container from '../../components/Container';
import { connect } from 'react-redux';

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import ResponsiveText from '../../components/ResponsiveText';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import Fonts from '../../themes/Fonts';
import bg from '../../assets/images/mountain.png';

import {Colors} from '../../themes/Colors';
import User from '../../services/User';
import { logoutUser, storeUserInfo } from '../../redux/user/actions';
import axios from 'axios';

const height = Dimensions.get('window').height;
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPasswordVisible: false,
      userName: '',
      password: '',
      nameError: '',
      passwordError: '',
      loading: false,
      otherError: '',
    };
  }
  componentDidMount(){

  }
  Login = () => {
    const {userName, password} = this.state;

    const Emailreg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (userName.trim().length === 0) {
      this.setState({nameError: 'Enter Email'});
    } else if (!Emailreg.test(userName)) {
      this.setState({nameError: 'Enter Valid Email !'});
    } else if (password.trim().length === 0) {
      this.setState({passwordError: 'Enter Password'});
    } else if (password.trim().length < 8) {
      this.setState({
        passwordError: 'Password must contain atleast 8 characters',
      });
    } else {
      this.setState({
        loading: true,
        passwordError: '',
        nameError: '',
        otherError: '',
      });
      let user = {

        email:this.state.userName,
        password:this.state.password,
        // project_id: '15Q89R'
        project_id: "6NE92I"
      };
      User.Login(user)
      .then(res=>{
        console.log('res on login-->',res.data);
        if(res.data && res.data.status==200){
          this.props.reduxstoreUserInfo(res.data)

        }else{
          this.setState({otherError:res.data.message})
        }
      })
      .catch(err=>{
        console.log('err on login',Object.values(err));
        this.setState({otherError:typeof err.response !== "undefined" ? err.response.data.message : err.message})


      })
      .finally(()=>{
        this.setState({loading:false})
      })
    }
  };
  render() {
    const {nameError, passwordError, otherError} = this.state;
    return (
      <Container
        style={{flex: 1, backgroundColor: Colors.backgroundColor}}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.topContainer}>
            <Image
              source={require('../../assets/images/full_Logo.png')}
              style={styles.logo}
            />
          </View>
          <View style={styles.cardBackground}>
            <ResponsiveText style={styles.loginText}>Sign In</ResponsiveText>
            <InputField
                //   autoFocus
                placeholder={'Enter Email'}
                placeholderTextColor="#C1D7D3"
                value={this.state.userName}
                containerStyle={[
                  styles.usernameInpt,
                  {backgroundColor: nameError ? 'rgba(255, 0, 0,0.15)' : 'white'},
                ]}
                keyboardType={'email-address'}
                onChangeText={(e) => this.setState({userName: e, nameError: ''})}
            />
            <ResponsiveText style={styles.errorText}>
              {nameError}
            </ResponsiveText>
            <InputField
                placeholder={'Enter Password'}
                placeholderTextColor="#C1D7D3"

                containerStyle={[
                  styles.passwordInput,
                  {
                    backgroundColor: passwordError
                        ? 'rgba(255, 0, 0,0.15)'
                        : 'white',
                  },
                ]}
                onChangeText={(e) =>
                    this.setState({password: e, passwordError: ''})
                }
                value={this.state.password}
                secureTextEntry={this.state.isPasswordVisible ? false : true}
                right={
                  <Image
                      source={require('../../assets/icons/eye.png')}
                      style={[
                        styles.eye,
                        {
                          tintColor: this.state.isPasswordVisible
                              ? Colors.Primary
                              : 'grey',
                        },
                      ]}
                  />
                }
                rightPress={() =>
                    this.setState((prev) => ({
                      isPasswordVisible: !prev.isPasswordVisible,
                    }))
                }
            />
            <ResponsiveText style={styles.errorText}>
              {passwordError}
            </ResponsiveText>

            <Button
                loading={this.state.loading}
                text={'Login'}
                containerStyle={styles.Loginbutton}
                textStyle={styles.LoginbuttonText}
                onPress={
                  () => this.Login()
                  //  this.props.navigation.navigate('GetReady')
                }
            />

            <TouchableOpacity
                disabled={this.state.loading}
                onPress={() => this.props.navigation.navigate('Signup')}
                style={{
                  flexDirection: 'row',
                  paddingBottom: wp('5'),
                }}>
              <Text
                  style={{
                    color: "black",
                    // fontFamily: Fonts.RobotoRegular,
                  }}>
                Sign Up
              </Text>
            </TouchableOpacity>
            <ResponsiveText style={styles.errorText}>
              {otherError}
            </ResponsiveText>
          </View>
            {/*<ResponsiveText style={styles.loginText}>Log In</ResponsiveText>*/}
            {/*<InputField*/}
            {/*  //   autoFocus*/}
            {/*  placeholder={'Enter Email'}*/}
            {/*  value={this.state.userName}*/}
            {/*  containerStyle={[*/}
            {/*    styles.usernameInpt,*/}
            {/*    {backgroundColor: nameError ? 'rgba(255, 0, 0,0.15)' : 'white'},*/}
            {/*  ]}*/}
            {/*  keyboardType={'email-address'}*/}
            {/*  onChangeText={(e) => this.setState({userName: e, nameError: ''})}*/}
            {/*/>*/}
            {/*<ResponsiveText style={styles.errorText}>*/}
            {/*  {nameError}*/}
            {/*</ResponsiveText>*/}
            {/*<InputField*/}
            {/*  placeholder={'Enter Password'}*/}
            {/*  containerStyle={[*/}
            {/*    styles.passwordInput,*/}
            {/*    {*/}
            {/*      backgroundColor: passwordError*/}
            {/*        ? 'rgba(255, 0, 0,0.15)'*/}
            {/*        : 'white',*/}
            {/*    },*/}
            {/*  ]}*/}
            {/*  onChangeText={(e) =>*/}
            {/*    this.setState({password: e, passwordError: ''})*/}
            {/*  }*/}
            {/*  value={this.state.password}*/}
            {/*  secureTextEntry={this.state.isPasswordVisible ? false : true}*/}
            {/*  right={*/}
            {/*    <Image*/}
            {/*      source={require('../../assets/icons/eye.png')}*/}
            {/*      style={[*/}
            {/*        styles.eye,*/}
            {/*        {*/}
            {/*          tintColor: this.state.isPasswordVisible*/}
            {/*            ? Colors.Primary*/}
            {/*            : 'grey',*/}
            {/*        },*/}
            {/*      ]}*/}
            {/*    />*/}
            {/*  }*/}
            {/*  rightPress={() =>*/}
            {/*    this.setState((prev) => ({*/}
            {/*      isPasswordVisible: !prev.isPasswordVisible,*/}
            {/*    }))*/}
            {/*  }*/}
            {/*/>*/}
            {/*<ResponsiveText style={styles.errorText}>*/}
            {/*  {passwordError}*/}
            {/*</ResponsiveText>*/}

            {/*<Button*/}
            {/*  loading={this.state.loading}*/}
            {/*  text={'Login'}*/}
            {/*  containerStyle={styles.Loginbutton}*/}
            {/*  textStyle={styles.LoginbuttonText}*/}
            {/*  onPress={*/}
            {/*    () => this.Login()*/}
            {/*    //  this.props.navigation.navigate('GetReady')*/}
            {/*  }*/}
            {/*/>*/}
            {/*<ResponsiveText style={styles.errorText}>*/}
            {/*  {otherError}*/}
            {/*</ResponsiveText>*/}
          {/*</View>*/}
          {/*<TouchableOpacity*/}
          {/*  disabled={this.state.loading}*/}
          {/*  onPress={() => this.props.navigation.navigate('Signup')}*/}
          {/*  style={{*/}
          {/*    flexDirection: 'row',*/}
          {/*    paddingBottom: wp('5'),*/}
          {/*  }}>*/}
          {/*  <Text*/}
          {/*    style={{*/}
          {/*      textDecorationLine: 'underline',*/}
          {/*      // fontFamily: Fonts.RobotoRegular,*/}
          {/*      color: '#7E7E7E',*/}
          {/*    }}>*/}
          {/*    Already have an account?{' '}*/}
          {/*  </Text>*/}
          {/*  <Text*/}
          {/*    style={{*/}
          {/*      color: Colors.Primary,*/}
          {/*      textDecorationLine: 'underline',*/}
          {/*      // fontFamily: Fonts.RobotoRegular,*/}
          {/*    }}>*/}
          {/*    Sign Up*/}
          {/*  </Text>*/}
          {/*</TouchableOpacity>*/}
        </ScrollView>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    reduxstoreUserInfo: (user) => dispatch(storeUserInfo(user)),
    reduxlogoutUser: () => dispatch(logoutUser()),

  };
};
const mapStateToProps = (state) => {
  // console.log('redux state==>',state);
  return {
    user: state.user.user,
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = {
  scrollView: {
    backgroundColor: Colors.backgroundColor,
    marginHorizontal: wp('10'),
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  errorText: {
    fontSize: 3.2,
    color: 'red',
    marginVertical: wp(1.2),
  },
  logo: {
    marginBottom: wp('20'),
    height: wp('15'),
    width: wp('30'),
    resizeMode: 'contain',
  },
  topContainer: {
    backgroundColor: Colors.backgroundColor,
    alignItems: 'center',
    paddingTop: wp('20'),
    paddingHorizontal:wp('5')
  },
  cardBackground: {
    marginBottom: wp('50'),
    paddingHorizontal:wp("5"),
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  loginText: {
    marginBottom: wp('10'),
    paddingTop: wp('10'),

    fontSize: 6.5,
    // fontWeight: 'bold',
    // fontFamily: Fonts.RobotoMedium,
  },
  usernameInpt: {
    // width: wp('80'),
    borderColor: Colors.inputBorder,
    paddingHorizontal: wp('4'),
    // marginBottom: wp('6'),
  },
  passwordInput: {
    // width: wp('80'),
    borderColor: Colors.inputBorder,
    paddingHorizontal: wp('4'),
    // marginBottom: wp('6'),
  },
  eye: {
    height: wp('5.5'),
    width: wp('5.5'),
    padding: wp('2'),
  },
  forgotContainer: {alignSelf: 'flex-end', marginBottom: wp('7')},
  forgotText: {
    textDecorationLine: 'underline',
    color: '#7E7E7E',
    // fontFamily: Fonts.RobotoRegular,
  },

  Loginbutton: {
    width: wp('40'),
    height: wp('12'),
    backgroundColor:Colors.buttonBackground ,
    marginBottom: wp('3.5'),
    elevation: 0,
    marginTop: wp('10'),
  },
  LoginbuttonText: {
    fontSize: 5,
    // fontFamily: Fonts.SourceSansProSemiBold,
  },
};
