import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar.jsx"
import { FaHeart, FaRegHeart } from "react-icons/fa"
import { useEffect } from 'react'
import CommentBox from './CommentBox.jsx'
import { useRef } from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Badge } from "@/components/ui/badge"
import { Button } from '../components/ui/button.jsx'
import { Bookmark, MessageSquare, Share2 } from 'lucide-react'
import { toast } from 'sonner'
import { setBlog } from '../redux/blogSlice.js'
import axios from 'axios'

const BlogsView = () => {
const chatEndRef = useRef(null);

const [selectedLanguage,
setSelectedLanguage] =
useState("English");


const [translatedContent, setTranslatedContent] =
  useState("");

const [translationLoading, setTranslationLoading] =
  useState(false);

// const [loadingAnswer, setLoadingAnswer] =
//   useState(false);

const [question, setQuestion] = useState("");

const [messages, setMessages] = useState([]);

const [loading, setLoading] = useState(false);

  // Params is a React Router hook.
  // It gives you an object containing all the dynamic parameters from the current route URL.

const [summary, setSummary] = useState("");
const [summaryLoading, setSummaryLoading] = useState(false);



const generateBlogSummary = async () => {
  try {

    setSummaryLoading(true);

    const plainText =
      selectedBlog.description.replace(/<[^>]*>?/gm, "");

    const res = await axios.post(
      "https://full-stack-blogging-webapp.onrender.com/blog/summary",
      {
        content: plainText
      }
    );

    if (res.data.success) {
      setSummary(res.data.summary);
    }

  } catch (error) {

    console.log(error);

    toast.error("Failed to generate summary");

  } finally {

    setSummaryLoading(false);
  }
};


const askQuestion = async () => {
  if (!question.trim()) return;

  try {
    setLoading(true);

    const userQuestion = question;

    const res = await axios.post(
      "https://full-stack-blogging-webapp.onrender.com/blog/ask-blog",
      {
        blogId: selectedBlog._id,
        question: userQuestion,
        history: messages
      }
    );

    if (res.data.success) {

      setMessages(prev => [
        ...prev,
        {
          role: "user",
          text: userQuestion
        },
        {
          role: "ai",
          text: res.data.answer
        }
      ]);

      setQuestion("");
    }

  } catch (error) {

  toast.error(
    error.response?.data?.message ||
    "AI service unavailable"
  );

} finally {
    setLoading(false);
  }
};

  const params = useParams();

  const Blogid = params.id;
  const { blog } = useSelector(store => store.blog)
  const { user } = useSelector(store => store.auth)



  const selectedBlog = blog.find(blog => blog._id === Blogid)


  if (!selectedBlog) {
    return <h2>Blog not found or loading...</h2>
  }

  const [blogLike, setBlogLike] = useState(selectedBlog.likes.length)
  // const [liked, setLiked] = useState(
  //   selectedBlog.likes.includes(user?._id)
  // )



const [liked, setLiked] = useState(
  user ? selectedBlog.likes.includes(user._id) : false
)



  //const [blogLike,setBlogLike]=useState(selectedBlog.likes.length)
  const dispatch = useDispatch()
  //const [liked,setLiked]=useState(selectedBlog.likes.includes(user._id) || false)



  // ✅ Guard: if blog not found
  if (!selectedBlog) {
    return (
      <div className="pt-14 max-w-6xl mx-auto pt-10">
        <h2 className="text-xl font-semibold">Blog not found or still loading...</h2>
      </div>
    )
  }

  const changeTimeFormat = (isDate) => {
    const date = new Date(isDate);
    const option = { day: 'numeric', month: 'long', year: 'numeric' }
    const changeTimeFormat = date.toLocaleDateString('en-GB', option)
    return changeTimeFormat
  }

  const shareHandle = (Blogid) => {
    const blogUrl = `${window.location.origin}/blogs/${Blogid}`


    if (navigator.share) {
      navigator.share({
        title: 'Check out this Blog!',
        text: 'Read this amazing blog post',
        url: blogUrl
      }).then(() => console.log('shared successfully')
      ).catch((err) => console.log('Error sharing :', err)
      )
    }
    else {
      navigator.clipboard.writeText(blogUrl).then(() => {
        toast.success('Blog Link compied to clipboard')
      })
    }
  }

  const likeOrDislikeHandler = async () => {
    try {
      const action = liked ? 'dislike' : 'like'
      const res = await axios.get(`https://full-stack-blogging-webapp.onrender.com/blog/${selectedBlog?._id}/${action}`, { withCredentials: true })

      if (res.data.success) {
        const updatedLikes = liked ? blogLike - 1 : blogLike + 1;
        setBlogLike(updatedLikes)
        setLiked(!liked)
      }
      //apne blog ko updata krunga
     

       const updatedBlogData = blog.map(p =>
                    p._id === selectedBlog._id ? {
                        ...p,
                        likes: liked ? p.likes.filter(id => id !== user._id) : [...p.likes, user._id]
                    } : p
                )

      toast.success(res.data.message)
      dispatch(setBlog(updatedBlogData))



    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Like failed");
    }
  }


const languages = [
  "English",
  "Hindi",
  "Marathi",
  "Spanish",
  "French",
  "German",
  "Japanese",
  "Korean",
  "Chinese",
  "Arabic",
  "Russian",
  "Portuguese",
  "Italian",
  "Tamil",
  "Telugu",
  "Gujarati",
  "Bengali"
];
const translateBlog =
async (language) => {

  setSelectedLanguage(language);

  try {

    setTranslationLoading(true);

    const res =
      await axios.post(
        "https://full-stack-blogging-webapp.onrender.com/blog/translate",
        {
          blogId:
            selectedBlog._id,
          language
        }
      );

    if (
      res.data.success
    ) {
      setTranslatedContent(
        res.data.translation
      );
    }

  } finally {

    setTranslationLoading(false);

  }

};

useEffect(() => {
  window.scrollTo(0, 0);
}, []);



// useEffect(() => {
//   chatEndRef.current?.scrollIntoView({
//     behavior: "smooth"
//   });
// }, [messages]);
  return (
    <div className='pt-14'>
      <div className='max-w-6xl mx-auto pt-10'>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/blogs">Blogs</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbPage>{selectedBlog.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>


        {/*Blog header*/}
        <div className="my-8">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{selectedBlog.title}</h1>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              <Avatar className="mb-2">
                <AvatarImage src={selectedBlog.author.photoUrl} alt="Author" />
                <AvatarFallback>NA</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{selectedBlog.author.firstName} {selectedBlog.author.lastName}</p>
                <p className="text-sm text-muted-foreground">{selectedBlog.author.occupation}</p>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">Published on {changeTimeFormat(selectedBlog.createdAt)} • 8 min read</div>
          </div>
          {/* featured image */}
          <div className='mb-8 rounded-lg overflow-hidden'>
            
            <img src={selectedBlog.thumbnail} alt='thumbnail' width={1000} height={500} className='w-full object-cover' />

          </div>
<p  className=' mb-1'> Translate Blog</p>
 <select
  className="border p-2 rounded"
  onChange={(e) =>
    translateBlog(
      e.target.value
    )
  }
>

<option className='dark:text-black'>
 
Select Language
</option>

{languages.map(lang => (
<option className='dark:text-black'
key={lang}
value={lang}
>
{lang}
</option>
))}

</select>
          <p className="prose max-w-none"
            dangerouslySetInnerHTML={{
              __html: selectedBlog.description || "",
            }}></p>
            <div className="mt-10 border rounded-lg p-5">

{
  translatedContent && (
    <div className="mt-6 border p-4 rounded">

      <h2 className="font-bold text-xl mb-3">
        Translated Version
      </h2>

      <pre className="whitespace-pre-wrap">
        {translatedContent}
      </pre>

    </div>
  )
}

<div className="mt-10 border rounded-lg p-5">

  <h2 className="text-xl font-bold mb-4">
    🤖 Chat With This Blog
  </h2>

  <div className="h-80 overflow-y-auto border rounded p-3 mb-4">

    {messages.length === 0 && (
      <p className="text-gray-500">
        Ask anything about this blog.
      </p>
    )}

    {messages.map((msg, index) => (
      <div
        key={index}
        className={`mb-3 ${
          msg.role === "user"
            ? "text-right"
            : "text-left"
        }`}
      >
<div ref={chatEndRef}></div>
        <div
          className={`inline-block p-3 rounded-lg ${
            msg.role === "user"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {msg.text}
        </div>

      </div>
    ))}

    {loading && (
      <p>AI is thinking...</p>
    )}

  </div>
  <div ref={chatEndRef}></div>

  <div className="flex gap-2">

    <input
      type="text"
      value={question}
      onChange={(e) =>
        setQuestion(e.target.value)
      }
      placeholder="Ask about this blog..."
      className="flex-1 border rounded p-2"
    />

    <Button onClick={askQuestion}>
      Send
    </Button>

  </div>

</div>
 

  {loading && (
    <p className="mt-3">
      Thinking...
    </p>
  )}



</div>

<Button
  onClick={generateBlogSummary}
  className="mt-6"
>
  {summaryLoading
    ? "Generating..."
    : "✨ Generate AI Summary"}
</Button>
{
 summary && (
   <div className="mt-6 border rounded-lg p-4">

      <h2 className="text-xl font-bold mb-3">
         AI Summary
      </h2>

      <pre className="whitespace-pre-wrap">
        {summary}
      </pre>

   </div>
 )
}
          <div className='mt-10 '>
            <div className='flex flex-wrap gap-2 mb-8'>
              <Badge variant="secondary" className="dark:bg-gray-800">next.js</Badge>
              <Badge variant="secondary" className="dark:bg-gray-800">React.js</Badge>
              <Badge variant="secondary" className="dark:bg-gray-800">Web development</Badge>
              <Badge variant="secondary" className="dark:bg-gray-800">Javascript</Badge>
            </div>
            {/*  engagemnet */}
            <div className='flex items-center justify-between border-y dark:border-gray-300 py-5 mb-8'>
              <div className='flex items-center space-x-4'>
                <Button onClick={likeOrDislikeHandler} variant='ghost' className="flex items-center gap-1">
                  {
                    liked ? <FaHeart size={24} className='cursor-pointer text-red-600' /> : <FaRegHeart size={24} className='cursor-pointer' />
                  }
                  <span>{blogLike}</span>

                </Button>
                <Button variant="ghost">
                  <MessageSquare className='h-5 w-5' />
                  <span>1 comments</span>
                </Button>
              </div>
              <div className='flex items-center space-x-2'>
                <Button variant="ghost">
                  <Bookmark className='w-5 h-5' />
                </Button>
                <Button onClick={() => shareHandle(selectedBlog._id)} variant="ghost">
                  <Share2 className='w-5 h-5' />
                </Button>

              </div>
            </div>
          </div>
          <CommentBox selectedBlog={selectedBlog}/>
        </div>
      </div>

    </div>
  )
}

export default BlogsView
