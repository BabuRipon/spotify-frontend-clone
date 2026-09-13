import Layout from '../components/Layout'
import { useSongData } from '../context/SongContext'
import Loading from '../components/Loading';
import AlbumCard from '../components/AlbumCard';
import SongCard from '../components/SongCard';

const Home = () => {
  const { loading,albums, songs } = useSongData();
  return (
    <div>
      {
        loading ?
        <Loading />
        :
        <Layout>
          <div className='mb-4'>
            <h1 className='my-5 font-bold text-2xl'>Featured Charts</h1>
            <div className='flex overflow-auto'>
              {
                albums?.map((e,i)=>{
                  return (
                    <AlbumCard
                      key={i}
                      image={e.thumbnail}
                      name={e.title}
                      desc={e.description}
                      id={e.id}
                    />
                  )
                })
              }
            </div>
          </div>
          
          <div className='mb-4'>
            <h1 className='my-5 font-bold text-2xl'>Today's biggest hit</h1>
            <div className='flex overflow-auto'>
              {
                songs?.map((e,i)=>{
                  return (
                    <SongCard
                      key={i}
                      image={e.thumbnail}
                      name={e.title}
                      desc={e.description}
                      id={e.id}
                    />
                  )
                })
              }
            </div>
          </div>
        </Layout>

      }
    </div>
  )
}

export default Home