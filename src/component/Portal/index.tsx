import { FC, PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'
import { useIsMounted } from 'usehooks-ts'

export type PortalProps = {
  parentNode?: Element
}

export const Portal: FC<PropsWithChildren<PortalProps>> = ({
  children,
  parentNode = document.body
}) => {
  const isMounted = useIsMounted()

  if (!isMounted) return null

  return createPortal(children, parentNode)
}

export default Portal