import React from "react"
import tw from "twin.macro"
import useClipboard from "react-use-clipboard"
import { Button } from "lib/Button"
import styled from "styled-components"

const StyledCopy = styled.div`
  ${tw`text-gray-700 rounded-lg whitespace-no-wrap flex items-center`}

  .btn {
    ${tw`p-2 px-4 bg-gradient-to-br from-green to-defaultGreen-900 text-white shadow-lg rounded-lg flex-shrink-0`}
  }

  .link {
    ${tw`text-gray-700 inline-block ml-4 w-1/2 truncate md:w-auto md:ml-8 md:flex-shrink`}
  }
`

export const Copy: React.FC<{ text: string; actionText: string }> = ({
  text,
  actionText,
}) => {
  const [isCopied, setCopied] = useClipboard(text, {
    successDuration: 1500,
  })

  function onClickHandler(e: any) {
    e.preventDefault()
    e.stopPropagation()
    setCopied()
  }

  return (
    <StyledCopy className="copy">
      <Button className="btn" onClick={onClickHandler}>
        {actionText}
      </Button>
      {isCopied ? (
        <span className="link copied">Copied!</span>
      ) : (
        <span className="link" onClick={onClickHandler}>
          {text}
        </span>
      )}
    </StyledCopy>
  )
}
