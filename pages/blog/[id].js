import Link from "next/link"
import { useRouter } from "next/router"
import { client } from "../../libs/client"

// SSG
export const getStaticProps = async(context) => {
  const id = context.params.id
  const data = await client.get({ endpoint: "blog", contentId: id })

  return {
    props: {
      blog: data
    },
  }
}

export const getStaticPaths = async() => {
  const data = await client.get({ endpoint: "blog" })
  const paths = data.contents.map((content) => `/blog/${content.id}`)

  return {
    paths, 
    fallback: false,
  }
}

export default function BlogId({ blog }) {
  const router = useRouter()
  return (
    <main>
      <div className='text-center bg-green-600 z-10 py-10'>
        <h1 className='font-semibold text-pink-500 text-4xl mb-4'>遠藤大志 official</h1>
        <p>hawk tech Blog</p>
      </div>
     
      <div className="bg-white-200 p-4 m-4">
        <h1 className="text-4xl font-semibold">{blog.title}</h1>
        <div className="px-6 py-4 flex justify-between">
          <p classNameName='right-0 bottom-0'>投稿日時: {blog.publishedAt.split('T')[0]}</p>
          { blog.category ? <button className="rounded-full bg-gray-300 px-4 py-2">{blog.category && `${blog.category.name}`}</button> : <button className="rounded-full bg-gray-300 px-4 py-2">カテゴリーなし</button> }
        </div>
        <div dangerouslySetInnerHTML={{ __html: `${blog.body}` }} className="text-xl" ></div>
        <div className="fixed right-0 px-12 py-4 m-2">
          <button className="rounded-full bg-green-600 px-4 py-2" type="button" onClick={() => router.back()}>
            back
          </button>
        </div>
      </div>
    </main>
  )
}