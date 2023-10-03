import { Link, MenuButton, MenuItem } from '@amsterdam/asc-ui'
import { Header, HeaderProps } from '../../../shared/components/Header'
import { Dispatch, SetStateAction } from 'react'

export interface HomeHeaderProps extends HeaderProps {
  setOpenFeedbackModal: Dispatch<SetStateAction<boolean>>
}

const HomeHeader = ({ title, setOpenFeedbackModal }: HomeHeaderProps) => {
  return (
    <>
      <Header
        title={title}
        data-testid="homeHeader"
        additionalMenuItems={
          <>
            <MenuItem>
              <MenuButton
                as={Link}
                data-testid="header-menu-contact-link"
                onClick={() => setOpenFeedbackModal(true)}
              >
                Contact
              </MenuButton>
            </MenuItem>
          </>
        }
      />
    </>
  )
}

export default HomeHeader
