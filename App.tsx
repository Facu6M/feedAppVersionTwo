import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import bellPng from './assets/bell.png';
import searchIcon from './assets/search-icon.png';
import redHeart from './assets/red-heart.png';
import fourCharacters from './assets/four-women.png';
import threeDots from './assets/three-dots.png';
import whiteHeart from './assets/heart-white.png';

export default function App() {
  const [posts, setPosts] = useState([
    {
      id: '1',
      name: 'Hannah Rodriguez',
      content: 'Entretenimiento',
      likes: 5,
      isLiked: false,
      comments: [],
    },
    {
      id: '2',
      name: 'Carlos Pérez',
      content: 'Deportes',
      likes: 3,
      isLiked: false,
      comments: [],
    },
    {
      id: '3',
      name: 'Laura Fernández',
      content: 'Tecnología',
      likes: 0,
      isLiked: false,
      comments: [],
    },
    {
      id: '4',
      name: 'Juan Martínez',
      content: 'Arte',
      likes: 2,
      isLiked: false,
      comments: [],
    },
    {
      id: '5',
      name: 'Sofia García',
      content: 'Moda',
      likes: 4,
      isLiked: false,
      comments: [],
    },
  ]);

  const [comment, setComment] = useState('');
  const [activeCommentingPost, setActiveCommentingPost] = useState(null);

  const handleLike = id => {
    const updatedPosts = posts.map(post => {
      if (post.id === id) {
        post.isLiked = !post.isLiked;
        post.likes = post.isLiked ? post.likes + 1 : post.likes - 1;
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const handleAddComment = id => {
    if (comment.trim() !== '') {
      const updatedPosts = posts.map(post => {
        if (post.id === id) {
          post.comments.push(comment);
        }
        return post;
      });
      setPosts(updatedPosts);
      setComment('');
      setActiveCommentingPost(null);
    }
  };
  const renderItem = ({item}) => (
    <View>
      <View style={styles.postContainer}>
        <View style={styles.headerContainer}>
          <Image
            source={{uri: 'https://randomuser.me/api/portraits/men/1.jpg'}}
            style={styles.userImage}
          />
          <View style={styles.textContainer}>
            <Text style={styles.userName}>{item.name}</Text>
            <Text style={styles.postContent}>{item.content}</Text>
          </View>
          <Image source={threeDots} style={styles.moreOptionsIcon} />
        </View>

        <View style={styles.postContentContainer}>
          <Text style={styles.postDescription}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatibus ut repudiandae ipsam minus quibusdam officia nemo
            reiciendis, quidem rem incidunt! Eligendi rerum est nisi
          </Text>
          <Text style={styles.seeMore}>Ver más</Text>
        </View>

        <Image
          source={{
            uri: 'https://i.pinimg.com/originals/02/17/e8/0217e8ba2cda0577e7a490566a47f49e.jpg',
          }}
          style={styles.largeImage}
        />

        <View style={styles.interactionsContainer}>
          <View style={styles.interactionsCardContainer}>
            <TouchableOpacity
              onPress={() => handleLike(item.id)}
              style={styles.likeButton}>
              <Image
                style={
                  item.isLiked ? styles.moreOptionsIcon : styles.whiteOptionIcon
                }
                source={item.isLiked ? redHeart : whiteHeart}
              />
            </TouchableOpacity>
            <Image
              style={styles.moreOptionsIcon}
              source={{
                uri: 'https://cdn-icons-png.freepik.com/512/9189/9189103.png',
              }}
            />
            <Text style={styles.likesCount}>{item.comments?.length}</Text>
          </View>
          <View
            style={styles.buttonJoin}
            onPress={() => {
              setActiveCommentingPost(item.id);
            }}>
            <Text style={styles.textJoin}>JOIN</Text>
            <Image
              style={styles.moreOptionsIcon}
              source={{
                uri: 'https://static.thenounproject.com/png/1695445-200.png',
              }}
            />
          </View>
        </View>

        <View style={styles.usersContainer}>
          <Image style={styles.fourImage} source={fourCharacters} />
          <Text style={styles.textFourPhoto}>
            Sofi, Juan, y 19 personas asistirán
          </Text>
        </View>

        {item.comments.length && (
          <>
            <Text style={styles.commentsTitle}>Comentarios:</Text>
            <View style={styles.commentsBox}>
              <FlatList
                data={item.comments}
                renderItem={({item}) => (
                  <Text style={styles.commentText}>{item}</Text>
                )}
                keyExtractor={index => index.toString()}
              />
            </View>
          </>
        )}

        {activeCommentingPost === item.id && (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Escribe tu comentario"
              value={comment}
              onChangeText={setComment}
              placeholderTextColor="white"
            />
            <Text
              style={styles.addComment}
              onPress={() => handleAddComment(item.id)}>
              Enviar comentario
            </Text>
          </View>
        )}
      </View>
      <View style={styles.divider}></View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainerCard}>
        <Text style={styles.principalText}>GUDPLANS</Text>
        <View style={styles.headerIcons}>
          <Image style={styles.moreOptionsIcon} source={bellPng} />
          <Image style={styles.moreOptionsIcon} source={searchIcon} />
        </View>
      </View>

      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#27272a',
  },
  principalText: {
    padding: 15,
    fontWeight: 'bold',
    color: 'red',
  },
  postContainer: {
    backgroundColor: '#27272a',
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '4',
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  postContent: {
    fontSize: 14,
    color: 'white',
    backgroundColor: 'red',
    padding: 2,
    marginVertical: 4,
    width: '35%',
    textAlign: 'center',
  },
  moreOptionsIcon: {
    width: 20,
    height: 20,
  },
  whiteOptionIcon: {
    width: 25,
    height: 25,
  },
  usersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  fourImage: {
    width: 150,
    height: 40,
  },
  textFourPhoto: {
    color: 'white',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerContainerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  postContentContainer: {
    paddingVertical: 14,
  },
  postDescription: {
    color: 'white',
    fontSize: 14,
  },
  seeMore: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 6,
  },
  largeImage: {
    width: '100%',
    height: 200,
    alignSelf: 'center',
  },
  interactionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  interactionsCardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: '4',
  },
  likeButton: {
    padding: 10,
  },
  likeText: {
    color: 'white',
  },
  likesCount: {
    marginHorizontal: 4,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonJoin: {
    flexDirection: 'row',
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 10,
  },
  textJoin: {
    color: 'white',
  },
  commentsTitle: {
    color: 'white',
    fontSize: 16,
    marginVertical: 10,
    fontWeight: 'bold',
  },
  commentsBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
  },
  commentText: {
    fontSize: 14,
    color: 'white',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginTop: 10,
    color: 'white',
  },
  addComment: {
    margin: 'auto',
    padding: 10,
    marginVertical: 10,
    width: '40%',
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'red',
  },
  divider: {
    height: 2,
    backgroundColor: 'white',
    marginVertical: 10,
  },
});
