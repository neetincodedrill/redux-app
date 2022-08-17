import { useSelector,useDispatch } from 'react-redux'
import { selectAllPosts,getPostsStatus,getPostsError,fetchPosts } from './postSlice'
import PostsExcerpt from './PostsExcerpt'

import { useEffect } from 'react'

const PostList = () => {
  const dispatch = useDispatch();

    const posts = useSelector(selectAllPosts);
    const postStatus = useSelector(getPostsStatus)
    const error = useSelector(getPostsError)
    
    useEffect(() => {
      if(postStatus === 'idle'){
         dispatch(fetchPosts())
      }
    },[postStatus,dispatch])

    let content;
    if(postStatus === 'loading'){
      content = <p>"Loading...</p>
    }else if(postStatus === 'succeeded'){
      const orderPosts = posts.slice().sort((a,b) => b.date.localeCompare(a.date))
      content = orderPosts.map(post => (
          <PostsExcerpt key ={post.id} post = { post }/>
      ))
    }else if(postStatus === 'failed'){
      content = <p>{error}</p>
    }

  return (
    <section>
        {content}
    </section>
  )
}

export default PostList