import { alerts } from '@/constants';
import { isAndroid } from '@/utils';
import { useEffect } from 'react';
import { Alert, Linking } from 'react-native';
import { check, Permission, PERMISSIONS, request, RESULTS } from 'react-native-permissions';

type PermissionType = 'LOCATION' | 'PHOTO';

type PermissionOS = {
  [key in PermissionType]: Permission;
};

const androidPermissions: PermissionOS = {
  LOCATION: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  PHOTO: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
};

const iosPermissions: PermissionOS = {
  LOCATION: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  PHOTO: PERMISSIONS.IOS.PHOTO_LIBRARY,
};

const usePermission = async (type: PermissionType) => {
  const permissionOS = isAndroid ? androidPermissions[type] : iosPermissions[type];

  useEffect(() => {
    (async () => {
      const checked = await check(permissionOS);
      const showPermissionAlert = () => {
        return Alert.alert(alerts[type].TITLE, alerts[type].DESCRIPTION, [
          {
            text: '설정하기',
            onPress: () => Linking.openSettings(),
          },
          {
            text: '취소',
            style: 'cancel',
          },
        ]);
      };
      switch (checked) {
        case RESULTS.DENIED:
          if (isAndroid) {
            showPermissionAlert();
            return;
          }
          await request(permissionOS);
          break;
        case RESULTS.BLOCKED:
          showPermissionAlert();
          break;
        case RESULTS.LIMITED:
          showPermissionAlert();
          break;
        default:
          break;
      }
    })();
  }, []);
};

export default usePermission;
