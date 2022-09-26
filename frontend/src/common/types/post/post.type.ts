import { User } from "../types";

type Post = {
  _id: string
  title: string
  text: string
  tags: string[]
	viewsCount: number
	author: User
	createdAt: string
	updatedAt: string
  imageUrl: string
}

export { type Post };