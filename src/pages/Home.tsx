import { NavFooter } from '../components/NavBar/NavFooter'
import { NavHeader } from '../components/NavBar/NavHeader'
import FeedPosts from '../components/FeedPosts/FeedPosts'

export const Home = () => {
  return (
    <>
        <NavHeader />
        <FeedPosts />
        <NavFooter />
    </>
  )
}
