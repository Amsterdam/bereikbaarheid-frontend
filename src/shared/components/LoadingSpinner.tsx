import { Spinner, themeColor } from '@amsterdam/asc-ui'

const DEFAULT_SIZE = 36

interface LoadingSpinnerProps {
  size?: number
}

const LoadingSpinner = ({ size }: LoadingSpinnerProps) => {
  return (
    <Spinner
      color={themeColor('secondary')}
      size={size ?? DEFAULT_SIZE}
      data-testid="loadingSpinner"
    />
  )
}

export default LoadingSpinner
