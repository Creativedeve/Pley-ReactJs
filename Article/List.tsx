import React, { useCallback, useState, useLayoutEffect, useEffect } from "react"
import styled from "styled-components"
import "twin.macro"
import LazyLoad, { forceCheck } from "react-lazyload"
import { Article } from "."
import { IArticleListProps, IArticleProps } from "./article.types"
import { Responsive } from "lib/Responsive"
import { Ad } from "components/Ad"
import uniqBy from "lodash-es/uniqBy"
import chunk from "lodash-es/chunk"

const StyledArticleList = styled.ul``

const ArticleList: React.FC<IArticleListProps> = ({
  articles,
  adFrequency,
  adTypeMap,
  adSlot,
  ...props
}) => {
  if (articles.length === 0) return null
  const makePages = useCallback(() => chunk(uniqBy(articles, "slug"), 32), [
    articles,
  ])
  const [pages, setPages] = useState(() => makePages())

  const [nextChunkIndex, setNextChunkIndex] = useState(1)
  const [currentChunks, setCurrentChunks] = useState<IArticleProps[] | []>(() =>
    pages.length > 0 ? [...pages[0]] : []
  )
  const [scrollPosition, setScrollPosition] = useState(0)

  const nextChunk = useCallback(() => {
    if (typeof window !== `undefined`) setScrollPosition(window.scrollY)
    if (pages) {
      setCurrentChunks(prev => [...prev, ...pages[nextChunkIndex]])
      setNextChunkIndex(prev => prev + 1)
    }
  }, [pages, nextChunkIndex])

  useLayoutEffect(() => {
    if (scrollPosition && typeof window !== `undefined`) {
      window.scrollTo(0, scrollPosition)
      forceCheck()
    }
  }, [scrollPosition])

  useEffect(() => {
    const newPages = makePages()
    setPages(newPages)
  }, [articles])

  return (
    <StyledArticleList
      tw="bg-blue grid gap-y-4 p-4 md:gap-y-8 md:p-8 md:px-16 lg:px-16"
      {...props}
    >
      {currentChunks.map((article, i) => {
        // const displayAd =
        //   adFrequency && i > adFrequency - 1 && i % adFrequency === 0
        return (
          <React.Fragment key={`ad_${article.remoteId || article.id}`}>
            {/* {displayAd && (
              <li tw="relative my-8">
                <LazyLoad height={100} offset={100} once>
                  <Responsive
                    phone={
                      adTypeMap?.phone && (
                        <Ad adType={adTypeMap.phone} adSlot={adSlot} />
                      )
                    }
                    tabletPortrait={
                      adTypeMap?.tabletPortrait && (
                        <Ad adType={adTypeMap.tabletPortrait} adSlot={adSlot} />
                      )
                    }
                    tabletLandscape={
                      adTypeMap?.tabletLandscape && (
                        <Ad
                          adType={adTypeMap.tabletLandscape}
                          adSlot={adSlot}
                        />
                      )
                    }
                    desktop={
                      adTypeMap?.desktop && (
                        <Ad adType={adTypeMap.desktop} adSlot={adSlot} />
                      )
                    }
                  />
                </LazyLoad>
              </li>
            )} */}
            <li tw="relative">
              <LazyLoad height={100} offset={100} once>
                <Article {...article} />
              </LazyLoad>
            </li>
          </React.Fragment>
        )
      })}
      <div className="bttonAllignment">
      {pages[nextChunkIndex] && (
        <button
          tw="bg-green text-blue w-full py-4 px-4"
          onClick={() => nextChunk()}
          type="button"
        >
          Load more
        </button>
      )}
      </div>    
    </StyledArticleList>
  )
}

export { ArticleList }
