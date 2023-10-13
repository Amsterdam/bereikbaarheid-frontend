import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  MouseEvent,
  SetStateAction,
  useState,
} from 'react'

import {
  Button,
  CompactThemeProvider,
  Divider,
  ErrorMessage,
  Heading,
  Input,
  Link,
  themeSpacing,
  TopBar,
} from '@amsterdam/asc-ui'
import debounce from 'lodash/debounce'
import { SubmitHandler, useForm } from 'react-hook-form'
import styled from 'styled-components'

import {
  address as addressApi,
  AddressItem,
} from '../../../api/atlas/search/address'
import { AddressSearchResults } from '../../../shared/components/AddressSearchResults'
import { FormLabel } from '../../../shared/components/FormLabel'
import ModalBlock from '../../../shared/components/ModalBlock'
import { Address } from '../../../types/address'
import { useLoadUnloadPageContext } from '../contexts/PageContext'

const FormFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: ${themeSpacing(4)};
`

const ResetLink = styled(Link)`
  font-weight: ${props => props.theme.typography.h4?.fontWeight};
  margin-right: ${themeSpacing(4)};
  text-decoration: none;
`

const debouncedHandler = debounce((e, handler) => handler(e), 500)

type FormScenarioAddressInputs = {
  searchAddress: Address['label']
}

interface LoadUnloadAddressFormProps {
  setShowAddressForm: Dispatch<SetStateAction<boolean>>
}

export const LoadUnloadAddressForm = ({
  setShowAddressForm,
}: LoadUnloadAddressFormProps) => {
  const { address, setAddress } = useLoadUnloadPageContext()
  const [addressOptions, setAddressOptions] = useState<AddressItem[] | []>([])
  const {
    handleSubmit,
    formState: { errors },
    register,
    clearErrors,
    reset,
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

  const onClickAddress = (e: MouseEvent) => {
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

  const onReset = (e: FormEvent) => {
    e.preventDefault()

    setAddress({} as Address)

    reset()
    setAddressOptions([])

    setShowAddressForm(false)
  }

  const onSubmit: SubmitHandler<FormScenarioAddressInputs> = data => {
    if (!address.label || !address.lon || !address.lat) {
      setError('searchAddress', {
        type: 'custom',
        message: 'Selecteer een adres uit de lijst',
      })

      return
    }

    setShowAddressForm(false)
  }

  return (
    <>
      <TopBar>
        <Heading as="h2">Voer een adres in</Heading>
      </TopBar>
      <Divider />
      <ModalBlock>
        <form data-testid="address-form" onSubmit={handleSubmit(onSubmit)}>
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

          <AddressSearchResults
            addresses={addressOptions}
            onClickAddress={onClickAddress}
          />

          <FormFooter>
            <CompactThemeProvider>
              <ResetLink href="#" variant="inline" onClick={onReset}>
                Reset adres
              </ResetLink>

              <Button variant="primary" type="submit">
                Kaart bekijken
              </Button>
            </CompactThemeProvider>
          </FormFooter>
        </form>
      </ModalBlock>
    </>
  )
}
