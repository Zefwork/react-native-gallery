import * as React from 'react';
import {
  Image,
  TouchableOpacity,
  Text,
  View,
  Modal,
  StyleSheet,
} from 'react-native';

import PhotoGrid from 'react-native-image-grid';

class App extends React.Component {
  constructor () {
    super();
    this.state = {
      imageuri: '',
      ModalVisibleStatus: false,
    };
    this.state = { items: [] };
  }

  componentDidMount() {
    var that = this;
    let items = Array.apply(null, Array(60)).map((v, i) => {
      fetch('https://api.unsplash.com/photos/random?client_id=7bdba7cfd4bd3c6befb607e1e98f48ebf0893cef22e462dca547edb04249d4ce')
		.then(res => res.json())
		.then(data => {
			that.setState({ items });
		})
    });
  }
  renderHeader() {
    //Header of the Screen
    return  <Text style={{ padding: 16, fontSize: 20, color: 'white', backgroundColor: 'blue' }}>
      React Native Image Gallery
            </Text>;
  }
  ShowModalFunction(visible, imageURL) {
    //handler to handle the click on image of Grid
    //and close button on modal
    this.setState({
      ModalVisibleStatus: visible,
      imageuri: imageURL,
    });
  }

  renderItem(item, itemSize, itemPaddingHorizontal) {
    //Single item of Grid
    return (
      <TouchableOpacity
        key={item.id}
        style={{
          width: itemSize,
          height: itemSize,
          paddingHorizontal: itemPaddingHorizontal,
        }}
        onPress={() => {
          this.ShowModalFunction(true, item.src);
        }}>
        <Image
          resizeMode="cover"
          style={{ flex: 1 }}
          source={{ uri: item.src }}
        />
      </TouchableOpacity>
    );
  }

  render() {
    if (this.state.ModalVisibleStatus) {
      //Modal to show full image with close button 
      return (
        <Modal
          transparent={false}
          animationType={'fade'}
          visible={this.state.ModalVisibleStatus}
          onRequestClose={() => {
            this.ShowModalFunction(!this.state.ModalVisibleStatus, '');
          }}>
          <View style={styles.modelStyle}>
            <Image
              style={styles.fullImageStyle}
              source={{ uri: this.state.imageuri }}
            />
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.closeButtonStyle}
              onPress={() => {
                this.ShowModalFunction(!this.state.ModalVisibleStatus, '');
              }}>
              <Image
                source={{
                  uri:
                    'https://image.flaticon.com/icons/png/512/8/8934.png',
                }}
                style={{ width: 25, height: 25, marginTop: 9 }}
              />
            </TouchableOpacity>
          </View>
        </Modal>
      );
    } else {
      return (
        <View style={styles.containerStyle}>
          <PhotoGrid
            data={this.state.items}
            itemsPerRow={4}
            itemMargin={1}
            itemPaddingHorizontal={1}
            renderHeader={this.renderHeader}
            renderItem={this.renderItem.bind(this)}
          />
        </View>
      );
    }
  }
}

export default App;
const styles = StyleSheet.create({
  containerStyle: {
    justifyContent: 'center',
    flex: 1,
    marginTop: 20,
  },
  fullImageStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '98%',
    resizeMode: 'contain',
  },
  modelStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  closeButtonStyle: {
    width: 25,
    height: 25,
    top: 9,
    right: 9,
    position: 'absolute',
  },
});