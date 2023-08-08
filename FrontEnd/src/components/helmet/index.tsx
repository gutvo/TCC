import { helmetTitleProps } from '@Interfaces/components/helmet'
import { Helmet } from 'react-helmet'

export function HelmetTitle({ label }: helmetTitleProps) {
  return (
    <Helmet>
      <title>{label}</title>
    </Helmet>
  )
}
