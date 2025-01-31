import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  query,
  orderBy,
  deleteDoc,
  updateDoc,
  doc,
} from '../export.js';
import { db } from '../dependencies/config-firebase.js';
import { current } from './authentication.js';

async function getPostById(idPost) {
  const post = await getDoc(doc(db, 'posts', idPost));
  return post.data();
}

export function createPost(text) {
  addDoc(collection(db, 'posts'), {
    userId: current().uid,
    photo: current().photoURL,
    displayName: current().displayName,
    date: new Date().toLocaleDateString('pt-BR'),
    hour: new Date().toLocaleTimeString([], { timeStyle: 'short' }),
    post: text,
    likes: [],
    comments: [],
  });
}

export async function getAllPosts() {
  const postCollection = query(
    collection(db, 'posts'),
    orderBy('date', 'desc'),
    orderBy('hour', 'desc'),
  );
  const postSnapshot = await getDocs(postCollection);
  const listingOfPosts = postSnapshot.docs.map((docsCol) => {
    const id = docsCol.id;
    const data = docsCol.data();
    const listingOfPostsWithId = {
      id,
      ...data,
    };
    return listingOfPostsWithId;
  });
  return listingOfPosts;
}

export const deletePost = async (idPost) => {
  const del = await deleteDoc(doc(db, 'posts', idPost));
  return del;
};

export async function like(idPost, icon) {
  const post = await getPostById(idPost);
  const loggedUser = current().uid;
  let likes = post.likes;
  let liked;
  if (post.likes.includes(loggedUser)) {
    liked = false;
    likes = likes.filter((id) => id !== loggedUser);
    icon.classList.remove('liked');
  } else {
    liked = true;
    likes.push(loggedUser);
    icon.classList.add('liked');
  }
  await updateDoc(doc(db, 'posts', idPost), {
    likes,
  });
  return {
    liked,
    count: likes.length,
  };
}

export async function editedPost(idPost, text) {
  await updateDoc(doc(db, 'posts', idPost), {
    post: text,
  });
}
