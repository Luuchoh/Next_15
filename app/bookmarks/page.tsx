"use client"

import { Heading, Text } from "@chakra-ui/react"

import { Bookmark } from "@/components/bookmark"
import { useQuery } from "@tanstack/react-query"
import { BookmarkType } from "./schema"

export default function Bookmarks() {
  const { data: bookmarks, status } = useQuery({
    queryKey: ["bookmarks"],
    queryFn: async () => {
      return fetch("/bookmarks/api")
        .then((response) => response.json())
        .then(({ data }) => {
          return data as BookmarkType[]
        })
    },
  })

  console.log("status", status)

  return (
    <main className="mt-12">
      <header className="">
        <Heading size="lg" className="mb-1">
          Marcadores
        </Heading>
        <Text>
          Estrategías de consumo de datos desde el servidor y el cliente
        </Text>
      </header>

      <ul className="text-lg mt-10">
        {bookmarks?.map((bookmark) => (
          <li className="border-b-2 py-4 px-6 my-2" key={bookmark.id}>
            <Bookmark {...bookmark} />
            {/* <div className="my-1 text-gray-600 text-xs ml-7">
              Creado por {bookmark.author?.name || "Anónimo"}
            </div> */}
          </li>
        ))}
      </ul>
    </main>
  )
}
