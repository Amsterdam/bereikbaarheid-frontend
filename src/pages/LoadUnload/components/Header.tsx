import { Link, MenuButton, MenuItem } from '@amsterdam/asc-ui'
import { Dispatch, SetStateAction, useState } from 'react'

import { getUrl } from '../../../api/bereikbaarheid/road-sections/load-unload'
import { Header, HeaderProps } from '../../../shared/components/Header'
import { DataModal } from '../../../shared/components/Modal'

interface LoadUnloadHeaderProps extends HeaderProps {
  setOpenFeedbackModal: Dispatch<SetStateAction<boolean>>
}

export const LoadUnloadHeader = ({
  setOpenFeedbackModal,
  title,
}: LoadUnloadHeaderProps) => {
  const [openDataModal, setOpenDataModal] = useState(false)
  const dataLinks = [
    {
      href: 'https://data.amsterdam.nl/datasets/D6rMG5CdGBfp2Q/parkeervakken/',
      title: 'Laad- en losplekken',
    },
    { beta: true, href: getUrl(), title: 'Wegvakken met venstertijden' },
  ]

  return (
    <>
      <Header
        title={title}
        additionalMenuItems={
          <>
            <MenuItem>
              <MenuButton
                as={Link}
                data-testid="header-menu-data-link"
                onClick={() => setOpenDataModal(true)}
              >
                Data
              </MenuButton>
            </MenuItem>

            <MenuItem>
              <MenuButton
                as={Link}
                data-testid="header-menu-contact-link"
                onClick={() => {
                  setOpenFeedbackModal(true)
                }}
              >
                Contact
              </MenuButton>
            </MenuItem>
          </>
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
