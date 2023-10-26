import {
  QUESTION_BODY,
  QUESTION_RECIPIENT,
  QUESTION_SUBJECT,
} from 'pages/Contact/ContactPage'

import { getMailtoLink } from './email'

test('correctly formatted mailto link', () => {
  expect(
    getMailtoLink(QUESTION_RECIPIENT, QUESTION_SUBJECT, QUESTION_BODY)
  ).toBe(
    'mailto:stadsloket.centrum.vergunningen.dvl@amsterdam.nl?subject=Probleem%20melden%20of%20suggestie%20voor%20bereikbaarheid.amsterdam.nl&body=Beschrijf%20zo%20volledig%20mogelijk%20waar%20je%20tegenaan%20loopt%3A%0A%20%20-%20Om%20welk%20onderdeel%20van%20de%20pagina%20gaat%20het%3F%0A%20%20-%20Wat%20zie%20je%20op%20het%20scherm%20als%20je%20een%20probleem%20ondervindt%3F%0A%20%20-%20Heb%20je%20een%20suggestie%20hoe%20het%20anders%20zou%20kunnen%3F%0A'
  )
})
