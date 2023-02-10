import { Link, MenuButton, MenuInline, MenuItem } from '@amsterdam/asc-ui'
import { Dispatch, SetStateAction, useState } from 'react'
import styled from 'styled-components'

import { getUrl } from '../../../api/bereikbaarheid/road-obstructions'
import Header, { HeaderProps } from '../../../shared/components/Header'
import { DataModal } from '../../../shared/components/Modal'

import { RoadObstructionMapFilters } from '../types/roadObstructionMapFilters'

interface RoadObstructionsHeaderProps extends HeaderProps {
  mapFilters: RoadObstructionMapFilters
  setOpenFeedbackModal: Dispatch<SetStateAction<boolean>>
}

const StyledHrefLink = styled(Link)`
  display: inherit;
  font-size: inherit;
`

const RoadObstructionsHeader = ({
  mapFilters,
  setOpenFeedbackModal,
  title,
}: RoadObstructionsHeaderProps) => {
  const [openDataModal, setOpenDataModal] = useState(false)
  const dataLinks = [{ href: getUrl(mapFilters), title: 'Stremmingen' }]

  return (
    <>
      <Header
        title={title}
        navigation={
          <MenuInline>
            <MenuItem>
              <MenuButton
                as={StyledHrefLink}
                data-testid="header-menu-data-link"
                onClick={() => setOpenDataModal(true)}
              >
                Data
              </MenuButton>
            </MenuItem>

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

      <DataModal
        dataLinks={dataLinks}
        open={openDataModal}
        setOpen={setOpenDataModal}
      />
    </>
  )
}

export default RoadObstructionsHeader
