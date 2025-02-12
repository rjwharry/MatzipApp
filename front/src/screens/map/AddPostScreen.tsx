import CustomButton from '@/components/common/CustomButton';
import InputField from '@/components/common/InputField';
import PreviewImageList from '@/components/common/PreviewImageList';
import AddPostHeaderRight from '@/components/post/AddPostHeaderRight';
import DatePickerOption from '@/components/post/DatePickerOption';
import ImageInput from '@/components/post/ImageInput';
import MarkerSelector from '@/components/post/MarkerSelector';
import ScoreInput from '@/components/post/ScoreInput';
import { colors, mapNavigations } from '@/constants';
import useMutateCreatePost from '@/hooks/queries/useMutateCreatePost';
import useForm from '@/hooks/useForm';
import useGetAddress from '@/hooks/useGetAddress';
import UseImagePicker from '@/hooks/useImagePicker';
import useModal from '@/hooks/useModal';
import usePermission from '@/hooks/usePermission';
import { MapStackParamList } from '@/navigations/stack/MapStackNavigator';
import { MarkerColor } from '@/types';
import { getDateWithSeparator, validatePost } from '@/utils';
import Octicons from '@react-native-vector-icons/octicons';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, TextInput, View } from 'react-native';

type AddPostScreenProps = StackScreenProps<MapStackParamList, typeof mapNavigations.ADD_POST>;

const AddPostScreen = ({ route, navigation }: AddPostScreenProps) => {
  const descriptionRef = useRef<TextInput | null>(null);
  const location = route.params.location;
  const [markerColor, setMarkerColor] = useState<MarkerColor>('RED');
  const [score, setScore] = useState(5);
  const [date, setDate] = useState(new Date());
  const [isPicked, setIsPicked] = useState(false);
  const address = useGetAddress(location);
  const createPost = useMutateCreatePost();
  const imagePicker = UseImagePicker({ initialImages: [] });
  usePermission('PHOTO');

  const dateOption = useModal();

  const addPost = useForm({
    initialValues: {
      title: '',
      description: '',
    },
    validate: validatePost,
  });

  const handleSelectMarker = (color: MarkerColor) => {
    setMarkerColor(color);
  };

  const handleChangeScore = (value: number) => {
    setScore(value);
  };

  const handleOnChangeDate = (date: Date) => {
    setDate(date);
  };

  const handleConfirmDate = (date: Date) => {
    setDate(date);
    setIsPicked(true);
    dateOption.hide();
  };

  const handleCancelDate = () => {
    dateOption.hide();
  };

  const handleSubmit = () => {
    const data = {
      date,
      title: addPost.values.title,
      description: addPost.values.description,
      imageUris: imagePicker.imageUris,
      color: markerColor,
      score: score,
    };
    createPost.mutate(
      { address, ...location, ...data },
      {
        onSuccess: () => {
          navigation.goBack();
        },
      }
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => AddPostHeaderRight(handleSubmit),
    });
  });
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.contentContainer}>
        <View style={styles.inputContainer}>
          <InputField
            value={address}
            disabled={true}
            icon={<Octicons name="location" size={16} color={colors.GRAY_500} />}
          />
          <CustomButton
            variant="outlined"
            size="large"
            label={isPicked ? getDateWithSeparator(date, '.') : '날짜 선택'}
            onPress={dateOption.show}
          />
          <InputField
            autoFocus={true}
            placeholder="제목"
            error={addPost.errors.title}
            touched={addPost.touched.title}
            returnKeyType="next"
            onSubmitEditing={() => {
              descriptionRef.current?.focus();
            }}
            {...addPost.getTextInputProps('title')}
          />
          <InputField
            ref={descriptionRef}
            placeholder="기록하고 싶은 내용을 입력하세요 (선택)"
            textContentType="oneTimeCode"
            multiline
            error={addPost.errors.description}
            touched={addPost.touched.description}
            {...addPost.getTextInputProps('description')}
          />
          <MarkerSelector
            markerColor={markerColor}
            onPressMarker={handleSelectMarker}
            score={score}
          />
          <ScoreInput score={score} onChangeScore={handleChangeScore} />
          <View style={styles.imageViewer}>
            <ImageInput onPressAddImage={imagePicker.handleAddImage} />
            <PreviewImageList
              imageUris={imagePicker.imageUris}
              onDelete={imagePicker.delete}
              onChangeOrder={imagePicker.changeOrder}
              showOption={true}
            />
          </View>
          <DatePickerOption
            isVisible={dateOption.isVisible}
            date={date}
            onChangeDate={handleOnChangeDate}
            onConfirmDate={handleConfirmDate}
            onCancelDate={handleCancelDate}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    marginBottom: 10,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 20,
  },
  imageViewer: {
    flexDirection: 'row',
  },
});

export default AddPostScreen;
