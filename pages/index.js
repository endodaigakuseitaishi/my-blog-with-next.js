import Link from 'next/link'
import { client } from '../libs/client'
import Image from 'next/image';

// SSG
export const getStaticProps = async() => {
  const data = await client.get({ endpoint: 'blog' })

  // 幅、高さの最大値を設定したい
  // const image_height = data.contents.map(x => x["thumbnail"]["height"])
  // const image_width = data.contents.map(x => x["thumbnail"]["width"])

  
  return {
    props: {
      blog: data.contents,
    },
  } 
}

export default function Home( { blog } ) {
  return (
    <div>
      <div className='text-center bg-green-600 z-10 py-10'>
        <h1 className='font-semibold text-pink-500 text-4xl mb-4'>遠藤大志 official</h1>
        <p>hawk tech Blog</p>
      </div>
      <div className='m-5 grid grid-cols-4'>
        {blog.map((blog) => (
            <div className="max-w-sm rounded overflow-hidden shadow-lg" key={blog.id}>
              <Link href={`blog/${blog.id}`}>
                <a href="">
                  <img src={blog.thumbnail.url} width='500' height='500' alt="" />
                  <div className="card-body p-4 m-4">
                  <div className="font-bold text-xl mb-2">
                    <h2>{blog.title}</h2>
                  </div>
                  </div>
                </a>
              </Link >
              <div className="px-6 py-4 flex justify-between">
                <p classNameName='right-0 bottom-0'>投稿日時: {blog.publishedAt.split('T')[0]}</p>
                <button className="rounded-full bg-gray-300 px-4 py-2">{blog.category && `${blog.category.name}`}</button>
              </div>
            </div>
          ))}
       </div>
    </div>
  )
}
