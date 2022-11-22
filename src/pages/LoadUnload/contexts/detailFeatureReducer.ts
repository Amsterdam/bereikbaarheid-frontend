export const detailFeatureTypes = ['parkingSpace'] as const

export type DetailFeatureState = {
  featureId?: string
  featureType?: typeof detailFeatureTypes[number]
  location?: [number, number]
}

export const detailFeatureInitialState = {
  featureId: undefined,
  featureType: undefined,
  location: undefined,
}

export enum DetailFeatureActionType {
  RESET = 'RESET',
  SET_FEATURE = 'SET_FEATURE',
  SET_LOCATION = 'SET_LOCATION',
}

export type DetailFeatureAction =
  | { type: DetailFeatureActionType.RESET }
  | {
      type: DetailFeatureActionType.SET_FEATURE
      featureId: NonNullable<DetailFeatureState['featureId']>
      featureType: NonNullable<DetailFeatureState['featureType']>
    }
  | {
      type: DetailFeatureActionType.SET_LOCATION
      location: NonNullable<DetailFeatureState['location']>
    }

export const detailFeatureReducer = (
  state: DetailFeatureState,
  action: DetailFeatureAction
): DetailFeatureState => {
  switch (action.type) {
    case DetailFeatureActionType.RESET:
      return {
        ...state,
        featureId: undefined,
        featureType: undefined,
        location: undefined,
      }
    case DetailFeatureActionType.SET_FEATURE:
      return {
        ...state,
        featureId: action.featureId,
        featureType: action.featureType,
        location: undefined,
      }
    case DetailFeatureActionType.SET_LOCATION:
      return {
        ...state,
        featureId: undefined,
        featureType: undefined,
        location: action.location,
      }
    default: {
      throw new Error(`Unhandled action: ${JSON.stringify(action)}`)
    }
  }
}
