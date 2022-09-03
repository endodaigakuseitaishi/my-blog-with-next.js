import { client } from "../../libs/client"

// SSG
export const getStaticProps = async(context) => {
  const id = context.params.id
  const data = await client.get({ endpoint: "blog", contentId: id })
  // console.log(data)

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
  return (
    <main>
      <div className='text-center bg-green-600 z-10 py-10'>
        <h1 className='font-semibold text-pink-500 text-4xl mb-4'>遠藤大志 official</h1>
        <p>hawk tech Blog</p>
      </div>
     
      <div className="bg-gray-200 p-4">
        <div className="bg-white p-4 m-4">
          <h1 className="text-3xl font-semibold">{blog.title}</h1>
          <p className="m-2 pb-4">投稿日時: {blog.publishedAt.split('T')[0]}</p>
          <div dangerouslySetInnerHTML={{ __html: `${blog.body}` }} ></div>
        </div>
      </div>
    </main>
  )
}