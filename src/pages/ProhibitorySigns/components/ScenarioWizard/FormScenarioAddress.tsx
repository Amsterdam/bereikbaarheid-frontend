import { ChevronLeft } from '@amsterdam/asc-assets'
import {
  Button,
  CompactThemeProvider,
  ErrorMessage,
  Input,
  Link,
  List,
  ListItem,
  styles,
  themeColor,
  themeSpacing,
} from '@amsterdam/asc-ui'
import debounce from 'lodash/debounce'
import { ChangeEvent, FormEvent, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import styled from 'styled-components'

import { useProhibitorySignsPageContext } from '../../contexts/PageContext'
import { FormLabel } from '../../../../shared/components/FormLabel'
import { Address } from '../../types/address'

import ScenarioWizardNav from './ScenarioWizardNav'
import {
  address as addressApi,
  AddressItem,
} from '../../../../api/atlas/search/address'

const AddressOptionsContainer = styled.div`
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

const AddressOptionsContainerFooter = styled(ListItem)`
  color: ${themeColor('tint', 'level5')};
  font-size: 14px;
  margin-top: ${themeSpacing(1)};
`

const debouncedHandler = debounce((e, handler) => handler(e), 500)

type FormScenarioAddressInputs = {
  searchAddress: Address['label']
}

const ProhibitorySignsFormScenarioAddress = () => {
  const { setActiveStepWizard, address, setAddress } =
    useProhibitorySignsPageContext()
  const [addressOptions, setAddressOptions] = useState<AddressItem[] | []>([])
  const {
    handleSubmit,
    formState: { errors },
    register,
    clearErrors,
    setError,
    setValue,
  } = useForm<FormScenarioAddressInputs>({
    mode: 'onChange',
    reValidateMode: 'onChange',
  })

  const { onBlur, name, ref } = register('searchAddress')

  const lookupAddress = async (e: ChangeEvent<HTMLInputElement>) => {
    const searchString = e.target.value
    clearErrors('searchAddress')

    if (searchString.length < 4) {
      setError('searchAddress', {
        type: 'custom',
        message: 'Voer tenminste 4 letters in',
      })

      return
    }

    const search = await addressApi(searchString)

    if (search.results.length === 0) {
      setError('searchAddress', {
        type: 'custom',
        message: 'Geen adres gevonden',
      })
    }

    // Take first 11 results, so streetname 1 returns streetname 1 + streetname 10-19
    setAddressOptions(search.results.slice(0, 11))
  }

  const onClickAddress = (e: FormEvent) => {
    e.preventDefault()

    const target = e.target as HTMLAnchorElement

    setAddress({
      label: target.text,
      lat: Number(target.dataset.lat),
      lon: Number(target.dataset.lon),
    })

    clearErrors('searchAddress')
    setValue('searchAddress', target.text)
    setAddressOptions([])
  }

  const onSubmit: SubmitHandler<FormScenarioAddressInputs> = data => {
    if (!address.label || !address.lon || !address.lat) {
      setError('searchAddress', {
        type: 'custom',
        message: 'Selecteer een adres uit de lijst',
      })

      return
    }

    setActiveStepWizard(2)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormLabel htmlFor="searchAddress" label="Adres van uw bestemming" />
      <Input
        id="searchAddress"
        autoComplete="off"
        defaultValue={address?.label}
        error={Boolean(errors.searchAddress)}
        placeholder="Type een adres en selecteer"
        onChange={e => debouncedHandler(e, lookupAddress)}
        onBlur={onBlur}
        name={name}
        ref={ref}
      />
      {errors.searchAddress && (
        <ErrorMessage message={errors.searchAddress.message!} />
      )}

      <AddressOptionsContainer>
        {addressOptions.length > 0 && (
          <CompactThemeProvider>
            <List>
              {addressOptions.map((item, index) => (
                <ListItem key={index}>
                  <Link
                    data-lat={item.centroid[1]}
                    data-lon={item.centroid[0]}
                    href="#"
                    onClick={onClickAddress}
                    variant="inline"
                  >
                    {item._display}
                  </Link>
                </ListItem>
              ))}
              <AddressOptionsContainerFooter>
                Selecteer een adres of type verder
              </AddressOptionsContainerFooter>
            </List>
          </CompactThemeProvider>
        )}
      </AddressOptionsContainer>

      <ScenarioWizardNav>
        <Button
          variant="textButton"
          iconSize={14}
          iconLeft={<ChevronLeft />}
          onClick={() => setActiveStepWizard(0)}
        >
          Vorige
        </Button>

        <Button variant="secondary" taskflow type="submit">
          Volgende
        </Button>
      </ScenarioWizardNav>
    </form>
  )
}

export default ProhibitorySignsFormScenarioAddress
