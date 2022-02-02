import React from "react"
import "twin.macro"
import { Link } from "gatsby"
import slugify from "slugify"
import { IMention } from "./article.types"

interface IMentionsProps {
  title: string
  list: IMention[]
  rootSlug: string
}

export const Mentions: React.FC<IMentionsProps> = ({
  title,
  list,
  rootSlug,
  ...props
}) => {
  return (
    <div tw="md:w-1/3">
      <h3 tw="uppercase text-2xl font-bold">{title}</h3>
      <ul tw="list-disc pl-8 mt-4 mb-16 space-y-4">
        {list.map(item => (
          <li key={item.id}>
            <Link
              tw="text-orange text-xl"
              to={`${rootSlug}${slugify(item.name).toLowerCase()}`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
