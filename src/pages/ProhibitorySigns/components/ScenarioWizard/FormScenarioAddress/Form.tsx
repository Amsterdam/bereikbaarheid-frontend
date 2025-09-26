import { ChangeEvent, FormEvent, useState } from 'react'

import { ChevronLeft } from '@amsterdam/asc-assets'
import { Button, ErrorMessage, Input } from '@amsterdam/asc-ui'
import { address as addressApi, AddressItem } from '../../../../../api/pdok/search/address'
import debounce from 'lodash/debounce'
import { SubmitHandler, useForm } from 'react-hook-form'
import { AddressSearchResults } from '../../../../../shared/components/AddressSearchResults'
import { FormLabel } from '../../../../../shared/components/FormLabel'
import { Address } from 'types/address'

import { useProhibitorySignsPageContext } from '../../../contexts/PageContext'
import ScenarioWizardNav from '../ScenarioWizardNav'

const debouncedHandler = debounce((e, handler) => handler(e), 500)

type FormScenarioAddressInputs = {
  searchAddress: Address['label']
}

export const ProhibitorySignsFormScenarioAddress = () => {
  const { setActiveStepWizard, address, setAddress } = useProhibitorySignsPageContext()
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

    const itemsWithCentroid = search.results.filter(
      item => item.centroid && Array.isArray(item.centroid) && item.centroid.length === 2
    )

    if (itemsWithCentroid.length === 0) {
      setError('searchAddress', {
        type: 'custom',
        message: 'Geen adres gevonden',
      })
    }

    // Take first 11 results, so streetname 1 returns streetname 1 + streetname 10-19
    setAddressOptions(itemsWithCentroid.slice(0, 11))
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
      {errors.searchAddress && <ErrorMessage message={errors.searchAddress.message!} />}

      <AddressSearchResults addresses={addressOptions} onClickAddress={onClickAddress} />

      <ScenarioWizardNav>
        <Button variant="textButton" iconSize={14} iconLeft={<ChevronLeft />} onClick={() => setActiveStepWizard(0)}>
          Vorige
        </Button>

        <Button variant="secondary" taskflow type="submit">
          Volgende
        </Button>
      </ScenarioWizardNav>
    </form>
  )
}
