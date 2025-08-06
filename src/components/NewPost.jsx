"use client"
import { useState } from 'react'
import Tiptap from '@/components/TipTap'
import { getDatabase, ref, push } from 'firebase/database'
import { initializeApp } from 'firebase/app'
import { useRouter } from 'next/navigation'
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);


export default function NewPost() {
    const router = useRouter()
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    function postAPost() {
        const auth = getAuth()
        console.log(content)
        if (!(title.trim()) || !(content.trim())) {
            alert("Title or content cannot be empty.")
            return;
        }
        push(ref(database, "blogs"), {
            title: title,
            content: content,
            date: Date.now()
        }).then((id) => {
            router.push(`/blog/${id.key}`)
            fetch('/api/revalidate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    secret: process.env.NEXT_PUBLIC_REVALIDATION_PASS,
                    path: `/blog/${id.key}`
                }),
            })
        }).catch(err => console.log(err))
    }
    
    return (
        <Tiptap title={title} setTitle={setTitle} content={content} setContent={setContent} post={postAPost} />
    )
}