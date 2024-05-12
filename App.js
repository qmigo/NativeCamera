import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

import { useEffect, useRef, useState } from "react";
import CameraButton from "./src/componenets/CameraButton";

export default function App() {
  const [facing, setFacing] = useState("back");
  const [flash, setFlash] = useState("off");
  const [hasCameraPermission, requestCameraPermission] = useCameraPermissions();
  const [hasMediaPermission, requestMediaPermission] =
    MediaLibrary.usePermissions();

  const [image, setImage] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      if (hasMediaPermission.status != "granted") {
        await requestMediaPermission();
      }
    })();
  }, []);

  if (!hasCameraPermission) {
    return <View></View>;
  }

  if (!hasCameraPermission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ fontWeight: "bold", fontSize: 30, textAlign: "center" }}>
          Unable to access camera
        </Text>
        <Button title="Request Permission" onPress={requestCameraPermission} />
      </View>
    );
  }

  function flipCamera() {
    setFacing((prev) => (prev === "back" ? "front" : "back"));
  }

  function toggleFlash() {
    setFlash((prev) => (prev === "off" ? "on" : "off"));
  }
  async function captureImage() {
    try {
      const data = await cameraRef.current.takePictureAsync();
      setImage(data.uri);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  function retakeImage() {
    setImage(null);
  }
  async function saveImage() {
    if (image) {
      try {
        await MediaLibrary.createAssetAsync(image);
        alert("Image Saved");
      } catch (error) {
        console.log(error);
        alert("Error Saving your image");
      } finally {
        setImage(null);
      }
    }
  }
  return (
    <View style={styles.container}>
      {!image ? (
        <CameraView
          style={styles.camera}
          facing={facing}
          ref={cameraRef}
          flash={flash}
        >
          <CameraButton
            icon={flash === "off" ? "flash-off" : "flash"}
            onPress={toggleFlash}
            disabled={flash}
          />
          <CameraButton icon="camera-flip" onPress={flipCamera}></CameraButton>
        </CameraView>
      ) : (
        <Image source={{ uri: image }} style={styles.camera} />
      )}
      {image ? (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 30,
          }}
        >
          <CameraButton title="Retake" icon="backspace" onPress={retakeImage} />
          <CameraButton
            title="Save"
            icon="check"
            onPress={saveImage}
          ></CameraButton>
        </View>
      ) : (
        <CameraButton
          title="Take a picture"
          icon="camera"
          onPress={captureImage}
          style={{ padding: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
  },
  camera: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingTop: 60,
    paddingHorizontal: 30,
  },
});
