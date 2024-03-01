import {
  useDevices,
  useLocalAudio,
  useLocalVideo,
  usePeerIds,
  useRemoteVideo,
  useRoom,
} from '@huddle01/react/dist/hooks';
import {Button, ScrollView, StyleSheet, Text, View} from 'react-native';
import {MediaStream, RTCView} from 'react-native-webrtc';

export default function AppContainer(): JSX.Element {
  const {joinRoom, leaveRoom} = useRoom({
    onJoin: () => {
      console.log('Joined the room');
    },
    onLeave: () => {
      console.log('Left the room');
    },
  });
  const {
    stream: videoStream,
    enableVideo,
    disableVideo,
    changeVideoSource,
  } = useLocalVideo();
  const {
    stream: audioStream,
    enableAudio,
    disableAudio,
    changeAudioSource,
  } = useLocalAudio();
  const {peerIds} = usePeerIds();
  const {getPermission} = useDevices({
    type: 'cam',
  });

  return (
    <ScrollView style={styles.background}>
      <Text style={styles.appTitle}>My Video Conferencing App</Text>

      <View style={styles.controlsSection}>
        <View style={styles.controlsColumn}>
          <View style={styles.controlGroup}>
            <View style={styles.button}>
              <Button
                title="Join Room"
                onPress={() => {
                  joinRoom({
                    roomId: '<YOUR_ROOM_ID>',
                    token: '<YOUR_ACCESS_TOKEN>',
                  });
                }}
              />
              <View style={styles.button}>
                <Button title=" Leave Room" onPress={leaveRoom} />
              </View>
              <View style={styles.button}>
                <Button
                  title="Fetch and Produce Video Stream"
                  onPress={async () => {
                    const status = await getPermission();
                    if (status.permission === 'granted') {
                      await enableVideo();
                    }
                  }}
                />
              </View>
              <View style={styles.button}>
                <Button title=" Disable Video stream" onPress={disableVideo} />
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.videoSection}>
        <Text style={styles.text}>My Video:</Text>
        <View style={styles.myVideo}>
          <RTCView
            objectFit={'cover'}
            streamURL={(videoStream as MediaStream | null)?.toURL() ?? ''}
            zOrder={0}
            style={{
              backgroundColor: 'white',
              width: '75%',
              height: '100%',
            }}
          />
        </View>
        <View>
          {peerIds.map(peerId => {
            return <RemotePeer peerId={peerId} />;
          })}
        </View>
      </View>
    </ScrollView>
  );
}

const RemotePeer = ({peerId}: {peerId: string}) => {
  const {stream} = useRemoteVideo({peerId});

  return (
    <View>
      <RTCView
        streamURL={(stream as MediaStream | null)?.toURL() ?? ''}
        style={{
          backgroundColor: 'white',
          width: '75%',
          height: '100%',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  appTitle: {
    color: '#ffffff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  background: {
    backgroundColor: '#222222',
    height: '100%',
    width: '100%',
    paddingVertical: 50,
  },
  text: {
    color: '#ffffff',
    fontSize: 18,
  },
  infoSection: {
    borderBottomColor: '#fff',
    borderBottomWidth: 2,
    padding: 10,
  },
  infoTab: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 6,
    marginTop: 4,
  },
  infoKey: {
    borderRightColor: '#fff',
    borderRightWidth: 2,
    padding: 4,
  },
  infoValue: {
    flex: 1,
    padding: 4,
  },
  controlsSection: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomColor: '#fff',
    borderBottomWidth: 2,
  },
  controlsColumn: {
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    marginTop: 4,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#fff',
  },
  controlsGroupTitle: {
    color: '#ffffff',
    fontSize: 18,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  controlGroup: {
    marginTop: 4,
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
  },
  videoSection: {},
  myVideo: {
    height: 300,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
});
