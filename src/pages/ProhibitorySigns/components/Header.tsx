import { Dispatch, SetStateAction, useState } from 'react'

import { Link, MenuButton, MenuItem } from '@amsterdam/asc-ui'

import { ProhibitorySignsDataModal } from './DataModal'

import { Header, HeaderProps } from '../../../shared/components/Header'
import { useProhibitorySignsPageContext } from '../contexts/PageContext'

export interface ProhibitorySignsHeaderProps extends HeaderProps {
  setOpenFeedbackModal: Dispatch<SetStateAction<boolean>>
}

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
        additionalMenuItems={
          <>
            {
              // the data modal contains links with parameters specific
              // to a vehicle which are unknown at the time of initial render
              !showScenarioWizard && (
                <MenuItem>
                  <MenuButton
                    as={Link}
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

      <ProhibitorySignsDataModal
        open={openDataModal}
        setOpen={setOpenDataModal}
      />
    </>
  )
}

export default ProhibitorySignsHeader
