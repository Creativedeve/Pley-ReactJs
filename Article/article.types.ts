import { IAuthorProps } from "components/Author/author.types"
import { IRawImage } from "components/Image/image.types"
import { AdTypeDictionary, AdSlot } from "components/Ad/ad.types"

export interface IMention {
  id: string
  name: string
  slug?: string
}

export interface IArticleProps {
  id: string
  remoteId: string
  author: IAuthorProps | any
  teaser: string
  title: string
  createdAt: number
  lastUpdatedAt: number
  publishedAt: number
  image: IRawImage
  slug: string
  body: string | any[] | any
  priority: "BREAKING" | "TOP_STORY" | "DEFAULT"
  teamMentions: IMention[]
  playerMentions: IMention[]
  dynamicSlug?: boolean
  direction?: "vertical"
}

export interface IArticleListProps {
  className?: string
  articles: IArticleProps[]
  adFrequency?: number
  adTypeMap?: AdTypeDictionary
  adSlot?: AdSlot
}
