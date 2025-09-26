import { MouseEventHandler } from 'react'

import { CompactThemeProvider, Link, List, ListItem, styles, themeColor, themeSpacing } from '@amsterdam/asc-ui'
import { AddressItem } from '../../api/pdok/search/address'
import styled from 'styled-components'

const AddressSearchResultsContainer = styled.div`
  min-height: 220px;

  ${styles.ListStyle} {
    border-color: ${themeColor('tint', 'level2')};
    border-style: solid;
    border-width: 0 1px 1px 1px;
    padding: ${themeSpacing(1)} ${themeSpacing(2)};
  }

  ${styles.ListItemStyle} {
    margin-bottom: ${themeSpacing(1)};
  }
`

const AddressSearchResultsContainerFooter = styled(ListItem)`
  color: ${themeColor('tint', 'level5')};
  font-size: 14px;
  margin-top: ${themeSpacing(1)};
`

interface AddressSearchResultsProps {
  addresses: AddressItem[] | []
  onClickAddress: MouseEventHandler
}

export const AddressSearchResults = ({ addresses, onClickAddress }: AddressSearchResultsProps) => {
  return (
    <AddressSearchResultsContainer>
      {addresses.length > 0 && (
        <CompactThemeProvider>
          <List>
            {addresses.map((item, index) => (
              <ListItem key={index}>
                <Link
                  data-lat={item.centroid[0]}
                  data-lon={item.centroid[1]}
                  href="#"
                  onClick={onClickAddress}
                  variant="inline"
                >
                  {item._display}
                </Link>
              </ListItem>
            ))}
            <AddressSearchResultsContainerFooter>
              Selecteer een adres of type verder
            </AddressSearchResultsContainerFooter>
          </List>
        </CompactThemeProvider>
      )}
    </AddressSearchResultsContainer>
  )
}
