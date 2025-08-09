"use client"
import { useState, useEffect } from 'react'
import { getDatabase, ref, onValue, orderByChild, query, off, remove } from 'firebase/database'
import { app } from "@/lib/firebase"
import { getAuth } from "firebase/auth";

const database = getDatabase(app);

export default function NewPost() {
    getAuth(app)
    const [dispVal, setDispVal] = useState("blogs")
    const [generatedList, setGeneratedList] = useState("")
    const [selected, setSelected] = useState([])

    function changeHandler(id) {
        let selectedCopy = JSON.parse(JSON.stringify(selected))
        if (selected.includes(id)) {
            selectedCopy.splice(selectedCopy.indexOf(id), 1)
        } else {
            selectedCopy.push(id)
        }
        setSelected(JSON.parse(JSON.stringify(selectedCopy)))
    }

    const deletePosts = async() => {
        if (confirm(`Do you really want to delete ${selected.length} post${selected.length>1 ? "s" : ""}? This action cannot be undone.`)){
           for (let i = 0; i < selected.length; i++){
                remove(ref(database, `${dispVal}/${selected[i]}`));
                const response = await fetch('/api/revalidate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        secret: process.env.NEXT_PUBLIC_REVALIDATION_PASS,
                        path: `/${dispVal==="blogs" ? "blog" : "news"}/${selected[i]}`
                    }),
                })
            }
            setSelected([])
        }
    }

    function convertDates(data){
        return `${data.getHours().toString().padStart(2, "0")}:${data.getMinutes().toString().padStart(2, "0")}:${data.getSeconds().toString().padStart(2, "0")} ${["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][data.getMonth()]} ${data.getDate()}, ${data.getFullYear()}`
    }

    useEffect(() => {
        const dataRef = ref(database, dispVal);
        const unsubscribe = onValue(query(dataRef, orderByChild("date")), (snapshot) => {
            const datas = snapshot.val() || {}
            setGeneratedList(datas)
        });
        setSelected([])
        return () => {
            off(dataRef);
        };
    }, [dispVal])
    return (
        <>
            <div className="flex flex-col">
                <div className="w-full flex">
                    <select className="flex-1 text-center h-10 rounded mx-4 my-3 bg-gray-500 dark:bg-gray-300 text-black" value={dispVal} onChange={(e) => setDispVal(e.target.value)}>
                        <option value="blogs">Blogs</option>
                        <option value="news">News</option>
                    </select>
                </div>
                <div className="w-full flex">
                {selected.length>0 && (
                    <button onClick={deletePosts} className="flex-1 text-center h-10 rounded mx-4 mb-3 bg-red-500 text-black">
                        Delete
                    </button>
                )}
                </div>
                <div className="w-full flex-1 flex overflow-y-auto">
                    {generatedList && (<table className="rounded-lg overflow-hidden w-full mx-4">
                        <thead className="border-b h-10 bg-gray-700 text-center">
                            <tr>
                                <th className="border-r text-center px-2"><span className="text-gray-300">Select</span></th>
                                <th className="border-r text-center px-2"><span className="text-gray-300">ID</span></th>
                                <th className="border-r text-center px-2"><span className="text-gray-300">Title</span></th>
                                <th className="border-l text-center px-2"><span className="text-gray-300">Date</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(generatedList).toReversed().map((id) =>
                                <tr key={id} className="border-b h-10 even:bg-gray-400 odd:bg-gray-500">
                                    <td className="border-r text-center px-2"><input type="checkbox" onChange={() => changeHandler(id)} /></td>
                                    <td className="border-r px-2">{id}</td>
                                    <td className="border-r px-2">{generatedList[id].title}</td>
                                    <td className="border-l px-2 text-center">{convertDates(new Date(-generatedList[id].date))}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>)}
                </div>
            </div>
        </>
    )
}