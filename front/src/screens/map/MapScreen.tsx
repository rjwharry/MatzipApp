import React from 'react';
import { Button, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useAuth from '../../hooks/queries/useAuth';

const MapHomeScreen: React.FC = () => {
    const { logoutMutation } = useAuth();
    return (
        <SafeAreaView>
            <Text>맵 스크린</Text>
            <Button title="로그아웃" onPress={() => {
                logoutMutation.mutate(null);
            }} />
        </SafeAreaView>
    );
};

export default MapHomeScreen;