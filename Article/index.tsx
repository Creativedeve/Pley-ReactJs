import React, { useContext } from "react"
import { format, intervalToDuration, formatDistanceToNowStrict } from "date-fns"
import tw from "twin.macro"
import { Link } from "gatsby"
import styled from "styled-components"
import { IArticleProps } from "./article.types"
import { Image } from "components/Image"
import { IFixedImage } from "components/Image/image.types"
import { getImage } from "./helper"
import { ViewportContext } from "context"
import { Responsive } from "lib/Responsive"

const StyledArticle = styled.article<{ direction?: string }>`
  display: grid;
  grid-template-columns: 0.25fr 0.75fr;
  grid-template-areas: "image content";
  grid-column-gap: 1rem;
  min-height: 5.7rem;
  max-height: 8rem;

  .image {
    display: block;
    grid-area: image;
    align-self: center;
  }

  a {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .content {
    grid-area: content;
    ${tw`text-xl sm:text-2xl`}

    .teaser {
      max-height: 4rem;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    ${props => (props.direction === "vertical" ? `margin-top: 1rem;` : "")}
  }

  ${props => props.theme.media.tablet_portrait_up`
    max-height: none;
    grid-column-gap: 2rem;
    grid-template-columns: 0.3fr 0.7fr;

    ${
      props.direction === "vertical"
        ? `display: flex; flex-direction: column; max-height: none;`
        : ""
    }
  `}

  ${props => props.theme.media.tablet_landscape_up`
    grid-column-gap: 2rem;
  `}
`

export const Article: React.FC<IArticleProps> = ({
  author,
  teaser,
  title,
  publishedAt,
  image,
  slug,
  direction,
  ...props
}) => {
  const date: string = format(new Date(publishedAt), "HH:mm dd-MM-yyyy")
  const vp = useContext(ViewportContext)
  const articleImage: IFixedImage = getImage(image, vp)

  const interval = intervalToDuration({
    start: new Date(publishedAt),
    end: new Date(),
  })

  let sincePublished = formatDistanceToNowStrict(new Date(publishedAt))
  let useInterval = true

  if (typeof interval.days !== `undefined` && interval.days > 1) {
    sincePublished = date
    useInterval = false
  }

  function renderSmallArticle() {
    return (
      <>
        <p className="teaser">{title}</p>
        <div className="footer" tw="flex items-center justify-end mt-auto">
          <time className="time" tw="text-gray-600 italic">
            {useInterval ? `${sincePublished} ago` : `${sincePublished}`}
          </time>
        </div>
      </>
    )
  }

  function renderLargeArticle() {
    return (
      <>
        <div className="footer" tw="flex items-center justify-start">
          <time className="time" tw="text-gray-600 italic text-lg">
            {useInterval ? `${sincePublished} ago` : `${sincePublished}`}
          </time>
        </div>
        <h2 tw="font-bold md:mt-2 md:text-2xl">{title}</h2>
        <p className="teaser" tw="md:text-xl">
          {teaser}
        </p>
      </>
    )
  }

  return (
    <StyledArticle direction={direction} {...props}>
      <figure className="image">
        <Image image={articleImage} />
      </figure>
      <div
        className="content"
        tw="flex flex-col justify-between md:justify-start"
      >
        <Responsive
          phone={<>{renderSmallArticle()}</>}
          tabletPortrait={<>{renderSmallArticle()}</>}
          tabletLandscape={<>{renderLargeArticle()}</>}
          desktop={<>{renderLargeArticle()}</>}
        />
      </div>
      <Link to={`/news/${slug}`} />
    </StyledArticle>
  )
}
