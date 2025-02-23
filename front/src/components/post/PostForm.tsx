import CustomButton from '@/components/common/CustomButton';
import InputField from '@/components/common/InputField';
import PreviewImageList from '@/components/common/PreviewImageList';
import AddPostHeaderRight from '@/components/post/AddPostHeaderRight';
import DatePickerOption from '@/components/post/DatePickerOption';
import ImageInput from '@/components/post/ImageInput';
import MarkerSelector from '@/components/post/MarkerSelector';
import ScoreInput from '@/components/post/ScoreInput';
import { colors } from '@/constants';
import useMutateCreatePost from '@/hooks/queries/useMutateCreatePost';
import useMutateUpdatePost from '@/hooks/queries/useMutateUpdatePost';
import useForm from '@/hooks/useForm';
import useGetAddress from '@/hooks/useGetAddress';
import UseImagePicker from '@/hooks/useImagePicker';
import useModal from '@/hooks/useModal';
import usePermission from '@/hooks/usePermission';
import { FeedStackParamList } from '@/navigations/stack/FeedStackNaviagtor';
import useDetailPostStore from '@/store/useDetailPostStore';
import { MarkerColor } from '@/types';
import { getDateWithSeparator, validatePost } from '@/utils';
import Octicons from '@react-native-vector-icons/octicons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { LatLng } from 'react-native-maps';

interface PostFormProps {
  isEdit?: boolean;
  location: LatLng;
}

const PostForm = ({ location, isEdit = false }: PostFormProps) => {
  const navigation = useNavigation<StackNavigationProp<FeedStackParamList>>();
  const descriptionRef = useRef<TextInput | null>(null);
  const { detailPost } = useDetailPostStore();
  const isEditMode = isEdit && detailPost;
  const [markerColor, setMarkerColor] = useState<MarkerColor>(
    isEditMode ? detailPost.color : 'RED'
  );
  const [score, setScore] = useState(isEditMode ? detailPost.score : 5);
  const [date, setDate] = useState(isEditMode ? new Date(detailPost.date) : new Date());
  const [isPicked, setIsPicked] = useState(isEditMode ? true : false);
  const address = useGetAddress(location);
  const createPost = useMutateCreatePost();
  const updatePost = useMutateUpdatePost();
  const imagePicker = UseImagePicker({ initialImages: isEditMode ? detailPost.images : [] });
  usePermission('PHOTO');

  const dateOption = useModal();

  const addPost = useForm({
    initialValues: {
      title: isEditMode ? detailPost.title : '',
      description: isEditMode ? detailPost.description : '',
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
    const body = {
      date,
      title: addPost.values.title,
      description: addPost.values.description,
      imageUris: imagePicker.imageUris,
      color: markerColor,
      score: score,
    };

    if (isEditMode) {
      updatePost.mutate(
        { id: detailPost.id, body },
        {
          onSuccess: () => {
            navigation.goBack();
          },
        }
      );
      return;
    }

    createPost.mutate(
      { address, ...location, ...body },
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

export default PostForm;
