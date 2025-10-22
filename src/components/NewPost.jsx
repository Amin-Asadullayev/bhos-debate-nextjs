"use client"
import { useState } from 'react'
import Tiptap from '@/components/TipTap'
import { getDatabase, ref, push } from 'firebase/database'
import { app } from "@/lib/firebase"
import { useRouter } from 'next/navigation'
import { getAuth } from "firebase/auth";

const database = getDatabase(app);

export default function NewPost() {
    const router = useRouter()
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [option, setOption] = useState("blog")
    const [thumb, setThumb] = useState("")

    function postAPost() {
        const auth = getAuth()
        console.log(content)
        if (!(title.trim()) || !(content.trim())) {
            alert("Title or content cannot be empty.")
            return;
        } else if (option==="news" && thumb==="") {
            alert("You should upload a thumbnail for the article.")
            return;
        }
        push(ref(database, option==="blog" ? "blogs" : "news"), {
            title: title,
            content: content,
            date: -Date.now(),
            ...(option==="news" && thumb ? { thumbnail: thumb}: {})
        }).then((id) => {
            router.push(`/${option}/${id.key}`)
            fetch('/api/revalidate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    secret: process.env.NEXT_PUBLIC_REVALIDATION_PASS,
                    path: `/${option}/${id.key}`
                }),
            })
        }).catch(err => console.log(err))
    }
    
    return (
        <Tiptap title={title} setTitle={setTitle} content={content} setContent={setContent} option={option} setOption={setOption} post={postAPost} thumb={thumb} setThumb={setThumb}/>
    )
}