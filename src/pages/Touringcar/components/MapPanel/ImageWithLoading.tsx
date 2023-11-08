import { Image } from '@amsterdam/asc-ui'
import styled from 'styled-components'

interface ImageProps {
  isLoading: boolean
}

const GIF_TRANSPARENT_PIXEL = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
const GIF_LOADING_ANIMATION =
  'data:image/gif;base64,R0lGODlhBgAGAOcqAAAAAAEBAQICAgMDAwQEBAUFBQYGBgcHBwgICAkJCQoKCgsLCwwMDA0NDQ4ODg8PDxAQEBERERISEhMTExQUFBUVFRYWFhcXFxgYGBkZGRoaGhsbGxwcHB0dHR4eHh8fHyAgICEhISIiIiMjIyQkJCUlJSYmJicnJygoKCkpKSoqKisrKywsLC0tLS4uLi8vLzAwMDExMTIyMjMzMzQ0NDU1NTY2Njc3Nzg4ODk5OTo6Ojs7Ozw8PD09PT4+Pj8/P0BAQEFBQUJCQkNDQ0REREVFRUZGRkdHR0hISElJSUpKSktLS0xMTE1NTU5OTk9PT1BQUFFRUVJSUlNTU1RUVFVVVVZWVldXV1hYWFlZWVpaWltbW1xcXF1dXV5eXl9fX2BgYGFhYWJiYmNjY2RkZGVlZWZmZmdnZ2hoaGlpaWpqamtra2xsbG1tbW5ubm9vb3BwcHFxcXJycnNzc3R0dHV1dXZ2dnd3d3h4eHl5eXp6ent7e3x8fH19fX5+fn9/f4CAgIGBgYKCgoODg4SEhIWFhYaGhoeHh4iIiImJiYqKiouLi4yMjI2NjY6Ojo+Pj5CQkJGRkZKSkpOTk5SUlJWVlZaWlpeXl5iYmJmZmZqampubm5ycnJ2dnZ6enp+fn6CgoKGhoaKioqOjo6SkpKWlpaampqenp6ioqKmpqaqqqqurq6ysrK2tra6urq+vr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5ubq6uru7u7y8vL29vb6+vr+/v8DAwMHBwcLCwsPDw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy8zMzM3Nzc7Ozs/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19jY2NnZ2dra2tvb29zc3N3d3d7e3t/f3+Dg4OHh4eLi4uPj4+Tk5OXl5ebm5ufn5+jo6Onp6erq6uvr6+zs7O3t7e7u7u/v7/Dw8PHx8fLy8vPz8/T09PX19fb29vf39/j4+Pn5+fr6+vv7+/z8/P39/f7+/v///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQEFAD/ACwAAAAABgAGAAAIDAAJCRxIsKDBgwgDAgAh+QQFFAD/ACwAAAAABgAGAAAIDAD7CBxIsKDBgwgDAgAh+QQFFAD/ACwAAAAABgAGAAAIDADvCBxIsKDBgwgDAgAh+QQFFAD/ACwAAAAABgAGAAAIDADjCBxIsKDBgwgDAgAh+QQFFAD/ACwAAAAABgAGAAAIDADVCBxIsKDBgwgDAgAh+QQFFAD/ACwAAAAABgAGAAAIDADjCBxIsKDBgwgDAgAh+QQFFAD/ACwAAAAABgAGAAAIDADvCBxIsKDBgwgDAgAh+QQFFAD/ACwAAAAABgAGAAAIDAD7CBxIsKDBgwgDAgA7'

const StyledImage = styled(Image)<ImageProps>`
  height: ${props => props.height}px;
  background: ${props => (props.isLoading ? `url(${GIF_LOADING_ANIMATION})` : 'none')};
  filter: opacity(${props => (props.isLoading ? '50%' : '100%')});
`

function ImageWithLoading({
  src,
  alt,
  width,
  height,
  loading = false,
}: {
  src: string
  alt: string
  width: number
  height: number
  loading: boolean
}) {
  return (
    <StyledImage
      src={loading ? GIF_TRANSPARENT_PIXEL : src}
      alt={alt}
      width={width}
      height={height}
      isLoading={loading}
    />
  )
}

export default ImageWithLoading
