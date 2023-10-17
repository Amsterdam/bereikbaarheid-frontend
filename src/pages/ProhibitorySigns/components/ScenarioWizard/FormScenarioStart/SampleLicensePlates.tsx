import { FormEvent, useState } from 'react'

import { Select, themeSpacing } from '@amsterdam/asc-ui'
import { UseFormSetValue } from 'react-hook-form'
import styled from 'styled-components'

import { FormScenarioStartInputs } from './Form'

import { useProhibitorySignsPageContext } from '../../../contexts/PageContext'

const licensePlates = [
  {
    height: 1.65,
    label: 'Fiat Punto',
    licensePlate: 'J595XS',
  },
  {
    height: 2.65,
    label: 'Vuilniswagen',
    licensePlate: 'BXLS14',
  },
  {
    height: 1.78,
    label: 'Oude taxi',
    licensePlate: '65JRDP',
  },
  {
    height: 1.95,
    label: 'Jeep Cherokee',
    licensePlate: '21RZZH',
  },
  {
    height: 2.88,
    label: 'Vrachtwagen diesel euro 2',
    licensePlate: 'BGVG60',
  },
  {
    height: 3.45,
    label: 'Kraan',
    licensePlate: '85BPF2',
  },
  {
    height: 3.13,
    label: 'Bus euro 6',
    licensePlate: '77BJJ3',
  },
]

const StyledSelect = styled(Select)`
  margin-left: ${themeSpacing(3)};
`

type ExpertModeLicensePlatesProps = {
  setValue: UseFormSetValue<FormScenarioStartInputs>
}

export const FormScenarioStartSampleLicensePlates = ({
  setValue,
}: ExpertModeLicensePlatesProps) => {
  const { vehicle, setVehicle } = useProhibitorySignsPageContext()
  const [selected, setSelected] = useState(vehicle?.licensePlate)

  const presetFormValues = (e: FormEvent<HTMLSelectElement>) => {
    setSelected(e.currentTarget.value)

    if (e.currentTarget.value === 'no-vehicle-selected') {
      setValue('licensePlate', '')
      setValue('vehicleHeight', 0)

      setVehicle({
        ...vehicle,
        licensePlate: '',
        hasTrailer: false,
        height: 0,
      })
    }

    const selectedItem = licensePlates.find(
      item => item.licensePlate === e.currentTarget.value
    )

    if (selectedItem) {
      setValue('licensePlate', selectedItem.licensePlate)
      setValue('vehicleHeight', selectedItem.height)
    }
  }

  return (
    <StyledSelect
      id="expertModeLicensePlate"
      data-testid="vehicle-select-list"
      defaultValue={selected}
      onChange={presetFormValues}
    >
      <option key="no-vehicle-selected" value="no-vehicle-selected">
        Selecteer een voertuig
      </option>

      {licensePlates.map(item => (
        <option key={item.licensePlate} value={item.licensePlate}>
          {item.label}
        </option>
      ))}
    </StyledSelect>
  )
}
