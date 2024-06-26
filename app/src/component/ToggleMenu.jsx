import React, {useContext} from 'react';
import Context from '../context/Context';
import { StyleSheet, TouchableOpacity, View, Dimensions, Platform } from 'react-native';

import MenuLinks from './button/Menu';
import SOSKitty from './button/SOSKitty'
import { menuTopics as topics } from '../localized/structures';
// import Background from './Background';
import LogOut from './LogOut';

const {width, height} = Dimensions.get('screen');

function ToggleMenu({level}) {
  const {menu, setMenu} = useContext(Context);

  const handlePress = () => setMenu(!menu);

  return !menu ? (
    <TouchableOpacity  style={[styles.containerClose, {display: level >= 25 ? 'none' : 'flex' }]} onPress={handlePress}>
      { [...Array.from({length: 3})].map((_b, i) => <View key={'bar' + i} style={styles.bar} /> )}
    </TouchableOpacity>
  ) : (
    <>
      <LogOut />
      <TouchableOpacity style={styles.container} onPress={handlePress} />
      <View style={styles.shape}/>
      <View style={styles.content}>
        <TouchableOpacity style={styles.close} onPress={handlePress}>
          <View style={[styles.bar, styles.closeBar, { transform: [{ rotate: '45deg' }] }]} />
          <View style={[styles.bar, styles.closeBar, { transform: [{ rotate: '-45deg' }] }]} />
        </TouchableOpacity>
        {
          topics.map(topic => <MenuLinks key={topic + '-menu'} name={topic} />)
        }
        {/* <SOSKitty /> */}
      </View>
    </>

  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 2,
    height,
    width,
  },
  shape: {
    // backgroundColor: 'rgba(196,195,208, 1)',
    backgroundColor: '#FBECC4',
    position: 'absolute',
    width: width * 0.8,
    height,
    borderBottomRightRadius: 1000,
    zIndex: 3,
  },
  content: {
    marginTop: Platform.OS === 'ios' ? 60 : 10,
    height: height * 0.8,
    width: width * 0.8,
    justifyContent: 'space-around',
    position: 'absolute',
    top: 0,
    zIndex: 4
  },
  close: {
    position: 'absolute',
    marginTop: Platform.OS === 'ios' ? -25 : 0,
    right: 20,
    width: 45,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
  },
  containerClose: {
    position: 'absolute',
    // top: (Platform.OS === 'ios' && height > 715) ? 65 : 15,
    top: Platform.OS === 'ios' ? (height > 715 ? 65 : 30) : 15,
    left: 20,
    width: 45,
    height: 30,
    justifyContent: 'space-between',
    zIndex: 100
  },
  bar: {
    backgroundColor: 'black',
    width: '90%',
    height: '20%',
    borderRadius: 15
  },
 
  closeBar: {
    position: 'absolute',
    width: '80%'
  }
})

export default ToggleMenu;
