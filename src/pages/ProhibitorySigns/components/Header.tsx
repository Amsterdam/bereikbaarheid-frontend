import { Link, MenuButton, MenuInline, MenuItem } from '@amsterdam/asc-ui'
import { Dispatch, SetStateAction, useState } from 'react'
import styled from 'styled-components'

import Header, { HeaderProps } from '../../../shared/components/Header'

import { useProhibitorySignsPageContext } from '../contexts/PageContext'
import { ProhibitorySignsDataModal } from './DataModal'

export interface ProhibitorySignsHeaderProps extends HeaderProps {
  setOpenFeedbackModal: Dispatch<SetStateAction<boolean>>
}

const StyledHrefLink = styled(Link)`
  display: inherit;
  font-size: inherit;
`

const ProhibitorySignsHeader = ({
  setOpenFeedbackModal,
  title,
}: ProhibitorySignsHeaderProps) => {
  const [openDataModal, setOpenDataModal] = useState(false)
  const { showScenarioWizard } = useProhibitorySignsPageContext()

  return (
    <>
      <Header
        title={title}
        navigation={
          <MenuInline>
            {
              // the data modal contains links with parameters specific
              // to a vehicle which are unknown at the time of initial render
              !showScenarioWizard && (
                <MenuItem>
                  <MenuButton
                    as={StyledHrefLink}
                    data-testid="header-menu-data-link"
                    onClick={() => setOpenDataModal(true)}
                  >
                    Data
                  </MenuButton>
                </MenuItem>
              )
            }

            <MenuItem>
              <MenuButton
                as={StyledHrefLink}
                data-testid="header-menu-contact-link"
                onClick={() => setOpenFeedbackModal(true)}
              >
                Contact
              </MenuButton>
            </MenuItem>
          </MenuInline>
        }
      />

      <ProhibitorySignsDataModal
        open={openDataModal}
        setOpen={setOpenDataModal}
      />
    </>
  )
}

export default ProhibitorySignsHeader
