import React, {useEffect, useState} from 'react';
import {Platform, SafeAreaView, Text, TouchableOpacity} from 'react-native';
import {PERMISSIONS, requestMultiple, RESULTS} from 'react-native-permissions';

function App(): React.JSX.Element {
  const [isPermission, setIsPermission] = useState<boolean>(false);
  const requestSTTPermissions = async () => {
    try {
      const permissions = Platform.select({
        ios: [PERMISSIONS.IOS.MICROPHONE, PERMISSIONS.IOS.SPEECH_RECOGNITION],
        android: [PERMISSIONS.ANDROID.RECORD_AUDIO],
      });

      if (!permissions) {
        return false;
      }

      const results = await requestMultiple(permissions);

      const resultPermission = Object.values(results).every(
        result => result === RESULTS.GRANTED,
      );
      setIsPermission(resultPermission);
      // 모든 권한이 허용되었는지 확인
      return resultPermission;
    } catch (error) {
      console.error('Permission request failed:', error);
      return false;
    }
  };

  useEffect(() => {
    requestSTTPermissions();
  }, []);

  const addAudioListener = async () => {
    // your lib test
  };

  useEffect(() => {
    if (isPermission) {
      addAudioListener();
    }
  }, [isPermission]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <TouchableOpacity
        style={{
          width: 100,
          height: 50,
          backgroundColor: 'tomato',
          borderRadius: 100,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: '#fff'}}>start</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default App;
