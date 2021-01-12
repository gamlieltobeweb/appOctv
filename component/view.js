import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, Dimensions, StyleSheet, Text, View } from 'react-native';
import { Audio, Video } from 'expo-av';
import * as FileSystem from 'expo-file-system';
// import {DocumentPicker} from 'expo-document-picker';
// import DocumentPicker from 'react-native-document-picker';



const { width, height } = Dimensions.get('window')



export default function ViewVideo() {

  // const [videourl, setvideourl] = useState('https://www.youtube.com/watch?v=pXMJxjsK3Bo&list=PLIB9GjPDOoNb8uI4FKicVwLss2mlCRuQn')
  const [videourl, setvideourl] = useState('http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4')
  const [buttontitle, setbuttontitle] = useState("Download")
  const [progressValue, setprogressValue] = useState(0)
  const [totalSize, settotalSize] = useState(0)


  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

 async function addMultipleGifs(gifIds) {
    try {
      await ensureDirExists();
  
      console.log('Downloading', gifIds.length, 'gif files...');
      await Promise.all(gifIds.map(id => FileSystem.downloadAsync(gifUrl(id), gifFileUri(id))));
    } catch (e) {
      console.error("Couldn't download gif files:", e);
    }
  }

  async function downloadVideo() {
    setbuttontitle("Downloading")

    const callback = downloadProgress => {
      settotalSize(formatBytes(downloadProgress.totalBytesExpectedToWrite))
      var progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
      progress = progress.toFixed(2) *100
      setprogressValue(progress.toFixed(0))

      console.log("progress",progress);
      console.log("callback",callback);

    };


    const downloadResumable = FileSystem.createDownloadResumable(
      videourl,
      FileSystem.documentDirectory + 'small.mp4',
      {},
      callback,

    );

    try {
      const { uri } = await downloadResumable.downloadAsync();
      console.log('Finished downloading to ', uri);
      setbuttontitle("Dowloaded")
    } catch (e) {
      console.error(e);
    }
  }

  async function downloadVideodoc(){
    try {
      const results = await DocumentPicker.getDocumentAsync({
        type: '*',copyToCacheDirectory :true,multiple :true
      });
      
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  }
  

  return (
    <View style={styles.container}>

      <Video

        source={require('../media/giorgio-armani-2019-vertical.mp4')}
        // source={{ uri: videourl }}
        rate={1}
        volume={2}
        isMuted={false}
        resizeMode={Video.RESIZE_MODE_CONTAIN}
        // shouldPlay
        isLooping
        useNativeControls
        style={styles.video}
      />
      {/* <Button title={buttontitle} onPress={downloadVideo}></Button> */}
      <View/>
      {/* <Button title={buttontitle} onPress={downloadVideodoc}></Button> */}
      {/* <Button title='goback'></Button>
      <Text style={styles.textprogress} >size:{totalSize}</Text>
      <Text style={styles.textprogress}>progress:{progressValue} %</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  video: {
    width: width,
    height: height / 2,
  },
  textprogress: {
    justifyContent: 'center',
    alignContent: 'center'
    // marginBottom:30,
    // flex:1,
  }
});
