"use server"

import { bookmarks } from "../schema"
import { orm } from "../db"
// import { revalidateTag } from "next/cache"

export async function addBookmark(prevState: unknown, data: FormData) {
  const title = data.get("title") as string
  const url = data.get("url") as string

  console.log("Adding bookmark:", { title, url })
  // Forzando un error para mostrar en la UI
  // return { error: "Fallo en agregar el marcador en la base de datos." }

  // Forzando Error no controlado
  // throw new Error("asdasd")

  const value = await orm.insert(bookmarks).values({ title, url }).returning()

  // Invalida el tag de la cache
  // revalidateTag("bookmarks")

  if (value.length <= 0) {
    return { error: "Fallo en agregar el marcador en la base de datos." }
  }
}
