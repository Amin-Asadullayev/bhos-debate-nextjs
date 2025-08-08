"use client"
import { useRef, useState } from 'react'
import ReCAPTCHA from "react-google-recaptcha";

const Contact = () => {
    const reCRef = useRef(null)
    const [formData, setFormData] = useState({ name: '', email: '', message: '' })
    const [token, setToken] = useState(null)
    const [errorMessage, setError] = useState("")

    const changeHandle = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    async function formHandler(e) {
        e.preventDefault();
        if (!token) {
            setError("Please verify that you are not a robot.")
            return;
        }

        if (formData.name.trim().length<3){
            setError("Your name cannot be less than 3 characters.")
            return;
        } else if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()))){
            setError("Please enter a valid email address.")
            return;
        } else if (formData.message.trim().length<10){
            setError("Your message should be at least 10 characters.")
            return;
        }

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, token })
            })

            const res = await response.json()
            if (res.success) {
                setFormData({ name: '', email: '', message: '' })
                reCRef.current.reset()
                setToken(null)
                alert("Your message has been successfully sent!")
            } else {
                alert("Your message could not be sent.")
            }
        } catch (err) {
            console.log(err)
        }

    }

    return (<section id="contact" className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">Contact Us</h2>
            <div className="max-w-lg mx-auto">
                <div className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={changeHandle}
                        className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={changeHandle}
                        placeholder="Your Email"
                        className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <textarea
                        placeholder="Your Message"
                        name="message"
                        value={formData.message}
                        onChange={changeHandle}
                        className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                        rows="5"
                    ></textarea>
                    {errorMessage && <p className="w-full text-center text-sm text-red-500">{errorMessage}</p>}
                    <div className="w-full flex justify-center">
                        <ReCAPTCHA
                            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                            onChange={(t) => setToken(t)}
                            ref={reCRef}
                        />
                    </div>
                    <button onClick={formHandler} className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-primary-200 transition">
                        Send Messages
                    </button>
                </div>
            </div>
        </div>
    </section>
    )
}

export default Contact;