import { LoadUnloadDetailFeature } from '../types/detailFeature'

export type DetailFeatureState = {
  feature?: LoadUnloadDetailFeature
  location?: [number, number]
}

export const detailFeatureInitialState = {
  feature: undefined,
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
      feature: NonNullable<DetailFeatureState['feature']>
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
      return detailFeatureInitialState
    case DetailFeatureActionType.SET_FEATURE:
      return {
        ...state,
        feature: action.feature,
        location: undefined,
      }
    case DetailFeatureActionType.SET_LOCATION:
      return {
        ...state,
        feature: undefined,
        location: action.location,
      }
    default: {
      throw new Error(`Unhandled action: ${JSON.stringify(action)}`)
    }
  }
}
