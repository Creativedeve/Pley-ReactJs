import React, { useContext, useEffect } from "react"
import tw from "twin.macro"
import styled from "styled-components"
import { format } from "date-fns"
import { IArticleProps } from "./article.types"
import { IFixedImage } from "components/Image/image.types"
import { dateFormat } from "components/Schedule/schedule.types"
import { Content } from "components/Content"
import { Image } from "components/Image"
import { getImage } from "./helper"
import { ViewportContext } from "context"
import { Copy } from "./Copy"
import { Mentions } from "./Mentions"
import { TwitterHandle } from "components/Twitter/Handle"
import { SEO } from "components/SEO"
import { Responsive } from "lib/Responsive"
import { Ad } from "components/Ad"
import { AdEnum, AdSlot } from "components/Ad/ad.types"
import { headerHeightLarge } from "components/Layout/Header/header.types"
import { NewsTicker } from "components/Widgets/NewsTicker"
import commentBox from "commentbox.io"
import { getSsoToken, logout } from "components/UserManagement/Services/auth"
import { SignInModal } from "components/UserManagement/Accounts/SignIn"
import { FacebookShareButton, TwitterShareButton, RedditShareButton } from "react-share"
import { FacebookIcon, TwitterIcon, RedditIcon } from "react-share"

const StyledComposition = styled.div`


  
  display: grid;
  grid-template-areas: "content";
  grid-template-rows: 1fr;

  &.ticker {
    .news {
      grid-area: content;
    }
  }

  ${props => props.theme.media.tablet_landscape_up`
    flex: 1 1 auto;
    display: grid;
    grid-template-areas: "content"
                         "content";
    grid-template-columns: 1fr;
    padding: 0 4rem;

    .content {
      grid-area: content;
    }

    &.ticker {
      .news {
        grid-area: content;
        padding: 0 30rem;

        ul {
          ${tw`md:gap-y-8 md:px-0 lg:px-0`}
        }
      }
    }
  @media (min-width: 1900px){
    &.ticker {
      .news {
        grid-area: content;
        padding: 1rem 779px;
      }
    }
  }
  
  `}

  

`


const StyledCommentBox = styled.div`

  margin: auto;
    width: 800px;

@media (max-width: 768px){
  margin: auto;
  width: auto;
}
`
const StyledWrapper = styled.div`

  ${props => props.theme.media.tablet_landscape_up`
    display: flex;
    align-items: start;
    padding: 0 4rem;

    .leftAd {
      position: sticky;
      top: ${headerHeightLarge - 0.1}rem;
      width: 16rem;
    }

    .rightAd {
      position: sticky;
      top: ${headerHeightLarge - 0.1}rem;
      width: 16rem;
    }
  `}

  ${props => props.theme.media.desktop_up`
    .leftAd {
      position: sticky;
      top: ${headerHeightLarge - 0.1}rem;
      width: 30rem;
    }

    .rightAd {
      position: sticky;
      top: ${headerHeightLarge - 0.1}rem;
      width: 30rem;
    }
  `}
`

const StyledArticleFull = styled.article`
  ${tw`bg-blue`}

  .inner {
    ${tw`p-8 text-xl leading-normal`}
  }

  .body {
    p + p {
      margin-top: 1em;
    }
  }

  ${props => props.theme.media.tablet_portrait_up`
    max-width: 73rem;
    ${tw`sm:mx-auto`}

    .inner {
      ${tw`sm:p-0 sm:py-16 sm:text-2xl`}
    }

    .body {
      p + p {
        margin-top: 1em;
      }
    }
  `}
`

export const ArticleFull: React.FC<IArticleProps> = ({
  title,
  teaser,
  image,
  body,
  publishedAt,
  author,
  slug,
  teamMentions,
  playerMentions,
  remoteId,
  ...props
}) => {
  let ssoTokenUser: any = getSsoToken()
  const currentSlug = `https://pley.gg/news/${slug}`
  const vp = useContext(ViewportContext)
  const [getToken, setToken] = React.useState(false);
  const [signInModalShow, setSignInModalShow] = React.useState(false);
  const articleImage: IFixedImage = getImage(image, vp)

  const publishDate: string = format(Number(publishedAt), dateFormat)

  const jsonBody = JSON.parse(body)

  const metaImages = [
    {
      url: `${process.env.GATSBY_CLOUDINARY_BASE_URL}/w_1200,h_630,c_fill/${image.publicId}`,
      caption: image.caption,
    },
  ]


  useEffect(() => {




    commentBox('5717355044798464-proj', {
      className: 'commentbox', // the class of divs to look for
      sortOrder: 'newest', // specify the default comment sort order ("best", "newest", "oldest")
      textColor: 'white', // default black
      subtextColor: 'white', // default grey
      singleSignOn: {
        buttonText: 'Pley', // The text to show on the sign in button.
        buttonIcon: 'https://svgshare.com/i/_hz.svg', // The icon to show on the sign in button. Must be an absolute URL.
        buttonColor: '#f18805', // The sign in button's color. Default is black.
        autoSignOn: ssoTokenUser != null && ssoTokenUser != "null" && ssoTokenUser != undefined ? true : false, // Attempts to automatically log the user into CommentBox.io with custom auth.
        onSignOn(onComplete, onError) {
          console.log("outside if conditin", ssoTokenUser)
          if (ssoTokenUser != null && ssoTokenUser != "null" && ssoTokenUser != undefined) {
            onComplete(ssoTokenUser);
          }
          else {
            setSignInModalShow(true)
          }

          //console.log("logged innn",ssoTokenUser)
          //console.log("error is", onError)

        },
        onSignOut() {
          logout(() => window.location.reload())
        }
      }
    });
  }, []);
  return (

    <div key={remoteId}>
      <SEO
        author={`${author?.firstName} ${author?.lastName}`}
        metaTitle={title}
        metaImages={metaImages}
        metaDescription={teaser}
        slug={`/news/${slug}`}
      />
      <StyledWrapper>

        {/* <Responsive
          tabletLandscape={
            <>
              <Ad
                className="leftAd"
                adType={AdEnum.HalfPage}
                adSlot={AdSlot.ArticleResponsive}
              />
            </>
          }
          desktop={
            <>
              <Ad
                className="leftAd"
                adType={AdEnum.HalfPage}
                adSlot={AdSlot.ArticleResponsive}
              />
            </>
          }
        /> */}
        <StyledComposition>



          <div className="content">
            <StyledArticleFull>
              <Image showCaption image={articleImage} />
              <div className="inner">
                <h1 tw="uppercase font-bold text-3xl mb-4 md:text-5xl">
                  {title}
                </h1>
                <p tw="text-xl font-bold mb-4 md:text-3xl">{teaser}</p>
                <span tw="text-gray-600 text-lg md:text-xl inline-flex items-center">
                  <span tw="italic mr-4">{publishDate}</span>
                  {` | `}
                  <TwitterHandle handle={author.twitterHandle} />
                </span>
                <div className="body">
                  <Content content={jsonBody.content} />
                  <div style={{ display: "flex", justifyContent: "center" }} className="an-unit an-outstream-in-article-43"></div>
                  <div tw="mt-16 md:flex md:justify-start">
                    {playerMentions && playerMentions.length > 0 && (
                      <Mentions
                        title="Related players"
                        list={playerMentions}
                        rootSlug="/players/"
                      />
                    )}
                    {teamMentions && teamMentions.length > 0 && (
                      <Mentions
                        title="Related teams"
                        list={teamMentions}
                        rootSlug="/teams/"
                      />
                    )}
                  </div>
                </div>
                <footer tw="py-16 border-t border-solid border-gray-900 mt-16">
                <span>Share article</span>
                  <div>
                    
                    <FacebookShareButton
                      url={currentSlug}
                      quote={title}
                    >
                      <FacebookIcon size={32} round={false} />
                    </FacebookShareButton>
                    &nbsp;
                    <TwitterShareButton
                      url={currentSlug}
                      title={title}
                    >
                      <TwitterIcon size={32} round={false} />
                    </TwitterShareButton>
                    &nbsp;
                    <RedditShareButton
                      url={currentSlug}
                      title={title}
                    >
                      <RedditIcon size={32} round={false} />
                    </RedditShareButton>
                  </div>
                  <br />
                  <div>
                    <Copy
                      text={currentSlug}
                      actionText="Copy link to this article"
                    />
                  </div>

                </footer>
              </div>

            </StyledArticleFull>
          </div>
        </StyledComposition>
        {/* <Responsive
          tabletLandscape={
            <>
              <Ad
                className="rightAd"
                adType={AdEnum.HalfPage}
                adSlot={AdSlot.ArticleResponsive}
              />
            </>
          }
          desktop={
            <>
              <Ad
                className="rightAd"
                adType={AdEnum.HalfPage}
                adSlot={AdSlot.ArticleResponsive}
              />
            </>
          }
        /> */}

      </StyledWrapper>
      {/* <Responsive
        phone={
          <>
            <Ad
              adType={AdEnum.MobileLargeBanner}
              adSlot={AdSlot.ArticleMobile}
            />
          </>
        }
        tabletPortrait={
          <>
            <Ad adType={AdEnum.Leaderboard} adSlot={AdSlot.ArticleResponsive} />
          </>
        }
        tabletLandscape={
          <>
            <Ad adType={AdEnum.Leaderboard} adSlot={AdSlot.ArticleResponsive} />
          </>
        }
        desktop={
          <>
            <Ad adType={AdEnum.Leaderboard} adSlot={AdSlot.ArticleResponsive} />
          </>
        }
      /> */}

      <StyledCommentBox className="commentbox" />


      <StyledComposition className="ticker">

        <NewsTicker
          className="news"
          adTypeMap={{
            phone: AdEnum.MobileLeaderboard,
            tabletPortrait: AdEnum.InlineRect,
            desktop: AdEnum.Leaderboard,
          }}
        >
          <h2 tw="text-4xl md:text-6xl font-bold mt-16 px-4">Latest news</h2>
        </NewsTicker>
      </StyledComposition>

      <SignInModal show={signInModalShow} onHide={() => setSignInModalShow(false)} />
    </div>
  )
}
