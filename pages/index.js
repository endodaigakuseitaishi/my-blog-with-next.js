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
      <div className='text-center bg-green-600 z-10 py-12'>
        <h1 className='font-semibold text-pink-500 text-4xl mb-4'>遠藤大志 official</h1>
        <p>hawk tech Blog</p>
        <div className='float-right m-2'>
          <a href='https://github.com/endodaigakuseitaishi'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="35" height="35"><path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" ></path></svg>
          </a>
        </div>
      </div>
      <div className='m-5 grid grid-cols-4'>
        {blog.map((blog) => (
            <div className="max-w-sm rounded overflow-hidden shadow-lg m-5" key={blog.id}>
              <Link href={`blog/${blog.id}`}>
                <a href="">
                  <img src={blog.thumbnail.url} width='500' height='500' alt="" />
                  <div className="card-body p-4 m-4">
                  <div className="font-bold text-2xl mb-2">
                    <h2>{blog.title}</h2>
                  </div>
                  </div>
                </a>
              </Link >
              <div className="px-6 py-4 flex justify-between">
                <p classNameName='right-0 bottom-0'>投稿日時: {blog.publishedAt.split('T')[0]}</p>
                { blog.category ? <button className="rounded-full bg-gray-300 px-4 py-2">{blog.category && `${blog.category.name}`}</button> : <button className="rounded-full bg-gray-300 px-4 py-2">カテゴリーなし</button> }
              </div>
            </div>
          ))}
       </div>
    </div>
  )
}
