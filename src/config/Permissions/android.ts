import { PermissionsAndroid } from "react-native";

const requestCameraPermission = async () => {
  const isGranted = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.CAMERA
  );
  if (!isGranted) {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera", { granted });
      } else {
        console.log("Camera permission denied");
      }
      return granted === "granted";
    } catch (err) {
      console.warn(err);
    }
  }
};

export { requestCameraPermission };
